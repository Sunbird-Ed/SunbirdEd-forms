import {Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import { FieldConfigAsyncValidation } from '../common-form-config';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sb-dynamic-date',
  templateUrl: './dynamic-date.component.html',
  styleUrls: ['./dynamic-date.component.css']
})
export class DynamicDateComponent implements OnInit {
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
 
  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.field.minDate);
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

}

