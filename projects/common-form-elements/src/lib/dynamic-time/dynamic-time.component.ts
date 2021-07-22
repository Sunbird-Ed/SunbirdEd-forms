import {Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldConfigAsyncValidation, CustomFormGroup, FieldConfigValidationType } from '../common-form-config';

@Component({
  selector: 'sb-dynamic-time',
  templateUrl: './dynamic-time.component.html',
  styleUrls: ['./dynamic-time.component.css']
})
export class DynamicTimeComponent implements OnInit {

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

  // startdate: any = this.todayDate;
  // enddate: any = this.todayDate;
  starttime: any = (('0' + (this.today.getHours() + 1))).slice(-2) + ":" + ('0' + this.today.getMinutes()).slice(-2) + ":" + ('0' + this.today.getSeconds()).slice(-2);
  endTime: any = (('0' + (this.today.getHours() + 2))).slice(-2) + ":" + ('0' + this.today.getMinutes()).slice(-2) + ":" + ('0' + this.today.getSeconds()).slice(-2);

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

