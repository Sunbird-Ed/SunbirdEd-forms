import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FieldConfigAsyncValidation, CustomFormControl } from '../common-form-config';
import * as _ from 'lodash-es';
@Component({
  selector: 'sb-dynamic-richtext',
  templateUrl: './dynamic-richtext.component.html',
  styleUrls: ['./dynamic-richtext.component.css'],
})

export class DynamicRichtextComponent implements OnInit, AfterViewInit {
  @Input() asyncValidation?: FieldConfigAsyncValidation;
  @Input() label: String;
  @Input() labelHtml: any;
  @Input() field: any;
  @Input() placeholder: String;
  @Input() validations?: any;
  @Input() formControlRef?: CustomFormControl;
  @Input() prefix?: String;
  @Input() default: String;
  @Input() disabled: Boolean;
  @Input() visible: Boolean;
  @ViewChild('validationTrigger', { static: false }) validationTrigger: ElementRef;
  constructor() { }

  ngOnInit() {
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

}
