import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy,
  OnInit, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {from, Subject, merge} from 'rxjs';
import {FieldConfig, FieldConfigOptionsBuilder, DynamicFieldConfigOptionsBuilder, CustomFormControl, CustomFormGroup} from '../common-form-config';
import {takeUntil, tap} from 'rxjs/operators';
import {fromJS, List, Map, Set} from 'immutable';
import * as _ from 'lodash-es';
import { getAssociation, getSelectedCategoryTerms } from '../utilities/utility';
@Component({
  selector: 'sb-dynamic-multiple-dropdown',
  templateUrl: './dynamic-multiple-dropdown.component.html',
  styleUrls: ['./dynamic-multiple-dropdown.component.scss']
})
export class DynamicMultipleDropdownComponent implements OnInit, OnChanges, OnDestroy {

  @Input() disabled?: boolean;
  @Input() field: FieldConfig<String>;
  @Input() options: any;
  @Input() label?: string;
  @Input() labelHtml: any;
  @Input() placeholder?: string;
  @Input() isMultiple = true;
  @Input() context?: FormControl;
  @Input() formControlRef?: CustomFormControl;
  @Input() formGroup?: CustomFormGroup;
  @Input() platform: any = 'web';
  @Input() default?: any;
  @Input() contextData: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  @Input() depends?: FormControl[];
  @Input() dependencyTerms?: any = [];

  _: any = _;


  public isDependsInvalid: any;
  public isDependsEmpty: boolean = false;
  masterSelected: boolean = false;
  showModal = false;
  tempValue = Set<any>();
  resolvedOptions = List<Map<string, string>>();
  optionValueToOptionLabelMap = Map<any, string>();
  latestParentValue: string;

  fromJS = fromJS;

  private dispose$ = new Subject<undefined>();

  @HostListener('document:click')
  docClick() {
    if (this.showModal) {
      this.showModal = false;
    }
  }
  constructor(
    private changeDetectionRef: ChangeDetectorRef
  ) {
  }
  ngOnInit() {

    if (!_.isEmpty(this.field.sourceCategory)) {
      this.formControlRef.sourceCategory = this.field.sourceCategory;
    }

    if (!_.isEmpty(this.field.output)) {
      this.formControlRef.output = this.field.output;
    }

    if (this.field && this.field.range) {
      this.options = this.field.range;
    }

    if (!_.isEmpty(this.depends)) {
      this.handleDependantFieldChanges();
      this.checkIfDependsHasDefault();
    }

    this.handleSelfChange();
    this.setupOptions();
    this.isAllSelected();
  }

  handleDependantFieldChanges() {
    merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
      tap(() => {
        this.formControlRef.patchValue(null);
        this.checkIfDependsHasDefault();
        this.resetTempValue();
        this.resetMasterSelected();
      }),
      takeUntil(this.dispose$)
    ).subscribe();

    merge(..._.map(this.depends, depend => depend.statusChanges)).pipe(
      tap(() => {
        this.checkIfDependsIsInvalid();
        this.isDependsEmpty = _.some(_.map(this.depends, depend => depend.value), _.isEmpty);
      }),
      takeUntil(this.dispose$)
    ).subscribe();

    this.checkIfDependsIsInvalid();
    this.isDependsEmpty = _.some(_.map(this.depends, depend => depend.value), _.isEmpty);
  }

  handleSelfChange() {
    this.formControlRef.valueChanges.pipe(
      tap((value) => {
        this.setTempValue(value);
        if (!_.isEmpty(this.formControlRef.value)) {
          // tslint:disable-next-line:max-line-length
          this.formGroup.lastChangedField = { code: this.field.code, value: this.formControlRef.value , sourceCategory: this.field.sourceCategory};
        }
        this.changeDetectionRef.detectChanges();
      }),
      takeUntil(this.dispose$)
    ).subscribe();
  }

  checkIfDependsHasDefault() {
    this.checkIfDependsIsInvalid();
    this.options = this.fetchDependencyTerms();
    this.setupOptions();
    this.isAllSelected();

  }

  fetchDependencyTerms() {
    if (!_.isEmpty(this.dependencyTerms) && !_.isEmpty(this.depends)) {
      const filterDependencyTerms = this.filterDependencyTermsByLastChangedValue();
      const filteredTerm = _.filter(filterDependencyTerms, terms => {
        return !_.isEmpty(this.field.output) ?
        _.includes(this.getParentValue(), terms[this.field.output]) :
        _.includes(this.getParentValue(), terms.name) ;
      });
      if (!_.isEmpty(filteredTerm)) {
        const tempAssociation =  _.filter(_.compact(_.flatten(_.map(filteredTerm, 'associations'))), association => {
          return (this.field.sourceCategory) ?
          (_.toLower(association.category) === _.toLower(this.field.sourceCategory)) :
          _.toLower(association.category) === _.toLower(this.field.code);
        });
        return _.uniqBy(tempAssociation, 'identifier');
      } else  {
        return this.options;
      }
    }
  }

  getParentValue() {
    return !_.isEmpty(this.latestParentValue) && this.latestParentValue ||
    _.castArray(_.last(_.compact(_.map(this.depends, 'value'))));
  }

  filterDependencyTermsByLastChangedValue() {
    const field = this.formGroup.lastChangedField;
    if (!_.isEmpty(field) && field.code !== this.field.code && _.includes(this.field.depends, field.code)) {
      return _.filter(this.dependencyTerms, terms => {
        return field.sourceCategory ?
        _.toLower(terms.category) === _.toLower(field.sourceCategory) :
        _.toLower(terms.category) === _.toLower(field.code);
      });
    } else {
      return this.dependencyTerms;
    }
  }


  checkIfDependsIsInvalid() {
    this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
    return this.isDependsInvalid;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['options'] || !changes['options'].currentValue) {
      return;
    }
  }

  onSubmit() {
    const finalValue = this.tempValue.toList().toJS();
    this.formControlRef.patchValue(this.isMultiple ? finalValue : finalValue[0]);
    this.formControlRef.markAsDirty();
    this.showModal = false;
  }

  openModal(event) {
    if (this.context && this.context.invalid) {
      return;
    }
    if (this.disabled === true || this.isDependsInvalid) {
      return;
    }

    this.setTempValue(this.formControlRef.value);
    const htmlCollection = document.getElementsByClassName('sb-modal-dropdown-web');
    const modalElements = Array.from(htmlCollection);
    const isModalAlreadyOpened = modalElements.some((element: HTMLElement) => element.hidden === false );

    if (this.platform === 'web' && isModalAlreadyOpened && !this.showModal) {
      modalElements.forEach((item: HTMLElement) => {
        item.hidden = true;
      });
    }

    if (this.platform === 'web' && this.showModal) {
      this.showModal = false;
    } else {
      this.showModal = true;
    }

    event.stopPropagation();
  }

  addSelected(option: Map<string, string>) {
    if (this.isMultiple) {
      if(this.field.output) {
        if(this.tempValue.includes(option.get(this.field.output))) {
          this.tempValue = this.tempValue.remove(option.get(this.field.output));
        } else {
          this.tempValue = this.tempValue.add(option.get(this.field.output));
        }
      } else if (this.tempValue.includes(option.get('name'))) {
        this.tempValue = this.tempValue.remove(option.get('name'));
      } else if (this.tempValue.includes(option.get('identifier'))) {
        this.tempValue = this.tempValue.remove(option.get('identifier'));
      } else {
        this.tempValue = this.tempValue.add(option.get('name'));
      }
    } else {
      if(this.field.output) {
        this.tempValue = this.tempValue.clear();
        this.tempValue = this.tempValue.add(option.get(this.field.output))
      } else {
        this.tempValue = this.tempValue.clear();
        this.tempValue = this.tempValue.add(option.get('name'));
      }
    }

    this.masterSelected = this.tempValue.size === this.options.length;
  }

  onCancel() {
    this.formControlRef.markAsDirty();
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }

  private isOptionsArray() {
    return Array.isArray(this.options);
  }

  private isOptionsClosure() {
    return typeof this.options === 'function';
  }

  private isOptionsMap() {
    return !Array.isArray(this.options) && typeof this.options === 'object';
  }

  private setTempValue(value: any) {
    if (value) {
      if (Array.isArray(value)) {
        this.tempValue = Set(fromJS(value));
      } else {
        this.tempValue = Set(fromJS([value]));
      }
      // this.onSubmit();
    }
  }

  resetTempValue() {
    this.tempValue = Set(null);
    this.default = [];
  }

  resetMasterSelected() {
    this.masterSelected = false;
  }

  setMasterSelected() {
    this.masterSelected = true;
  }

  private setupOptions() {
    if (!this.options) {
      this.options = [];
      this.resolvedOptions = this.resolvedOptions.clear();
    }

    if (this.isOptionsArray()) {
      const optionMap = _.map(this.options, option => {
        return {
          identifier: option.value || option.identifier || option.name || option,
          name: option.label || option.name || option.value || option,
        };
      });
      this.resolvedOptions = fromJS(optionMap);
    } else if (this.isOptionsMap()) {
      this.resolvedOptions = (this.depends) ?
        fromJS(this.options[this.context.value]) :
        this.resolvedOptions;
    } else if (this.isOptionsClosure()) {
      from((this.options as DynamicFieldConfigOptionsBuilder<any>)(
        this.formControlRef,
        this.depends,
        this.formGroup,
        () => this.dataLoadStatusDelegate.next('LOADING'),
        () => this.dataLoadStatusDelegate.next('LOADED')
      )).pipe(
        tap((options = []) => {
          this.resolvedOptions = fromJS(options);

          this.resolvedOptions.forEach((option) => {
            const value: any = !_.isEmpty(this.field.output) ? option.get(this.field.output) :
             option.get('name') || option.get('identifier') || option.get('value') || option;
            const labelVal: any = option.get('name') || option.get('label') || option;

            this.optionValueToOptionLabelMap = this.optionValueToOptionLabelMap.set(value, labelVal);
          });

          this.setTempValue(this.default);

          this.changeDetectionRef.detectChanges();
        }),
        takeUntil(this.dispose$)
      ).subscribe();
    }

    if (this.resolvedOptions) {
      this.resolvedOptions.forEach((option) => {
        const value: any = !_.isEmpty(this.field.output) ? option.get(this.field.output) :
        option.get('name') || option.get('identifier') || option.get('value') || option;

        const labelVal: any = option.get('name') || option.get('label') || option;

        this.optionValueToOptionLabelMap = this.optionValueToOptionLabelMap.set(value, labelVal);
      });
    }

    this.resolvedOptions = this.sortOptions(this.resolvedOptions);

    this.setTempValue(this.default);
  }

  sortOptions(options) {
    return  options.sort((option, b) => {
      const firstVal = option.get(this.field.output) || option.get('value') || option.get('identifier') || option.get('name') || option.get('label');
      const secondVal = b.get(this.field.output) || b.get('value') || b.get('identifier') || b.get('name') || b.get('label');
      if (_.isString(firstVal)) {
        return (firstVal).localeCompare((secondVal), undefined, {
          numeric: true,
          sensitivity: 'base'
        });
      } else if (_.isNumber(firstVal)) {
       return firstVal - secondVal;
      }
       // tslint:disable-next-line:max-line-length
     });
   }

   isAllSelected() {
    if (this.isOptionsArray()) {
      if (this.default && this.default.length > 1 && this.default.length == this.options.length) {
        this.setMasterSelected();
      }
    }
  }

  checkUncheckAll() {
    this.formControlRef.patchValue(null);
    this.resetTempValue();

    if (this.masterSelected === false) {
      this.resolvedOptions.forEach(option => {
        this.addSelected(option);
      });

      this.onSubmit();
    } else {
      this.resetMasterSelected();
    }
  }
}
