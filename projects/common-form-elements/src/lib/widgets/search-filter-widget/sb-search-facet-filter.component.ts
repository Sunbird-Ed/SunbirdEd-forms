import {
  Component,
  EventEmitter, Inject,
  Input,
  OnChanges,
  OnInit, Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import {Subject} from 'rxjs';
import {Facet, FacetValue, IFilterFacet} from './models/facets';
import {map, takeUntil, tap} from 'rxjs/operators';
import {IFacetFilterFieldTemplateConfig} from './facet-filter-field-template-config';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchResultFacetFormConfigAdapter} from './search-result-facet-form-config-adapter';
import {PLATFORM_TOKEN} from './injection-tokens';
import {BaseSearchFilterComponent} from './base-search-filter.component';
import {ISearchFilter} from './models/search-filter';
import {TitleCasePipe} from '@angular/common';
import {FieldConfig} from '../../common-form-config';

@Component({
  selector: 'sb-search-facet-filter',
  template: `
    <sb-form *ngIf="formConfig"
             [platform]="platform"
             [fieldTemplateClass]="'normalize'"
             [config]="formConfig"
             (valueChanges)="onFilterChange($event)"
             (initialize)="onFormInitialize($event)">
    </sb-form>
  `,
  styles: [],
  providers: [SearchResultFacetFormConfigAdapter, TitleCasePipe]
})
export class SbSearchFacetFilterComponent extends BaseSearchFilterComponent implements OnInit, OnChanges {
  private static readonly DEFAULT_SUPPORTED_FILTER_ATTRIBUTES = [];

  @Input() readonly supportedFilterAttributes: Facet[] = SbSearchFacetFilterComponent.DEFAULT_SUPPORTED_FILTER_ATTRIBUTES;
  @Input() readonly searchResultFacets: IFilterFacet[] = [];
  @Input() readonly baseSearchFilter: ISearchFilter<Facet, FacetValue> = {};
  @Input() readonly filterFormTemplateConfig: IFacetFilterFieldTemplateConfig[] = [];
  @Output() searchFilterChange: EventEmitter<ISearchFilter<Facet, FacetValue>> = new EventEmitter<ISearchFilter<Facet, FacetValue>>();

  protected isFieldMultipleSelectMap: {[field: string]: boolean} = {};
  protected unsubscribe$ = new Subject<void>();

  public currentFilter?: ISearchFilter<Facet, FacetValue>;
  public formConfig?: FieldConfig<FacetValue>[];

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private searchResultFacetFormConfigAdapter: SearchResultFacetFormConfigAdapter,
    @Optional() @Inject(PLATFORM_TOKEN) public platform: string = 'web'
  ) {
    super(router, activatedRoute);
  }

  ngOnChanges(changes: SimpleChanges) {
    const newSearchResultFacetsValue: IFilterFacet[] = changes.searchResultFacets && changes.searchResultFacets.currentValue;
    const newFilterFormTemplateConfig: IFacetFilterFieldTemplateConfig[] = changes.filterFormTemplateConfig && changes.filterFormTemplateConfig.currentValue;

    if (newFilterFormTemplateConfig) {
      this.isFieldMultipleSelectMap = newFilterFormTemplateConfig.reduce<
        {[facet in Facet]: boolean}
      >((acc, config: IFacetFilterFieldTemplateConfig) => {
        acc[config.facet] = config.multiple;
        return acc;
      }, {});
    }

    if (newSearchResultFacetsValue) {
      this.formConfig = this.searchResultFacetFormConfigAdapter.map(
        newSearchResultFacetsValue,
        this.filterFormTemplateConfig,
        this.currentFilter,
      );
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(
        map(this.buildAggregatedSearchFilter.bind(this)),
        tap(this.saveOnResetSearchFilter.bind(this)),
        tap(this.updateCurrentFilter.bind(this)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
}
