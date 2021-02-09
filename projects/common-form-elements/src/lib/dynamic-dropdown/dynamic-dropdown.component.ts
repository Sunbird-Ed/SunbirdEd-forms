import {Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject, Subscription, combineLatest, merge} from 'rxjs';
import {FieldConfig, FieldConfigOption, FieldConfigOptionsBuilder, DynamicFieldConfigOptionsBuilder} from '../common-form-config';
import {tap} from 'rxjs/operators';
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

  public isDependsInvalid: any;

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
    } else if (_.isEmpty(this.options) && _.isEmpty(this.field.range) && this.default) {
      this.field.range = [];
      this.field.range.push(this.default);
    }


    if (!_.isEmpty(this.depends)) {
     this.contextValueChangesSubscription =  merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
      tap((value: any) => {
        this.latestParentValue = value;
        this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
        this.formControlRef.patchValue(null);
      })
      ).subscribe();

      this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
    }


    if (this.isOptionsClosure(this.options)) {
      // tslint:disable-next-line:max-line-length
      this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)(this.formControlRef, this.depends, this.formGroup, () => this.dataLoadStatusDelegate.next('LOADING'), () => this.dataLoadStatusDelegate.next('LOADED')) as any;
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
        return !_.isEmpty(this.field.output) ?
        _.includes(this.getParentValue(), terms[this.field.output]) :
        _.includes(this.getParentValue(), terms.name) ;
      });
      if (filteredTerm) {
        this.tempAssociation =  _.filter(filteredTerm.associations, association => {
          return (this.field.sourceCategory) ?
          (association.category === this.field.sourceCategory) :
          association.category === this.field.code;
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
}
