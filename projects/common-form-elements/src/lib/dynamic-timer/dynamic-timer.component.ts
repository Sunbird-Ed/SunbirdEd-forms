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

  @ViewChild('validationTrigger') validationTrigger: ElementRef;
  @ViewChild('hourField') hourField: ElementRef;
  @ViewChild('minField') minField: ElementRef;
  public isDependsInvalid: any;
  contextValueChangesSubscription?: Subscription;
  maxValue: any = [];
  hourOptions = [];
  minuteOptions = [];
  defaultMin: any = null;
  defaultHr: any = null;
  placeholders = [];
  constructor(private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getPlaceHolder();
    this.findMaxValue();
    this.getHourAndMinuteOptions();
    if (!_.isEmpty(this.depends)) {
      this.contextValueChangesSubscription =  merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
       tap((value: any) => {
        this.defaultHr = null;
        this.defaultMin = null;
        this.hourField.nativeElement.value = null;
        this.minField.nativeElement.value = null;
         this.formControlRef.patchValue(null);
         this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
       })
       ).subscribe();
       this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
     }
  }

  ngAfterViewInit() {
    this.setDefaultValue();
  }

  getPlaceHolder() {
    if (this.placeholder) {
      this.placeholders = this.placeholder.split(':');
    } else {
      this.placeholders[0] = 'hh';
      this.placeholders[1] = 'mm';
    }
  }

  getHourAndMinuteOptions() {
    let maxHour = 5;
    if (!_.isEmpty(this.maxValue)) {
      maxHour = Number(this.maxValue[0]);
    }
    for (let i = 0; i <= maxHour; i++) {
      if (i.toString().length === 1) {
        this.hourOptions.push('0' + i.toString());
      } else {
        this.hourOptions.push(i.toString());
      }
    }
    for (let i = 0; i < 60; i++) {
      if (i.toString().length === 1) {
        this.minuteOptions.push('0' + i.toString());
      } else {
        this.minuteOptions.push(i.toString());
      }
    }
  }

  setDefaultValue() {
    if (!_.isEmpty(this.default)) {
      const defaultTime = this.default.split(':');
      this.defaultHr = defaultTime[0];
      this.defaultMin = defaultTime[1];
      this.hourField.nativeElement.value = defaultTime[0];
      this.minField.nativeElement.value = defaultTime[1];
      this.formControlRef.markAsTouched();
      this.formControlRef.patchValue(this.defaultHr + ':' + this.defaultMin + ':' + '00');
    }
  }

  findMaxValue() {
    let maxObj = _.find(this.validations, {type: 'maxTime'});
    maxObj = maxObj && maxObj.value ? maxObj :
    !_.isEmpty(_.compact(this.dependencyTerms)) ?
     {type: 'max', value: this.dependencyTerms} : {};
    this.maxValue = maxObj && maxObj.value ? maxObj.value.split(':').map((v) => v.replace(/\D/g, '')) : [];
  }

  ngOnDestroy(): void {
    if (this.contextValueChangesSubscription) {
      this.contextValueChangesSubscription.unsubscribe();
    }
  }

  onChangeTimer(fieldType, value) {
    if (fieldType === 'hr') {
      if (!_.isEmpty(value)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        this.defaultHr = numericValue;
        this.hourField.nativeElement.value = numericValue;
        if (!this.defaultMin) {
          this.defaultMin = '00';
          this.minField.nativeElement.value = '00';
        }
      }
    }
    if (fieldType === 'min') {
      if (!_.isEmpty(value)) {
        const numericValue = value.replace(/[^0-9]/g, '');
        if (_.parseInt(numericValue) > 59) {
          const subtractedMinute = _.toString(_.parseInt(numericValue) - 60);
          if (subtractedMinute.length === 1) {
            this.defaultMin = '0' + subtractedMinute;
          } else {
            this.defaultMin = _.toString(subtractedMinute);
          }
          if (this.defaultHr) {
            this.defaultHr = _.toString(_.parseInt(this.defaultHr) + 1);
            if (this.defaultHr.length === 1) {
              this.defaultHr = '0' + this.defaultHr;
            } else {
              this.defaultHr = _.toString(this.defaultHr);
            }
          } else if (!this.defaultHr) {
            this.defaultHr = '00';
          }
          this.minField.nativeElement.value = this.defaultMin;
          this.hourField.nativeElement.value = this.defaultHr;
        } else {
          this.defaultMin = numericValue;
          this.minField.nativeElement.value = numericValue;
          if (!this.defaultHr) {
            this.defaultHr = '00';
            this.hourField.nativeElement.value = '00';
          }
        }
      }
    }
    if (this.defaultHr && this.defaultMin)  {
      this.patchTimerValue();
    }

  }

  patchTimerValue() {
    let hour, minute;
    if (this.defaultHr.length === 1) {
      hour = '0' + this.defaultHr;
    } else {
      hour = this.defaultHr;
    }
    if (this.defaultMin.length === 1) {
      minute = '0' + this.defaultMin;
    } else {
      minute = this.defaultMin;
    }
    const totalTime = hour + ':' + minute + ':00';
    this.formControlRef.markAsTouched();
    this.formControlRef.patchValue(totalTime);
  }

  restTime() {
    this.defaultHr = null;
    this.defaultMin = null;
    this.hourField.nativeElement.value = null;
    this.minField.nativeElement.value = null;
    this.formControlRef.markAsTouched();
    this.formControlRef.patchValue(null);
  }

  onFocusOutEvent(fieldType, value) {
    if (_.isEmpty(value) || _.isNull(value)) {
      this.formControlRef.markAsTouched();
      this.formControlRef.patchValue(null);
    } else {
      if (fieldType === 'hr') {
        if (value.length === 1) {
          this.defaultHr = '0' + value;
          this.hourField.nativeElement.value = this.defaultHr;
        }
      }
      if (fieldType === 'min') {
        if (value.length === 1) {
          this.defaultMin = '0' + value;
          this.minField.nativeElement.value =  this.defaultMin;
        }
      }
    }
  }
}
