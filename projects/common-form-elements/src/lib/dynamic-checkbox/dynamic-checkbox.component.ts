import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject, Subscription, combineLatest, merge} from 'rxjs';
import {FieldConfig, FieldConfigOption, FieldConfigOptionsBuilder} from '../common-form-config';
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
  @Input() options: any;
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

  @Input() depends?: FormControl[];
  @Input() dependencyTerms?: any = [];

  _: any = _;

  public checked: boolean;

  constructor() { }

  ngOnInit() {
    const desiredValue = (this.field.dataType === 'text') ? (this.field.default === 'Yes' ? true : false) : !!this.field.default;
    this.checked = desiredValue;
  }

  onChecklistChange(checked) {
    this.checked = checked;
    const desiredValue = (this.field.dataType === 'text') ? (checked === true ? 'Yes' : 'No') : checked;
    this.formControlRef.setValue(desiredValue);
  }


}
