import {Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, EventEmitter, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject, Subscription, combineLatest, merge, BehaviorSubject} from 'rxjs';
import {FieldConfig, FieldConfigOption, FieldConfigOptionsBuilder, DynamicFieldConfigOptionsBuilder,
CustomFormGroup, CustomFormControl } from '../common-form-config';
import {distinctUntilChanged, takeUntil, tap} from 'rxjs/operators';
import * as _ from 'lodash-es';
import {ValueComparator} from '../utilities/value-comparator';


@Component({
  selector: 'sb-dynamic-framework',
  templateUrl: './dynamic-framework.component.html',
  styleUrls: ['./dynamic-framework.component.css']
})
export class DynamicFrameworkComponent implements OnInit, OnDestroy {

  ValueComparator = ValueComparator;
  @Input() field: FieldConfig<String>;
  @Input() disabled?: boolean;
  @Input() options: any;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() isMultiple?: boolean;
  @Input() context?: FormControl;
  @Input() contextTerms?: any;
  @Input() formControlRef?: CustomFormControl;
  @Input() formGroup?: CustomFormGroup;
  @Input() default?: any;
  @Input() contextData: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  @Input() type?: string;
  @Input() styleClass?: string;
  @Output() onChangeFilter: EventEmitter<any> = new EventEmitter();
  @Input() validations?: any;
  @Input() dependencyContext: any;


  @Input() depends?: FormControl[];
  @Input() dependencyTerms?: any = [];

  private dispose$ = new Subject<undefined>();
  options$?: Observable<FieldConfigOption<any>[]>;
  contextValueChangesSubscription?: Subscription;
  isTermsLoaded = false;


  constructor() {
   }


  ngOnInit() {
    this.formControlRef.customEventHandler$ =  new BehaviorSubject<any>({});

    if (!_.isEmpty(this.field.sourceCategory)) {
      this.formControlRef.sourceCategory = this.field.sourceCategory;
    }

    if (!_.isEmpty(this.field.output)) {
      this.formControlRef.output = this.field.output;
    }

    if (!this.options) {
      this.options = _.isEmpty(this.field.options) ? this.isOptionsClosure(this.field.options) && this.field.options : [];
    }

    if (this.isOptionsClosure(this.options)) {
      // tslint:disable-next-line:max-line-length
      this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)(this.formControlRef, this.depends, this.formGroup, () => this.dataLoadStatusDelegate.next('LOADING'), () => this.dataLoadStatusDelegate.next('LOADED'), ) as any;
      this.options$.pipe(
        distinctUntilChanged(),
      ).subscribe(
        (response) => {
          const result = _.get(response, 'framework');
          this.formControlRef.termsForDependantFields = [];
          this.formControlRef.termsForDependantFields.push(result);
          if (!_.isEmpty(this.formControlRef.value)) {
            // tslint:disable-next-line:max-line-length
            this.formGroup.lastChangedField = {code: this.field.code, value: this.formControlRef.value, sourceCategory: this.field.sourceCategory};
          }
          this.formControlRef.customEventHandler$.next(true);
          // if (!this.isTermsLoaded) {
          //   this.formControlRef.updateValueAndValidity({onlySelf: true, emitEvent: true});
          // }
          this.isTermsLoaded = true;
        }
      );
    }
    if (!_.isEmpty(this.default)) {
      this.formControlRef.updateValueAndValidity({onlySelf: false, emitEvent: true});
    }
  }

  handleSelfChange() {
    this.formControlRef.valueChanges.pipe(
      tap((value) => {
        const result = _.get(value, 'framework');
        this.formControlRef.termsForDependantFields = [];
        this.formControlRef.termsForDependantFields.push(result);
        // tslint:disable-next-line:max-line-length
        this.formGroup.lastChangedField = {code: this.field.code, value: this.formControlRef.value, sourceCategory: this.field.sourceCategory};
        this.formControlRef.customEventHandler$.next(true);
      }),
      takeUntil(this.dispose$)
    ).subscribe();
  }



  getOptionValueForTerms(option) {
    if (this.field.output) {
      if (this.field.dataType === 'list') {
        return [option[this.field.output]];
      }
      return option[this.field.output];
    } else {
      return this.field.dataType === 'list' ? [option.name] : option.name;
    }
  }


  isOptionsClosure(options: any) {
    return typeof options === 'function';
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }

}
