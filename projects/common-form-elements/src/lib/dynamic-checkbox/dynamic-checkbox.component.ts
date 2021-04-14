import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject, Subscription, combineLatest, merge} from 'rxjs';
import {DynamicFieldConfigOptionsBuilder, FieldConfig, FieldConfigOption, FieldConfigOptionsBuilder} from '../common-form-config';
import {tap} from 'rxjs/operators';
import * as _ from 'lodash-es';
import {ValueComparator} from '../utilities/value-comparator';


@Component({
  selector: 'sb-dynamic-checkbox',
  templateUrl: './dynamic-checkbox.component.html',
  styleUrls: ['./dynamic-checkbox.component.css']
})
export class DynamicCheckboxComponent implements OnInit {

  ValueComparator = ValueComparator;
  @Input() field: FieldConfig<String>;
  @Input() disabled?: boolean;
  @Input() visible?: boolean;
  @Input() options?: any;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() isMultiple?: boolean;
  @Input() context?: FormControl;
  @Input() contextTerms?: any;
  @Input() formControlRef?: FormControl;
  @Input() formGroup?: FormGroup;
  @Input() default?: any;
  @Input() contextData: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  @Input() type?: string;
  @Input() styleClass?: string;
  @Output() onChangeFilter: EventEmitter<any> = new EventEmitter();
  @Input() validations?: any;

  options$?: Observable<FieldConfigOption<any>[]>;
  @Input() depends?: FormControl[];
  @Input() dependencyTerms?: any = [];
  contextValueChangesSubscription?: Subscription;


  _: any = _;

  public checked: boolean;

  constructor() { }

  ngOnInit() {
    if (!this.options) {
      this.options = _.isEmpty(this.field.options) ? this.isOptionsClosure(this.field.options) && this.field.options : [];
    }
    const desiredValue = (this.field.dataType === 'text') ? (this.field.default === 'Yes' ? true : false) : !!this.field.default;
    this.checked = desiredValue;

    if (this.isOptionsClosure(this.options)) {
      // tslint:disable-next-line:max-line-length
      this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)(this.formControlRef, this.depends, this.formGroup, () => this.dataLoadStatusDelegate.next('LOADING'), () => this.dataLoadStatusDelegate.next('LOADED')) as any;
      this.options$.subscribe(
        (response) => {
          this.onChecklistChange(response);
        },
      );
    }
  }

  onChecklistChange(checked) {
    this.checked = checked;
    const desiredValue = (this.field.dataType === 'text') ? (checked === true ? 'Yes' : 'No') : checked;
    this.formControlRef.setValue(desiredValue);
  }


  isOptionsClosure(options: any) {
    return typeof options === 'function';
  }

}
