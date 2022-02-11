import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit,
  Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
  import {AsyncValidatorFactory, CustomFormGroup, FieldConfig, FieldConfigInputType, FieldConfigValidationType, SectionConfig} from '../common-form-config';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash-es';
import * as moment_ from 'moment';
import { FieldComparator } from '../utilities/fieldComparator';
const moment = moment_;

@Component({
  selector: 'sb-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy  {
  @Input() config;
  @Output() initialize = new EventEmitter();
  @Output() finalize = new EventEmitter();

  @Input() dataLoadStatusDelegate = new Subject<'LOADING' | 'LOADED'>();

  @Output() valueChanges = new EventEmitter();
  @Output() statusChanges = new EventEmitter();

  private statusChangesSubscription: Subscription;
  private valueChangesSubscription: Subscription;

  FieldComparator = FieldComparator;
  _: any = _;

  formGroup: CustomFormGroup;
  FieldConfigInputType = FieldConfigInputType;
  fieldDependency: {};
  isSection = false;
  flattenSectionFields;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const formGroupData = {};
    const dependency = [];
    if (changes['config']) {
      if ((changes['config'].currentValue && changes['config'].firstChange)
      || changes['config'].previousValue !== changes['config'].currentValue) {
        this.initialize.emit(this.formGroup);
      }
    }

    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }

    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    this.isSection = !_.isEmpty(_.find(this.config, 'fields'));
    if (this.isSection) {
      this.config.forEach((sections) => {
          sections.fields.forEach((element: any, index) => {
            const formValueList = this.prepareFormValidationData(element, index);
          if (!_.isEmpty(element.depends)) {
            dependency.push({code: element.code, depends: element.depends});
          }
          formGroupData[element.code] = formValueList;
          });
      });
    } else {
      let defaultSection: any = [];
      defaultSection = [
        {
          'name': '',
          'fields': _.cloneDeep(this.config)
        }
      ];

      this.config = _.cloneDeep(defaultSection);
      defaultSection.forEach((sections) => {
        sections.fields.forEach((element: any, index) => {
          const formValueList = this.prepareFormValidationData(element, index);
        if (!_.isEmpty(element.depends)) {
          dependency.push({code: element.code, depends: element.depends});
        }
        formGroupData[element.code] = formValueList;
        });
    });
    }

    this.config.forEach((sections) => {
      sections.fields.forEach((element: any) => {
        if (!_.has(element, 'visible')) {
          element['visible'] = true;
        }
      });
    });
    this.flattenSectionFields = this.getFlattenedSectionFields();
    this.formGroup = this.formBuilder.group(formGroupData);

    this.statusChangesSubscription = this.formGroup.valueChanges.pipe(
      tap((v) => {
        this.emitFormGroupStatus();
      })
    ).subscribe();

    this.valueChangesSubscription =  this.formGroup.valueChanges.pipe(
      tap((data) => {
        this.valueChanges.emit(data);
      })
    ).subscribe();

    this.emitInitialFormGroupValue();
    this.emitFormGroupStatus();
  }



  ngOnDestroy(): void {
    this.finalize.emit();

    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }

    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }


  emitInitialFormGroupValue() {
    this.valueChanges.emit(this.formGroup.value);
  }

  emitFormGroupStatus() {
    this.statusChanges.emit({
      isPristine: this.formGroup.pristine,
      isDirty: this.formGroup.dirty,
      isInvalid: this.formGroup.invalid,
      isValid: this.formGroup.valid,
      controls: this.getFormValidationErrors()
    });
  }

  getFormValidationErrors() {
    const errors = [];
    _.keys(this.formGroup.controls).forEach(key => {
      const controlErrors = this.formGroup.get(key).errors;
      if (controlErrors != null) {
        _.keys(controlErrors).forEach(keyError => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[ keyError ]
          });
        });
      }
    });
    return errors;
  }


  private prepareFormValidationData(element: any, index) {
    const formValueList = [];
    const validationList = [];

    let defaultVal: any = '';
    switch (element.inputType) {
      case 'text':
        defaultVal = element.default || null;
        break;
      case 'date':
        defaultVal = element.default || null;
        break;  
      case 'dialcode':
        defaultVal = element.default || null;
        break;
      case 'textarea':
        defaultVal = element.default || null;
        break;
      case 'timer':
        defaultVal = element.default || null;
        break;
      case 'richtext':
        defaultVal = element.default || null;
        break;
      case 'select':
      case 'topicselector':
      case 'framework':
      case 'frameworkCategorySelect':
        if (element.default) {
          if (element.dataType === 'list') {
            if (_.isArray(element.default)) {
              defaultVal = element.default;
            } else {
              defaultVal = _.toArray(element.default);
            }
          } else if (element.dataType === 'text') {
            if (_.isString(element.default)) {
              defaultVal = element.default;
            } else {
              defaultVal = _.toString(element.default);
            }
          } else if (element.dataType === 'number') {
            if (_.isNumber(element.default)) {
              defaultVal = element.default;
            } else {
              defaultVal = _.toNumber(element.default);
            }
          }
        } else {
          defaultVal = null;
        }
        break;
      case 'multiselect':
          if (element.default) {
            if (element.dataType === 'list' && _.isArray(element.default)) {
              defaultVal = element.default;
            } else if (element.dataType === 'list' && _.isString(element.default)) {
              if (_.includes(element.default, ',')) {
                defaultVal = _.split(element.default, ',');
              } else {
                defaultVal = [element.default];
              }
            } else if (element.dataType === 'text') {
              if (_.includes(element.default, ',')) {
                defaultVal = _.split(element.default, ',');
              } else {
                defaultVal = [element.default];
              }
            }
          } else {
            defaultVal = [];
          }
          break;
      case 'nestedselect':
      case 'frameworkCategoryNestedSelect':
          defaultVal = element.dataType === 'list' ?
          (element.default && Array.isArray(element.default) ? element.default :
          _.isEmpty(element.default) ? [] : [element.default]) :
          (element.default || null);
          break;
      case 'checkbox':
        defaultVal = (element.dataType === 'text') ? (element.default === 'Yes' ? 'Yes' : 'No') : !!element.default;
        break;
      case 'radio':
        defaultVal = element.default || null;
        break;
    }

    formValueList.push(defaultVal);

    if (element.validations && element.validations.length) {
      element.validations.forEach((data, i) => {
        if (element.inputType === 'dialcode') { return false; }
        switch (data.type) {
          case 'required':
            if (element.inputType === 'select' || element.inputType === 'multiselect' || element.inputType === 'nestedselect' ||
            element.inputType === 'frameworkCategorySelect') {
              validationList.push(Validators.required);
            } else if (element.inputType === 'checkbox') {
              validationList.push(Validators.requiredTrue);
            } else {
              validationList.push(Validators.required);
            }
            break;
          case 'pattern':
            validationList.push(Validators.pattern(element.validations[i].value as string));
            break;
          case 'minLength':
            if (element.inputType === 'richtext') {
              validationList.push(this.validateRichTextLength.bind(this, 'minLength' , '<', element.validations[i].value ));
             } else {
              validationList.push(Validators.minLength(element.validations[i].value as number));
             }
            break;
          case 'maxLength':
            if (element.inputType === 'richtext') {
              validationList.push(this.validateRichTextLength.bind(this, 'maxLength' , '>', element.validations[i].value ));
             } else {
              validationList.push(Validators.maxLength(element.validations[i].value as number));
             }
            break;
          case 'min':
            validationList.push(Validators.min(element.validations[i].value as number));
            break;
          case 'max':
            validationList.push(Validators.max(element.validations[i].value as number));
            break;
          case 'time':
            validationList.push(this.validateTime.bind(this, element.validations[i].value, element));
            break;
          case 'maxTime':
            validationList.push(this.compareTime.bind(this, element.validations[i].value, element.validations[i].type));
            break;
          case 'minTime':
            validationList.push(this.compareTime.bind(this, element.validations[i].value, element.validations[i].type));
            break;
          case 'compare':
            validationList.push(this.compareFields.bind(this, element.validations[i].criteria));
            break;
          case 'noOfFields':
              validationList.push(this.checkFields.bind(this, element.validations[i]));
            break;  
          case 'minDate':
            validationList.push(this.compareDate.bind(this, element.validations,element.validations[i]));
            break;
          case 'maxDate':
              validationList.push(this.compareDate.bind(this, element.validations,element.validations[i]));
            break;
        }
      });
    }
    formValueList.push(Validators.compose(validationList));
    return formValueList;
  }


  fetchContextTerms(config: FieldConfig<any>, context) {
    return _.get(_.find(config, {'code': context}), 'terms') || null;
  }

  getAllDependsFormControl(code, depends) {
    const fieldDepends: any = {};
    _.forEach(depends, depend => {
        if (this.formGroup.get(depend)) {
            fieldDepends[depend] = this.formGroup.get(depend);
        }
      });
    return fieldDepends || null;
  }

  fetchDependencyTerms(code, depends) {
    const dependsTerms = _.map(_.filter(this.flattenSectionFields, c => {
      return _.includes(depends, c.code);
    }), (depend) => {
      return depend.terms || depend.range;
    });
    return _.compact(_.flatten(dependsTerms));
  }

  getAppIcon(config, val) {
    if (val) {
      return config.filter(field => {
        return field.code === 'appicon';
      });
    } else {
       return config.filter(field => {
        return field.code !== 'appicon';
      });
    }
  }

  groupBySection(config) {
    const fields = this.getAppIcon(config, false);
    return _.groupBy(fields, 'section.index');
  }

  getFlattenedSectionFields() {
    return _.flatten(_.map(this.config, 'fields'));
  }

  validateTime(pattern, field, control: AbstractControl): ValidationErrors | null  {
    const isPatternMatched = moment(control.value, pattern, true).isValid();
    if (!isPatternMatched && (control.touched || control.dirty)) {
      return {time : true};
    }
    return null;
    // return moment(control.value, pattern, true).isValid() && control.touched ? null : {time: true};
  }

  compareTime(timeValue, type, control: AbstractControl): ValidationErrors | null {
    if (control.value && timeValue) {
      const inputTime = control.value.split(':');
      const timeRequired = timeValue.split(':');
      const timeRequiredInSeconds = (_.parseInt(timeRequired[0]) * 3600) +
      (_.parseInt(timeRequired[1]) * 60);
      const inputTimeInSeconds = (_.parseInt(inputTime[0]) * 3600) +
      (_.parseInt(inputTime[1]) * 60);
      if (type === 'maxTime') {
        if (inputTimeInSeconds > timeRequiredInSeconds) {
          return { maxtime: true };
        }
      }
      if (type === 'minTime') {
        if (inputTimeInSeconds < timeRequiredInSeconds) {
          return { mintime: true };
        }
      }
      return null;
    } else {
      return null;
    }
  }



  compareFields(criteria, control: AbstractControl): ValidationErrors | null {
    const result = _.find(criteria, (val, key) => {
      if (control && control.parent && control.parent.controls[val]) {
        return FieldComparator.operators[key](control.parent.controls[val].value, control.value);
      } else {
        return false;
      }
    });
    if (result && (control.touched || control.dirty)) {
      return { compare: true };
    }
    return null;
    // return result ? {compare: true} : null;
  }

  compareDate(validations,types, control: AbstractControl): ValidationErrors | null {
    let result = validations.find(data => data.type === 'dateFormat');
    let minDate = moment_(types.value, result.value).format('YYYY-MM-DD');
    let maxDate = moment_(types.value, result.value).format('YYYY-MM-DD');
      if ((types.type==='minDate' && control.value < minDate)){
        return {mindate:types.message};
      }
      else if((types.type==='maxDate' && control.value > maxDate)){
        return {maxdate:types.message};
      }
      return null;
    }

    validateRichTextLength(validationType, keyOperator, validationValue, control: AbstractControl): ValidationErrors | null {
      let comp;
        if (control.touched) {
          comp = FieldComparator.operators[keyOperator](control['richTextCharacterCount'], validationValue);
        } else {
          comp =  false;
        }
      if (comp && (control.touched || control.dirty)) {
        return { [_.toLower(validationType)]: true };
      }
      return null;
    }

    checkFields(validationType, control: AbstractControl) {
    if (validationType.type === 'noOfFields' && control.value.length > +validationType.value) {
      console.log(validationType.message);
      return { noOfFeilds: true };
    }
  }

}
