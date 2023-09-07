import {ActivatedRoute, Router} from '@angular/router';
import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, Directive } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {Facet, FacetValue} from './models/facets';
import {cloneDeep, isEqual} from 'lodash-es';
import {ISearchFilter} from './models/search-filter';
import {FieldConfig} from '../../common-form-config';

type IAnySearchFilter = ISearchFilter<any, any>;

@Directive()
export abstract class BaseSearchFilterComponent implements OnInit, OnChanges, OnDestroy {
  public supportedFilterAttributes: string[];
  public baseSearchFilter: IAnySearchFilter = {};
  public searchFilterChange: EventEmitter<IAnySearchFilter> = new EventEmitter<IAnySearchFilter>();

  private formGroup?: FormGroup;
  private onResetSearchFilter?: IAnySearchFilter;

  protected abstract isFieldMultipleSelectMap: {[field: string]: boolean};
  protected unsubscribe$ = new Subject<void>();

  public currentFilter?: IAnySearchFilter;
  public formConfig?: FieldConfig<any>[];
  private resetAll = false;
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
  ) {
  }

  abstract ngOnChanges(changes: SimpleChanges): void;

  abstract ngOnInit(): void;

  onFilterChange(searchFilter: IAnySearchFilter) {
    const aggregatedSearchFilter = {
      ...this.buildAggregatedSearchFilter(),
      ...searchFilter
    };
    this.updateQueryParams(aggregatedSearchFilter);
  }

  resetFilter(resetAll?: boolean) {
    this.resetAll = resetAll
    if (this.onResetSearchFilter) {
      this.updateQueryParams(this.onResetSearchFilter, resetAll);
    }
  }

  onFormInitialize(formGroup: FormGroup) {
    this.formGroup = formGroup;
    if (this.currentFilter) {
      this.formGroup.patchValue(this.currentFilter, { emitEvent: false });
    }
  }

  protected updateCurrentFilter(searchFilter: IAnySearchFilter) {
    if (this.resetAll) {
      for (let prop in searchFilter) {
        this.currentFilter[prop] = [];
      }
      this.searchFilterChange.emit(this.currentFilter);
      this.resetAll = false;
      return;
    }
    if (!isEqual(this.currentFilter, searchFilter)) {
      this.currentFilter = searchFilter;
      this.searchFilterChange.emit(this.currentFilter);
    }
  }

  protected updateQueryParams(searchFilter: IAnySearchFilter, resetAll?: boolean) {
    this.router.navigate([], {
      queryParams: {
        ...(() => {
          const queryParams = cloneDeep(this.activatedRoute.snapshot.queryParams);
          const currentFilterData = cloneDeep(this.currentFilter);
          if (resetAll && queryParams) {
            for (let prop in searchFilter) {
              queryParams[prop] = [];
              searchFilter[prop] = [];
              currentFilterData[prop] = [];
              this.baseSearchFilter[prop] = [];
            }            
          }

          if (this.supportedFilterAttributes && this.supportedFilterAttributes.length) {
            this.supportedFilterAttributes.forEach((attr) => delete queryParams[attr]);
            Object.keys(currentFilterData).forEach((attr) => delete queryParams[attr]);
            return queryParams;
          }

          Object.keys(currentFilterData).forEach((attr) => delete queryParams[attr]);
          return queryParams;
        })(),
        ...searchFilter
      },
      relativeTo: this.activatedRoute.parent,
      replaceUrl: true
    });
  }

  protected saveOnResetSearchFilter(aggregatedSearchFilter: IAnySearchFilter) {
    if (!this.onResetSearchFilter) {
      this.onResetSearchFilter = aggregatedSearchFilter;
    }
  }

  protected buildAggregatedSearchFilter(): IAnySearchFilter {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const aggregatedSearchFilter: IAnySearchFilter = cloneDeep(this.baseSearchFilter);
    for (let prop in this.baseSearchFilter) {
      this.baseSearchFilter[prop] = [];
    }

    Object.keys(queryParams)
      .filter((paramKey) => this.supportedFilterAttributes.length ? this.supportedFilterAttributes.includes(paramKey) : true)
      .forEach((facet: Facet) => {
        if (this.isFieldMultipleSelectMap[facet]) {
          if (aggregatedSearchFilter[facet]) {
            aggregatedSearchFilter[facet] = Array.from(new Set([
              ...(Array.isArray(aggregatedSearchFilter[facet]) ? aggregatedSearchFilter[facet] : [aggregatedSearchFilter[facet]]),
              ...(Array.isArray(queryParams[facet]) ? queryParams[facet] : [queryParams[facet]])
            ]));
          } else {
            aggregatedSearchFilter[facet] = Array.isArray(queryParams[facet]) ? queryParams[facet] : [queryParams[facet]];
          }
        } else {
          aggregatedSearchFilter[facet] = Array.isArray(queryParams[facet]) ? queryParams[facet][0] : queryParams[facet];
        }
      });

    return aggregatedSearchFilter;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
