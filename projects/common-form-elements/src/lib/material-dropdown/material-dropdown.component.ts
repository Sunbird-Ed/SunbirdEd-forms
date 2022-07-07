import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { from, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { FieldConfig, FieldConfigInputType, FieldConfigInputTypeOptionsModelMap, FieldConfigOptionsBuilder } from '../common-form-config';

@Component({
  selector: 'app-material-dropdown',
  templateUrl: './material-dropdown.component.html',
  styleUrls: ['./material-dropdown.component.scss']
})
export class MaterialDropdownComponent implements OnInit, OnChanges {

  @Input() extras?: FieldConfigInputTypeOptionsModelMap[FieldConfigInputType.SELECT];
  @Input() disabled?: boolean;
  @Input() options: any;
  @Input() label?: string;
  @Input() labelHtml: any;
  @Input() placeHolder?: string;
  @Input() isMultiple?: boolean;
  @Input() context?: FormControl;
  @Input() formControlRef?: FormControl;
  @Input() platform: any;
  @Input() default?: any;
  @Input() class?: any;
  @Input() contextData: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  @Input() config: FieldConfig<String>;
  @Input() formGroup: FormGroup;
  localFrmControlRef = new FormControl();

  selectedOptions:any;
  filteredOptions = [];

  private dispose$ = new Subject<undefined>();

  constructor() {}
  
  ngOnInit() {
    if (this.context) {
      this.context.valueChanges.pipe(
        tap(( ) => {
          this.formControlRef.patchValue(null);
          this.setupOptions();
        }),
        takeUntil(this.dispose$)
      ).subscribe();
    }
  }

  comparer(o1: any, o2: any): boolean {
    // if possible compare by object's name, and not by reference.
    if(o1 && o2) {
      return o1.name && o2.name ? o1.name === o2.name : o1 === o2
    }
    return false;
  }

  singleOptionSelected(event) {
    this.formControlRef.patchValue(event.value);
  }

  setOptionValue(value) {
    if(!this.isMultiple && typeof value == 'string' || (value && typeof value === 'object')) {
      this.selectedOptions = value;
    } else if(this.isMultiple) {
      this.selectedOptions = this.selectedOptions && this.selectedOptions.length > 0 ? this.selectedOptions.push(value) : [value];
    } else {
      this.selectedOptions = []
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['options'] || !changes['options'].currentValue) {
      return;
    }

    this.setupOptions();
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }

  private isOptionsArray() {
    return Array.isArray(this.options);
  }

  private isOptionsClosure() {
    return typeof this.options === 'function';
  }

  private isOptionsMap() {
    return !Array.isArray(this.options) && typeof this.options === 'object';
  }

  private setupOptions() {
    if (!this.options) {
      this.filteredOptions = [];
    }

    if (this.isOptionsArray()) {
      this.filteredOptions = this.options
    } else if (this.isOptionsMap()) {
      this.filteredOptions = (this.context && this.context.value) ?
        this.options[this.context.value] :
        this.options;
    } else if (this.isOptionsClosure()) {
      from((this.options as FieldConfigOptionsBuilder<any>)(
        this.formControlRef,
        this.context,
        () => this.dataLoadStatusDelegate.next('LOADING'),
        () => this.dataLoadStatusDelegate.next('LOADED')
      )).pipe(
        tap((options = []) => {
          this.filteredOptions = options;
          this.formControlRef.patchValue(this.default);
          this.localFrmControlRef.patchValue(this.default);
          this.setOptionValue(this.default);
        }),
        takeUntil(this.dispose$)
      ).subscribe();
    }
    this.localFrmControlRef.patchValue(this.default);
    this.setOptionValue(this.default);
  }

  concatinatedMultipeSelectVal(value){
    if(!value){
      return '';
    }
    let concatStr = '';
    if(Array.isArray(value) && value.length){
      for (let index = 0; index < value.length; index++) {
        if(!concatStr.length){
          concatStr += value[index];
        } else {
          concatStr += ', ' + value[index];
        }
      }
    } else if((typeof value === 'object' && !Array.isArray(value)) || typeof value==='string'){
      concatStr = value?.name ? value.name : value;
    }
    return concatStr;
  }
}
