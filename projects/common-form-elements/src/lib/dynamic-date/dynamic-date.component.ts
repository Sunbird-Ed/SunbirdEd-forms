import {Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import { FieldConfigAsyncValidation } from '../common-form-config';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash-es';
import { tap } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';
import * as moment_ from 'moment';

@Component({
  selector: 'sb-dynamic-date',
  templateUrl: './dynamic-date.component.html',
  styleUrls: ['./dynamic-date.component.css']
})
export class DynamicDateComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() asyncValidation?: FieldConfigAsyncValidation;
  @Input() label: String;
  @Input() labelHtml: any;
  @Input() placeholder: String;
  @Input() validations?: any;
  @Input() formControlRef?: FormControl;
  @Input() prefix?: String;
  @Input() default: String;
  @Input() field?: any;
  @Input() disabled: Boolean;
  @Input() depends?: FormControl[];
  @ViewChild('validationTrigger') validationTrigger: ElementRef;
  valueChangesSubscription: Subscription;
  contextValueChangesSubscription: any;
  shouldBeVisible: any = 'yes';
  constructor() {
  }

  ngOnInit() {
    const result = this.validations.find(data => data.type === 'dateFormat');

    if (this.default) {
      const date = moment_(this.field.default, result.value).format('YYYY-MM-DD');
      this.formControlRef.setValue(date);
    }

    if (!_.isEmpty(this.depends)) {
      this.handleDependantFieldChanges();
    }
  }

  ngAfterViewInit() {
    if (this.asyncValidation && this.asyncValidation.asyncValidatorFactory && this.formControlRef) {
      if (this.formControlRef.asyncValidator) {
        return;
      }

      this.formControlRef.setAsyncValidators(this.asyncValidation.asyncValidatorFactory(
        this.asyncValidation.marker,
        this.validationTrigger.nativeElement
      ));
      console.log(this.formControlRef);
    }
  }

  handleDependantFieldChanges() {
    this.contextValueChangesSubscription =  merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
      tap((value: any) => {
        this.shouldBeVisible = _.toLower(value);
      })
      ).subscribe();
      this.shouldBeVisible = _.toLower(_.first(_.map(this.depends, depend => depend.value)));
  }

  ngOnDestroy(): void {
    if (this.contextValueChangesSubscription) {
      this.contextValueChangesSubscription.unsubscribe();
    }
  }
}

