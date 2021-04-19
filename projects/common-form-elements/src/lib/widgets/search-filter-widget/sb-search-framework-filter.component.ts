import {
  Component,
  EventEmitter,
  Inject,
  Input, OnChanges, OnInit,
  Optional,
  Output, SimpleChanges,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PLATFORM_TOKEN} from './injection-tokens';
import {BaseSearchFilterComponent} from './base-search-filter.component';
import {IFrameworkCategoryFilterFieldTemplateConfig} from './framework-category-filter-field-template-config';
import {ISearchFilter} from './models/search-filter';
import {CategoryTerm, FrameworkCategory} from '@project-sunbird/client-services/models';
import {map, takeUntil, tap} from 'rxjs/operators';
import {ISearchFrameworkAssociationsMap} from './models/framework';
import {SearchFrameworkCategoryFormConfigAdapter} from './search-framework-category-form-config-adapter';
import {TitleCasePipe} from '@angular/common';

type IFrameworkCategoryFilter = ISearchFilter<FrameworkCategory['code'], CategoryTerm['name'] | CategoryTerm['name'][]>;

@Component({
  selector: 'sb-search-framework-filter',
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
  providers: [SearchFrameworkCategoryFormConfigAdapter, TitleCasePipe]
})
export class SbSearchFrameworkFilterComponent extends BaseSearchFilterComponent implements OnInit, OnChanges {
  private static readonly DEFAULT_SUPPORTED_FILTER_ATTRIBUTES = ['board', 'medium', 'gradeLevel', 'subject', 'publisher', 'audience'];

  @Input() readonly supportedFilterAttributes: FrameworkCategory['code'][] = SbSearchFrameworkFilterComponent.DEFAULT_SUPPORTED_FILTER_ATTRIBUTES;
  @Input() readonly frameworkAssociations: ISearchFrameworkAssociationsMap = {};
  @Input() readonly baseSearchFilter: IFrameworkCategoryFilter = {};
  @Input() readonly frameworkCategoryFilterFieldTemplateConfig: IFrameworkCategoryFilterFieldTemplateConfig[] = [];
  @Output() searchFilterChange: EventEmitter<IFrameworkCategoryFilter> = new EventEmitter<IFrameworkCategoryFilter>();

  protected isFieldMultipleSelectMap: {[field: string]: boolean} = {};

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private searchFrameworkCategoryFormConfigAdapter: SearchFrameworkCategoryFormConfigAdapter,
    @Optional() @Inject(PLATFORM_TOKEN) public platform: string = 'web'
  ) {
    super(router, activatedRoute);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newSearchFrameworkAssociationsMap: ISearchFrameworkAssociationsMap =
      changes.frameworkAssociations && changes.frameworkAssociations.currentValue;
    const newFilterFormTemplateConfig: IFrameworkCategoryFilterFieldTemplateConfig[] =
      changes.frameworkCategoryFilterFieldTemplateConfig && changes.frameworkCategoryFilterFieldTemplateConfig.currentValue;

    if (newFilterFormTemplateConfig) {
      this.isFieldMultipleSelectMap = newFilterFormTemplateConfig.reduce<
        {[category in FrameworkCategory['code']]: boolean}
        >((acc, config: IFrameworkCategoryFilterFieldTemplateConfig) => {
        acc[config.category] = config.multiple;
        return acc;
      }, {});
    }

    if (newSearchFrameworkAssociationsMap) {
      this.formConfig = this.searchFrameworkCategoryFormConfigAdapter.map(
        newSearchFrameworkAssociationsMap,
        this.frameworkCategoryFilterFieldTemplateConfig,
        this.currentFilter
      );
    }
  }

  ngOnInit(): void {
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
