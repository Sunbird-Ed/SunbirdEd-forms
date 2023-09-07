import {Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import { FieldConfigAsyncValidation } from '../common-form-config';
import * as _ from 'lodash-es';
import { merge, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'sb-dynamic-textbox',
  templateUrl: './dynamic-textbox.component.html',
  styleUrls: ['./dynamic-textbox.component.css']
})
export class DynamicTextboxComponent implements OnInit,  AfterViewInit, OnChanges,OnDestroy  {

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
  @ViewChild('validationTrigger') validationTrigger: ElementRef;
  @Input() depends?: FormControl[];
  public isTextBoxRequired: String='yes';
  contextValueChangesSubscription?: Subscription;

  constructor() {
  }

  ngOnInit() {
    if (!_.isEmpty(this.depends)) {
      this.handleDependantFieldChanges();
    }
  }

  ngOnChanges() {
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
    }
  }

  handleDependantFieldChanges() {
    this.contextValueChangesSubscription =  merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
      tap((value: any) => {
        this.isTextBoxRequired = _.toLower(value);
      })
      ).subscribe();
      this.isTextBoxRequired = _.toLower(_.first(_.map(this.depends, depend => depend.value)));
  }

  ngOnDestroy(): void {
    if (this.contextValueChangesSubscription) {
      this.contextValueChangesSubscription.unsubscribe();
    }
  }
}
