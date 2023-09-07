import {Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject, Subscription, combineLatest, merge} from 'rxjs';
import {FieldConfig, FieldConfigOption, FieldConfigOptionsBuilder, DynamicFieldConfigOptionsBuilder, CustomFormGroup, CustomFormControl} from '../common-form-config';
import {takeUntil, tap} from 'rxjs/operators';
import * as _ from 'lodash-es';
import {ValueComparator} from '../utilities/value-comparator';

@Component({
  selector: 'sb-dynamic-dropdown',
  templateUrl: './dynamic-dropdown.component.html',
  styleUrls: ['./dynamic-dropdown.component.css']
})
export class DynamicDropdownComponent implements OnInit, OnChanges, OnDestroy {
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

  @Input() depends?: FormControl[];
  @Input() dependencyTerms?: any = [];

  public isDependsInvalid: any;
  public isDependsEmpty: boolean = false;
  private dispose$ = new Subject<undefined>();

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
    if (!this.options) {
      this.options = [];
    }

    if (!_.isEmpty(this.field.sourceCategory)) {
      this.formControlRef.sourceCategory = this.field.sourceCategory;
    }

    if (!_.isEmpty(this.field.output)) {
      this.formControlRef.output = this.field.output;
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
      this.options = this.sortOptions(this.field.range);
    } else if (_.isEmpty(this.options) && _.isEmpty(this.field.range) && this.default) {
      this.field.range = [];
      this.field.range.push(this.default);
    }


    if (!_.isEmpty(this.depends)) {
    this.handleDependentFieldChanges();
    }


    if (this.isOptionsClosure(this.options)) {
      // tslint:disable-next-line:max-line-length
      this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)(this.formControlRef, this.depends, this.formGroup, () => this.dataLoadStatusDelegate.next('LOADING'), () => this.dataLoadStatusDelegate.next('LOADED')) as any;
    }

    this.formControlRef.valueChanges.pipe(
      tap((value) => {
        if (!_.isEmpty(this.formControlRef.value)) {
          // tslint:disable-next-line:max-line-length
          this.formGroup.lastChangedField = { code: this.field.code, value: this.formControlRef.value, sourceCategory: this.field.sourceCategory };
        }
        return value;
      }),
      takeUntil(this.dispose$)
    ).subscribe();
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
      const filterDependencyTerms = this.filterDependencyTermsByLastChangedValue();
      const filteredTerm = _.filter(filterDependencyTerms, terms => {
        return !_.isEmpty(this.field.output) ?
        _.includes(this.getParentValue(), terms[this.field.output]) :
        _.includes(this.getParentValue(), terms.name) ;
      });
      if (!_.isEmpty(filteredTerm)) {
        this.tempAssociation =  _.filter(_.compact(_.flatten(_.map(filteredTerm, 'associations'))), association => {
          return (this.field.sourceCategory) ?
          (_.toLower(association.category) === _.toLower(this.field.sourceCategory)) :
          _.toLower(association.category) === _.toLower(this.field.code);
        });
        return this.sortOptions(_.uniqBy(this.tempAssociation, 'identifier'));
      } else  {
        return this.sortOptions(this.options);
      }
    } else {
      return this.sortOptions(this.options);
    }
  }

  filterDependencyTermsByLastChangedValue() {
    const field = this.formGroup.lastChangedField;
    if (!_.isEmpty(field) && field.code !== this.field.code && _.includes(this.field.depends, field.code)) {
      return _.filter(this.dependencyTerms, terms => {
        return field.sourceCategory ?
        _.toLower(terms.category) === _.toLower(field.sourceCategory) :
        _.toLower(terms.category) === _.toLower(field.code);
      });
    } else {
      return this.dependencyTerms;
    }
  }

  handleDependentFieldChanges() {
    this.contextValueChangesSubscription =  merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
      tap((value: any) => {
        this.latestParentValue = value;
        this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
        this.isDependsEmpty = _.some(_.map(this.depends, depend => depend.value), _.isEmpty);
        this.formControlRef.patchValue(null);
      })
      ).subscribe();
      this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
      this.isDependsEmpty = _.some(_.map(this.depends, depend => depend.value), _.isEmpty);
  }

  getParentValue() {
    return !_.isEmpty(this.latestParentValue) && this.latestParentValue ||
    _.castArray(_.last(_.compact(_.map(this.depends, 'value'))));
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

  getOptionValueForRange(option, optionsType) {
    if (this.field.output) {
      if (this.field.dataType === 'list') {
        if (optionsType === 'map' || optionsType === 'closure') {
          return [option[this.field.output]] || [option.value] || [option.identifier] || [option.name] || [option.label];
        } else  {
          return [option];
        }
      } else {
        if (optionsType === 'map' || optionsType === 'closure') {
          return option[this.field.output] || option.value || option.identifier || option.name || option.label;
        } else  {
          return option;
        }
      }
    } else {
      if (this.field.dataType === 'list') {
        if (optionsType === 'map' || optionsType === 'closure') {
          return [option.value] || [option.identifier] || [option.name] || [option.label];
        } else  {
          return [option];
        }
      } else {
        if (optionsType === 'map' || optionsType === 'closure') {
          return  option.name || option.label || option.value || option.identifier;
        } else  {
          return option;
        }
      }
    }
  }

  convertOptionToArray(option, output?) {

  }

  sortOptions(options) {
   return  options.sort((option, b) => {
     const firstVal = option[this.field.output] || option.value || option.identifier || option.name || option.label || option;
     const secondVal = b[this.field.output] || b.value || b.identifier || b.name || b.label || b;
     if (_.isString(firstVal)) {
       return (firstVal).localeCompare((secondVal), undefined, {
         numeric: true,
         sensitivity: 'base'
       });
     } else if (_.isNumber(firstVal)) {
      return firstVal - secondVal;
     }
      // tslint:disable-next-line:max-line-length
    });
  }
}
