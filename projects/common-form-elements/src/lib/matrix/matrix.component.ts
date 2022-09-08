import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import {
  CustomFormControl,
  FieldConfig,
  FieldConfigAsyncValidation,
} from '../common-form-config';

@Component({
  selector: 'sb-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css'],
})
export class MatrixComponent implements OnInit {
  form = new FormArray([]);
  @Input() formControlRef: CustomFormControl;
  @Input() field: FieldConfig<String>;
  @Input() label: String;
  @Input() validations?: any;
  @Input() asyncValidation?: FieldConfigAsyncValidation;
  @ViewChild('validationTrigger') validationTrigger: ElementRef;

  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < 3; i++) {
      this.form.push(new FormArray([]));
      for (let j = 0; j < 3; j++) {
        (this.form.at(i) as FormArray).push(new FormControl());
      }
    }
    this.form.patchValue(this.field?.default);
    setTimeout(() => {
        this.onChange(this.form.value, this.form.valid);
    }, 100);
  }

  onChange(value, isValid) {
    this.formControlRef.setValue(value);
    this.formControlRef.markAsTouched();
    if (isValid) {
      this.formControlRef.clearValidators();
      this.formControlRef.setErrors(null);
    } else {
      this.formControlRef.setValidators([Validators.requiredTrue]);
      this.formControlRef.setErrors({required: true});
    }
    this.formControlRef.updateValueAndValidity();
  }
}
