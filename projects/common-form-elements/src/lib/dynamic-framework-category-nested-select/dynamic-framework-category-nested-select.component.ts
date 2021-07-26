import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy,
  OnInit, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {from, Subject, merge, Observable} from 'rxjs';
import {FieldConfig, FieldConfigOptionsBuilder, DynamicFieldConfigOptionsBuilder,
  CustomFormControl, FieldConfigOption, CustomFormGroup} from '../common-form-config';
import {takeUntil, tap} from 'rxjs/operators';
import {fromJS, List, Map, Set} from 'immutable';
import * as _ from 'lodash-es';

@Component({
  selector: 'sb-dynamic-framework-category-nested-select',
  templateUrl: './dynamic-framework-category-nested-select.component.html',
  styleUrls: ['./dynamic-framework-category-nested-select.component.css']
})
export class DynamicFrameworkCategoryNestedSelectComponent implements OnInit, OnChanges {

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
  masterSelected: boolean= false;
  showModal = false;
  tempValue = Set<any>();
  resolvedOptions = List<Map<string, string>>();
  optionValueToOptionLabelMap = Map<any, string>();

  fromJS = fromJS;

  private dispose$ = new Subject<undefined>();
  options$?: Observable<FieldConfigOption<any>[]>;
  isDependsTouched: any;
  tempAssociation: any;
  latestParentValue: any;
  isDynamicDependencyTerms: any;
  associationOption: any;
  termsForDependantFieldsBySelectedValue: any;

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

    if (!this.options) {
      this.options = _.isEmpty(this.field.options) ? this.isOptionsClosure(this.field.options) && this.field.options : [];
    }

    if (!_.isEmpty(this.depends)) {
      this.checkForCustomEventHandler();
      this.handleDependantFieldChanges();
    }
    this.handleSelfChange();
    this.handleClosureOption();
    this.checkIfDependsHasDefault();

    if (!_.isEmpty(this.default)) {
      this.formControlRef.updateValueAndValidity({onlySelf: false, emitEvent: true});
    }


    if (this.field && this.field.range && _.isEmpty(this.options)) {
      this.options = this.field.range;
    } else if (this.field && this.field.terms && _.isEmpty(this.options)) {
      this.options = this.field.terms;
    }

    this.setupOptions();
    this.isAllSelected();
  }

  checkIfDependsHasDefault() {
    this.checkIfDependsIsInvalid();
    this.checkIfDependsIsTouched();
    this.generateDependencyTerms();
    this.associationOption = this.fetchDependencyTerms();
    this.options = this.associationOption;
    this.setupOptions();
    this.isAllSelected();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['options'] || !changes['options'].currentValue) {
      return;
    }
  }

  checkForCustomEventHandler() {
    merge(..._.compact(_.map(this.depends, depend => depend.customEventHandler$))).pipe(
      takeUntil(this.dispose$)
      ).subscribe(
        (response) => {
          if (response === true) {
            this.checkIfDependsHasDefault();
            this.setTermsForDependantFields(this.formControlRef.value);
            if (!_.isEmpty(this.formControlRef.value)) {
              // tslint:disable-next-line:max-line-length
              this.formGroup.lastChangedField = {code: this.field.code, value: this.formControlRef.value, sourceCategory: this.field.sourceCategory};
            }
          }
        }, error => {
          console.log(error);
        }
      );
  }

  generateDependencyTerms() {
    this.isDynamicDependencyTerms = _.compact(_.flatten(_.map(this.depends, depend => {
      return depend.termsForDependantFields;
    })));
  }

  handleDependantFieldChanges() {
    if (!_.isEmpty(this.depends)) {
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
          this.checkIfDependsIsTouched();
        }),
        takeUntil(this.dispose$)
      ).subscribe();

      this.checkIfDependsIsInvalid();
    }
  }

  handleSelfChange() {
    this.formControlRef.valueChanges.pipe(
      tap((value) => {
        this.formControlRef.termsForDependantFields = [];
        if (value && this.tempAssociation) {
          this.setTermsForDependantFields(value);
          this.setTempValue(value);
          // tslint:disable-next-line:max-line-length
          this.formGroup.lastChangedField = {code: this.field.code, value: this.formControlRef.value, sourceCategory: this.field.sourceCategory};
        } else if (this.tempAssociation) {
          const termsByValue = this.getTermsByValue([this.tempAssociation], value, true);
          if (termsByValue) {
             this.formControlRef.termsForDependantFields.push(...termsByValue);
          }
          this.setTempValue(value);
        }
        // this.setTempValue(value);
        this.changeDetectionRef.detectChanges();
      }),
      takeUntil(this.dispose$)
    ).subscribe();
  }

  handleClosureOption() {
    if (this.isOptionsClosure(this.options)) {
      // tslint:disable-next-line:max-line-length
      this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)
      (this.formControlRef,
        this.depends,
        this.formGroup,
        () => this.dataLoadStatusDelegate.next('LOADING'),
        () => this.dataLoadStatusDelegate.next('LOADED')) as any;

      this.options$.subscribe(
        (response) => {
          this.checkIfDependsIsInvalid();
          this.dependencyTerms = response;
        },
      );
    }
  }


  setTermsForDependantFields(value) {
    this.termsForDependantFieldsBySelectedValue = this.getTermsBasedOnSelectedValue(this.tempAssociation, value);
    if (!_.isEmpty(this.termsForDependantFieldsBySelectedValue)) {
      this.formControlRef.termsForDependantFields.push(...this.getTermsByValue(this.termsForDependantFieldsBySelectedValue, value, true));
    }
  }


  checkIfDependsIsInvalid() {
    this.isDependsInvalid = _.every(_.map(this.depends, depend => depend.invalid), item => item === true);
    return this.isDependsInvalid;
  }

  checkIfDependsIsTouched() {
    this.isDependsTouched = _.some(_.map(this.depends, depend => depend.touched), item => item === true);
    return this.isDependsTouched;
  }

  getTermsBasedOnSelectedValue(categories, value) {
    if (categories) {
      const filteredCategories = _.filter(categories, category => {
      return !_.isEmpty(this.field.output) ?
          _.includes(value, category[this.field.output]) :
          _.includes(value, category.name);
      });
      return filteredCategories;
    }
  }

  fetchAssociations() {
    // && this.context.value && this.field.association
    if (!_.isEmpty(this.depends)) {
      const filteredTerm = _.find(this.dependencyTerms, terms => {
        return _.includes(this.getParentValue(), terms.identifier);
      });
      if (filteredTerm) {
        this.tempAssociation =  _.filter(filteredTerm.associations, association => {
          return association.category === this.field.code;
        });
        return this.tempAssociation;
      } else  {
        return this.options;
      }
    } else {
      return this.options;
    }
  }

  fetchDependencyTerms() { // subject
    if (!_.isEmpty(this.isDynamicDependencyTerms)) {
      const filteredTerm = this.getTermsByValue(this.isDynamicDependencyTerms, this.getParentValue(), true);
      if (!_.isEmpty(filteredTerm)) {

        const consolidatedAssociations = [];

        _.forEach(filteredTerm, item => {
            let tempAssociations: any;
            let lookUp: string;
            if (item.categories) {
              tempAssociations = item.categories;
              lookUp = 'code';
            } else if (item.terms) {
              tempAssociations = item.terms;
              lookUp = 'category';
            } else if (item.associations) {
              tempAssociations = item.associations;
              lookUp = 'category';
            }

            const filteredCategory = _.filter(tempAssociations, association => {
              return (this.field.sourceCategory) ? (association[lookUp] === this.field.sourceCategory) :
              association[lookUp] === this.field.code;
            });
            consolidatedAssociations.push(...this.extractAndFlattenTerms(filteredCategory));
        });

        this.tempAssociation = _.uniqBy(consolidatedAssociations, 'identifier');
        return this.tempAssociation;
      }
    }
  }

  getTermsByValue(categories, value,  doFlatten?) {
    let array = categories;
    if (doFlatten) {
      array = _.flatten(categories);
    }
    if (!_.isEmpty(array)) {
      const filteredTerms = _.filter(array, terms => {
        return !_.isEmpty(this.field.output) ?
        _.includes(value, terms[this.field.output]) :
        _.includes(value, terms.name) ;
      });
      return filteredTerms || [];
    }
  }

  extractAndFlattenTerms(categories) {
    return _.flatten(_.map(categories, category => {
      if (_.has(category, 'terms')) {
        return category.terms;
      } else if (_.has(category, 'association')) {
        return category.associations;
      } else if (_.has(category, 'categories')) {
        return category.categories;
      } else {
        return category;
      }
    }));
  }

  getParentValue() {
    return !_.isEmpty(this.latestParentValue) && this.latestParentValue ||
    !_.isEmpty(this.formGroup.lastChangedField) &&
    !_.isEmpty(this.formGroup.lastChangedField.value) &&
    this.formGroup.lastChangedField.value ||
    _.castArray(_.last(_.compact(_.flatten((_.map(this.depends, 'value'))))));
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
      if (this.field.output) {
        if (this.tempValue.includes(option.get(this.field.output))) {
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
      if (this.field.output) {
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

  private isOptionsClosure(options?: any) {
    if (options) {
      return typeof options === 'function';
    }
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

    this.setTempValue(this.default);
  }

  resetMasterSelected() {
    this.masterSelected = false;
  }

  setMasterSelected() {
    this.masterSelected = true;
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
