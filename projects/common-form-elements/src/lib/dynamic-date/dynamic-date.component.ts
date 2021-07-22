import {Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldConfigAsyncValidation, CustomFormGroup, FieldConfigValidationType } from '../common-form-config';

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
  @ViewChild('validationTrigger', {static: false}) validationTrigger: ElementRef;

  constructor() { }
  today = new Date();
  todayDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);
  
  startdate: any = this.todayDate;
  enddate: any = this.todayDate;
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
