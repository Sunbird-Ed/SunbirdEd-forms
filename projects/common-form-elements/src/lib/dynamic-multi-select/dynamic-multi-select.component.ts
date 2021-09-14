import {Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject, Subscription, combineLatest, merge} from 'rxjs';
import {FieldConfig, FieldConfigOption, FieldConfigOptionsBuilder, DynamicFieldConfigOptionsBuilder, CustomFormControl} from '../common-form-config';
import {tap} from 'rxjs/operators';
import * as _ from 'lodash-es';
import {ValueComparator} from '../utilities/value-comparator';
@Component({
  selector: 'sb-dynamic-multi-select',
  templateUrl: './dynamic-multi-select.component.html',
  styleUrls: ['./dynamic-multi-select.component.css']
})
export class DynamicMultiSelectComponent implements OnInit, OnChanges, OnDestroy {
  ValueComparator = ValueComparator;
  @Input() field: FieldConfig<String>;
  @Input() disabled?: boolean;
  @Input() options: any;
  @Input() label?: string;
  @Input() placeHolder?: string;
  @Input() isMultiple?: boolean;
  @Input() context?: FormControl;
  @Input() contextTerms?: any;
  @Input() formControlRef?: CustomFormControl;
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

  options$?: Observable<FieldConfigOption<any>[]>;
  contextValueChangesSubscription?: Subscription;
  selectedType: any;
  tempAssociation: any;
  latestParentValue: string;
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.options) {
      this.options = [];
    }
    if (this.isOptionsClosure(this.options)) {
      this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)(
        this.formControlRef,
        this.depends,
        this.formGroup,
        () => this.dataLoadStatusDelegate.next('LOADING'),
        () => this.dataLoadStatusDelegate.next('LOADED')
      ) as any;
    }
  }

  ngOnInit() {
    this.formControlRef.isVisible = 'yes';
    if (!_.isEmpty(this.field.sourceCategory)) {
      this.formControlRef.sourceCategory = this.field.sourceCategory;
    }

    if (!_.isEmpty(this.field.output)) {
      this.formControlRef.output = this.field.output;
    }

    if (!this.options) {
      this.options = _.isEmpty(this.field.options) ? this.isOptionsClosure(this.field.options) && this.field.options : [];
    }

    // if (this.context) {
      // this.contextValueChangesSubscription = this.context.valueChanges.pipe(
      //   tap(() => {
      //     this.formControlRef.patchValue(null);
      //   })
      // ).subscribe();
    // }

    this.dataLoadStatusDelegate.subscribe(
      console.log
    );

    if (this.field && this.field.range) {
      this.options = this.field.range;
    }


    if (!_.isEmpty(this.depends) && !this.isOptionsClosure(this.options)) {
     this.contextValueChangesSubscription =  merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
      tap((value: any) => {
        this.latestParentValue = value;
      })
      ).subscribe();
    }

    if (!_.isEmpty(this.field.depends)) {
      merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
          tap(() => {
            // _.forEach(this.field.depends, depend => {
            //   if (!_.isEmpty(this.formGroup.get(depend))) {
            //     this.formGroup.get(depend).patchValue(null);
            //   }
            // });
            this.formControlRef.patchValue(null);
          })
      ).subscribe();
    }


    if (this.isOptionsClosure(this.options)) {
      // tslint:disable-next-line:max-line-length
      this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)(this.formControlRef, this.depends, this.formGroup, () => this.dataLoadStatusDelegate.next('LOADING'), () => this.dataLoadStatusDelegate.next('LOADED')) as any;
      this.options$.subscribe(
        (response: any) => {
          if (response && response.range) {
            this.field.range = response.range;
          } else {
            this.field.range = null;
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
      this.field.range = this.formControlRef.range;
    } else {
        this.formControlRef.isVisible = 'no';
    }
  }

  ngOnDestroy(): void {
    if (this.contextValueChangesSubscription) {
      this.contextValueChangesSubscription.unsubscribe();
    }
  }

  isOptionsArray(options: any) {
    return Array.isArray(options);

  }

  isOptionsClosure(options: any) {
    return typeof options === 'function';
  }

  isOptionsMap(input: any) {
    return !Array.isArray(input) && typeof input === 'object';
  }

  isOptionsArrayMap(input: any) {
    return Array.isArray(input) && typeof input[0] === 'object';
  }

  onChangeFacet($event) {
    const selectedObject = this.options.data[$event.currentTarget.options.selectedIndex - 1];
    const emitPayload = JSON.parse(JSON.stringify(this.options));
    emitPayload['data'] = selectedObject;
    emitPayload['selectedLabel'] = selectedObject.label;
    emitPayload['selectedValue'] = selectedObject.value;
    this.onChangeFilter.emit(emitPayload);
  }

  fetchAssociations() {
    // && this.context.value && this.field.association
    if (!_.isEmpty(this.depends)) {
      const filteredTerm = _.find(this.dependencyTerms, terms => {
        return _.includes(this.getParentValue(), terms.identifier);
      });
      if (filteredTerm) {
        this.tempAssociation =  _.filter(filteredTerm.associations, association => {
          return association.category === this.field.code;
        });
        return this.tempAssociation;
      } else  {
        return this.options;
      }
    } else {
      return this.options;
    }
  }


  getParentValue() {
    return this.latestParentValue || _.compact(_.map(this.depends, 'value'));
  }
}
