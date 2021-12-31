import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomFormControl, DynamicFieldConfigOptionsBuilder, FieldConfig, FieldConfigOption } from '../common-form-config';
import * as _ from 'lodash-es';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sb-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css']
})
export class KeywordsComponent implements OnInit,OnChanges,OnDestroy {
  @Input() label: String;
  @Input() placeholder: String;
  @Input() formControlRef: CustomFormControl;
  @Input() field: FieldConfig<String>;
  @Input() validations?: any;
  @Input() disabled: Boolean;
  @Input() default: String;
  @Input() options: any;
  @Input() formGroup?: FormGroup;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  @Input() depends?: any;
  public items: any;
  inputText = '';
  selectedItems:any;
  options$?: Observable<FieldConfigOption<any>[]>;
  contextValueChangesSubscription?: Subscription;
  latestParentValue: string;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.options);
   
  }

  ngOnInit() {
    if (!_.isEmpty(this.default)) {
      this.items = this.default;
    }
    if(!_.isEmpty(this.field?.default)){
      this.selectedItems = this.field?.default;
    }

    if (!this.options) {
      this.options = _.isEmpty(this.field.options) ? this.isOptionsClosure(this.field.options) && this.field.options : [];
    }


    if (!_.isEmpty(this.field.depends)) {
      merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
          tap(() => {
            this.formControlRef.patchValue(null);
          })
      ).subscribe();
  }

  if (this.isOptionsClosure(this.options)) {
    // tslint:disable-next-line:max-line-length
    this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)(this.formControlRef, this.depends, this.formGroup, () => this.dataLoadStatusDelegate.next('LOADING'), () => this.dataLoadStatusDelegate.next('LOADED')) as any;
    this.contextValueChangesSubscription = this.options$.subscribe(
      (response: any) => {
        if (response && response.options) {
          this.field.options = response.options;
        } else {
          this.field.options = null;
        }
      }
    );
  }
  this.handleDependsWithDefault();

  }

  handleDependsWithDefault() {
    const value = _.first(_.map(this.depends, depend => depend.value));
    if (!_.isEmpty(value) && _.toLower(value) === 'yes') {
      this.formControlRef.isVisible = 'yes';
      this.field.options = this.formControlRef.options;
    } else {
        this.formControlRef.isVisible = 'no';
    }
  }

  ngOnDestroy(): void {
    if (this.contextValueChangesSubscription) {
      this.contextValueChangesSubscription.unsubscribe();
    }
  }

  onItemAdded(ev) {
    let items: any = [];
    items = this.field.options;
    let res = items.filter(item => item === ev.label);
    if (res.length === 0) {
      items.push(ev.label);
    }
    this.selectedItems.push(ev.label)
    this.selectedItems.forEach((el, index) => {
      if (el?.label === ev.label) {
        this.selectedItems.splice(index, 1);
      }
    })
  }

  isOptionsClosure(options: any) {
    return typeof options === 'function';
  }

}
