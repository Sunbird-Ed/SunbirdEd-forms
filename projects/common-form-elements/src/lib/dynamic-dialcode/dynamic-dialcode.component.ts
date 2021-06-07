import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as _ from 'lodash-es';
import { merge, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FieldConfigAsyncValidation, CustomFormGroup, FieldConfigValidationType } from '../common-form-config';
import { DialcodeCursor } from '../dialcode-cursor.service';

@Component({
  selector: 'sb-dynamic-dialcode',
  templateUrl: './dynamic-dialcode.component.html',
  styleUrls: ['./dynamic-dialcode.component.css']
})
export class DynamicDialcodeComponent implements OnInit, OnDestroy  {

  @Input() asyncValidation?: FieldConfigAsyncValidation;
  @Input() label: String;
  @Input() labelHtml: any;
  @Input() placeholder: String;
  @Input() validations?: any;
  @Input() formControlRef?: FormControl;
  @Input() formGroup?: CustomFormGroup;
  @Input() prefix?: String;
  @Input() default: String;
  @Input() field?: any;
  @Input() disabled: Boolean;
  @Input() depends?: FormControl[];
  contextValueChangesSubscription?: Subscription;
  public isEditable = false;
  public isValid = false;
  public dialcodes: String | Array<String>;
  public isDialcodeRequired: String;
  public dialcodeErrMsg: String;
  public minLength = 2;
  public maxLength = 20;
  public isMinLengthValid: Boolean;
  constructor(public dialcodeCursor: DialcodeCursor) {}

  ngOnInit() {
    this.dialcodes = !_.isEmpty(this.default) ? this.default : '';
    this.setValidationCriteria();
    this.validateDialcodeMinLength();
    if (!_.isEmpty(this.depends)) {
      this.handleDependantFieldChanges();
    }
    this.updateDialCode();
  }

  setValidationCriteria() {
    const maxLengthValidation = _.find(this.field.validations, function(v) { return v.type === FieldConfigValidationType.MAXLENGTH; });
    if (maxLengthValidation) {
      this.maxLength = maxLengthValidation.value as number;
    }
    const minLengthValidation = _.find(this.field.validations, function(v) { return v.type === FieldConfigValidationType.MINLENGTH; });
    if (minLengthValidation) {
      this.minLength = minLengthValidation.value as number;
    }
  }


  validateDialcodeMinLength() {
    if (_.isArray(this.dialcodes)) {
      this.isMinLengthValid = this.dialcodes[0].length >= this.minLength;
    } else {
      this.isMinLengthValid = this.dialcodes.length >= this.minLength;
    }
  }

  handleDependantFieldChanges() {
    this.contextValueChangesSubscription =  merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
      tap((value: any) => {
        this.isDialcodeRequired = _.toLower(value);
      })
      ).subscribe();
      this.isDialcodeRequired = _.toLower(_.first(_.map(this.depends, depend => depend.value)));
  }

  onValueChange(value) {
    this.dialcodes = value;
    this.isEditable = false;
    this.validateDialcodeMinLength();
    this.changeDialCode(value);
  }

  editDialCode() {
    this.isEditable = false;
  }

  clearDialCode() {
    this.dialcodes = '';
    this.validateDialcodeMinLength();
    this.formControlRef.setValue(null);
    this.dialcodeCursor.clearDialCode();
  }

  validateDialCode() {
    this.dialcodeCursor.validateDialCode(this.dialcodes).subscribe((result: any) => {
      this.handleDialcodeResponse(result);
      if (result && result.isEditable) {
        const dialcode = this.field.dataType === 'list' ? _.castArray(this.dialcodes) : this.dialcodes;
        this.formControlRef.setValue(dialcode);
      }
    });
  }

  changeDialCode(value) {
    this.dialcodeCursor.changeDialCode(value);
  }

  updateDialCode() {
    this.dialcodeCursor.updateDialCode(this.dialcodes).subscribe((result: any) => {
      this.handleDialcodeResponse(result);
    });
  }

  handleDialcodeResponse(result: any) {
    if (_.has(result, 'isEditable')) { this.isEditable = result.isEditable; }
    if (_.has(result, 'isValid')) { this.isValid = result.isValid; }
    if (_.has(result, 'statusMsg') && !_.isEmpty(result.statusMsg) ) {
      this.dialcodeErrMsg = result.statusMsg;
    } else {
      this.dialcodeErrMsg = 'Invalid QR code';
    }
  }

  ngOnDestroy(): void {
    if (this.contextValueChangesSubscription) {
      this.contextValueChangesSubscription.unsubscribe();
    }
  }

}
