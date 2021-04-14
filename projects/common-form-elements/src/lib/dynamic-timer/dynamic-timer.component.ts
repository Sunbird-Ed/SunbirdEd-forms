import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash-es';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { DynamicFieldConfigOptionsBuilder, FieldConfig, FieldConfigAsyncValidation, FieldConfigOption } from '../common-form-config';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { FieldComparator } from '../utilities/fieldComparator';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'sb-dynamic-timer',
  templateUrl: './dynamic-timer.component.html',
  styleUrls: ['./dynamic-timer.component.css']
})
export class DynamicTimerComponent implements OnInit, OnDestroy {

  FieldComparator: any = FieldComparator;
  @Input() asyncValidation?: FieldConfigAsyncValidation;
  @Input() label: String;
  @Input() field: FieldConfig<String>;
  @Input() options: any;
  @Input() depends?: FormControl[];
  @Input() dependencyTerms?: any = [];

  @Input() type?: string;
  @Input() styleClass?: string;

  @Input() labelHtml: any;
  @Input() placeholder: String;
  @Input() validations?: any;
  @Input() formControlRef?: FormControl;
  @Input() formGroup?: FormGroup;

  @Input() prefix?: String;
  @Input() default: String;
  @Input() disabled: Boolean;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;

  @ViewChild('validationTrigger', {static: false}) validationTrigger: ElementRef;
  public isDependsInvalid: any;
  contextValueChangesSubscription?: Subscription;
  options$?: Observable<FieldConfigOption<any>[]>;
  value: any = null;
  maxValue: any = [];

  constructor(private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.findMaxValue();
    if (!this.options) {
      this.options = _.isEmpty(this.field.options) ? this.isOptionsClosure(this.field.options) && this.field.options : [];
    }

    if (this.isOptionsClosure(this.options) && !_.isEmpty(this.depends)) {
      // tslint:disable-next-line:max-line-length
      this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)(this.formControlRef, this.depends, this.formGroup, () => this.dataLoadStatusDelegate.next('LOADING'), () => this.dataLoadStatusDelegate.next('LOADED')) as any;
      this.options$.subscribe(
        (response) => {
            this.dependencyTerms = response;
        },
      );
    }

    if (!_.isEmpty(this.depends)) {
      this.contextValueChangesSubscription =  merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
       tap((value: any) => {
         this.value = null;
         this.formControlRef.patchValue(null);
         this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
       })
       ).subscribe();
       this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
     }

     this.setDefaultValue();
  }

  setDefaultValue() {
    if (!_.isEmpty(this.default)) {
      this.value = this.default;    }
  }

  checkValue(str, max) {
    if (str.charAt(0) !== '0') {
      let num = _.parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) {
        num = max;
      }
      console.log(num, max, _.parseInt(max.toString().charAt(0)), num.toString().length);
      if (num > _.parseInt(max.toString().charAt(0)) && num.toString().length === 1) {
        str = '0' + num;
      } else if (num === _.parseInt(max.toString()) && num.toString().length === 1) {
        str = '0' + num;
      } else {
        str = num.toString();
      }
      // str = num > _.parseInt(max.toString().charAt(0)) && num.toString().length === 1 ? '0' + num : num.toString();
    }  else if (str.charAt(0) === '0' && str.toString().length === 2   && str !== '00' ) {
      let num = _.parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) {
        num = str;
      }
      console.log(num, max);
      str = num > _.parseInt(max.toString().charAt(0)) && num.toString().length === 2 ? '0' + max : '0' +  num.toString();
    } else if (str.toString().length > 2) {
      let num = _.parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) {
        num = str;
      }
      str = num > _.parseInt(max.toString().charAt(0)) && num.toString().length === 2 ? '0' + max : '0' +  num.toString();
    }
    return str;
  }

  onChangeEvent(event?: any, type?) {
    type = 'text';
    let input = event.target.value;
    if (/\D\/$/.test(input)) { input = input.substr(0, input.length - 3); }


    const values = input.split(':').map((v) => {
      return v.replace(/\D/g, '');
    });

    if (!_.isEmpty(this.maxValue)) {
      _.forEach(values, (val, index) => {
        if (values[index]) {
          values[index] = this.checkValue(val, this.maxValue[index]);
        }
      });
      const output = values.map((v, i) => {
        if (this.maxValue[i] && this.maxValue[i].length && v.length === this.maxValue[i].length &&
          i <= this.maxValue.length) {
            return v + ':';
        } else if (this.maxValue[i] && this.maxValue[i].length && this.maxValue[i].length < v.length) {
          return v.substr(0, this.maxValue[i].length);
        } else {
          return v;
        }
      });
      this.value = output.join('').substr(0, this.getMaxValueLength());
    }

    this.formControlRef.markAsTouched();
    this.formControlRef.patchValue(this.value);
  }

  findMaxValue() {
    let maxObj = _.find(this.validations, {type: 'max'});
    maxObj = maxObj && maxObj.value ? maxObj :
    !_.isEmpty(_.compact(this.dependencyTerms)) ?
     {type: 'max', value: this.dependencyTerms} : {};
    this.maxValue = maxObj && maxObj.value ? maxObj.value.split(':').map((v) => v.replace(/\D/g, '')) : [];
  }

  getMaxValueLength() {
    const flattenedArray = this.maxValue.join(':');
    return flattenedArray && flattenedArray.length;
  }

  isOptionsClosure(options: any) {
    return typeof options === 'function';
  }

  ngOnDestroy(): void {
    if (this.contextValueChangesSubscription) {
      this.contextValueChangesSubscription.unsubscribe();
    }
  }

}
