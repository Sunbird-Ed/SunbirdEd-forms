import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { from, Observable, Subject } from 'rxjs';
import { map, startWith, tap, takeUntil } from 'rxjs/operators';
import { FieldConfig, FieldConfigInputType, FieldConfigInputTypeOptionsModelMap, FieldConfigOptionsBuilder } from '../common-form-config';

@Component({
  selector: 'app-material-auto-complete',
  templateUrl: './material-auto-complete.component.html',
  styleUrls: ['./material-auto-complete.component.scss']
})
export class MaterialAutoCompleteComponent implements OnInit, OnChanges {

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
  @Input() contextData: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  @Input() config: FieldConfig<String>;
  localFrmControl = new FormControl();;
  
  selectedOptions = new Array();
  filteredOptions: Observable<any>;
  lastFilter: string = '';

  private dispose$ = new Subject<undefined>();

  constructor() {}
  
  ngOnInit() {
    this.filteredOptions = this.localFrmControl.valueChanges.pipe(
      startWith<string>(''),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      map(filter => this.filter(filter))
    );

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

  filter(filter: string) {
    this.lastFilter = filter;
    if (filter) {
      return this.options.filter(option => {
        return option.label.toLowerCase().includes(filter.toLowerCase());
      })
    } else {
      return this.isOptionsArray() && this.options.length ? this.options.slice() : [] ;
    }
  }

  displayFn(value: any): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((optionLbl, index) => {
        if (index === 0) {
          displayValue = optionLbl;
        } else {
          displayValue += ', ' + optionLbl;
        }
      });
    } else if(value && typeof value === 'object') {
      displayValue = value.label || value.name;
    } else {
      let displayVal = this.isOptionsArray() && this.options.length ? this.options.find(option => option.value === value) : value;
      displayValue = displayVal && displayVal.label ? displayVal.label : value;
    }
    return displayValue;
  }

  singleOptionSelected(event) {
    let value = this.localFrmControl.value;
    this.formControlRef.patchValue(value);
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    let optionValue: any = event.option.viewValue;
    if (!this.selectedOptions.includes(optionValue)) {
      this.selectedOptions.push(optionValue);
    } else {
      const i = this.selectedOptions.findIndex(value => value === optionValue);
      this.selectedOptions.splice(i, 1);
    }
    this.formControlRef.setValue(this.selectedOptions);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['options'] || !changes['options'].currentValue) {
      return;
    }

    this.setupOptions();
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
      this.options = [];
    }

    if (this.isOptionsArray()) {
      this.options = this.options
    } else if (this.isOptionsMap()) {
      this.options = (this.context && this.context.value) ?
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
          this.options = options;
          this.filteredOptions = this.localFrmControl.valueChanges.pipe(
            startWith<string>(''),
            map(value => typeof value === 'string' ? value : this.lastFilter),
            map(filter => this.filter(filter))
          );
          this.formControlRef.patchValue(this.default);
          this.setTempValue(this.default);
        }),
        takeUntil(this.dispose$)
      ).subscribe();
    }
    this.localFrmControl.patchValue(this.default);
    this.setTempValue(this.default);
  }

  private setTempValue(value: any) {
    if (value) {
      if (Array.isArray(value)) {
        this.selectedOptions=value;
      } else {
        this.selectedOptions.push(value);
      }
    }
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
      concatStr = value
    }
    return concatStr;
  }
}
