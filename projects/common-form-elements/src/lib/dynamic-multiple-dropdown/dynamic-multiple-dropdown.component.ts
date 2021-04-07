import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy,
  OnInit, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {from, Subject, merge} from 'rxjs';
import {FieldConfig, FieldConfigOptionsBuilder, DynamicFieldConfigOptionsBuilder} from '../common-form-config';
import {takeUntil, tap} from 'rxjs/operators';
import {fromJS, List, Map, Set} from 'immutable';
import * as _ from 'lodash-es';
@Component({
  selector: 'sb-dynamic-multiple-dropdown',
  templateUrl: './dynamic-multiple-dropdown.component.html',
  styleUrls: ['./dynamic-multiple-dropdown.component.css']
})
export class DynamicMultipleDropdownComponent implements OnInit, OnChanges, OnDestroy {

  @Input() disabled?: boolean;
  @Input() field: FieldConfig<String>;
  @Input() options: any;
  @Input() label?: string;
  @Input() labelHtml: any;
  @Input() placeholder?: string;
  @Input() isMultiple = true;
  @Input() context?: FormControl;
  @Input() formControlRef?: FormControl;
  @Input() formGroup?: FormGroup;
  @Input() platform: any = 'web';
  @Input() default?: any;
  @Input() contextData: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  @Input() depends?: FormControl[];
  @Input() dependencyTerms?: any = [];

  _: any = _;


  public isDependsInvalid: any;
  masterSelected: boolean;
  showModal = false;
  tempValue = Set<any>();
  resolvedOptions = List<Map<string, string>>();
  optionValueToOptionLabelMap = Map<any, string>();

  fromJS = fromJS;

  private dispose$ = new Subject<undefined>();

  @HostListener('document:click')
  docClick() {
    if (this.showModal) {
      this.showModal = false;
    }
  }
  constructor(
    private changeDetectionRef: ChangeDetectorRef
  ) {
  }
  ngOnInit() {
    if (this.field && this.field.range) {
      this.options = this.field.range;
    }

    if (!_.isEmpty(this.depends)) {
      merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
        tap(() => {
          this.formControlRef.patchValue(null);
          this.resetTempValue();
        }),
        takeUntil(this.dispose$)
      ).subscribe();

      merge(..._.map(this.depends, depend => depend.statusChanges)).pipe(
        tap(() => {
          this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
        }),
        takeUntil(this.dispose$)
      ).subscribe();

      this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
    }

    this.formControlRef.valueChanges.pipe(
      tap((value) => {
        this.setTempValue(value);
        this.changeDetectionRef.detectChanges();
      }),
      takeUntil(this.dispose$)
    ).subscribe();
    this.setupOptions();
    this.isAllSelected();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['options'] || !changes['options'].currentValue) {
      return;
    }
  }

  onSubmit() {
    const finalValue = this.tempValue.toList().toJS();
    this.formControlRef.patchValue(this.isMultiple ? finalValue : finalValue[0]);
    this.formControlRef.markAsDirty();
    this.showModal = false;
  }

  openModal(event) {
    if (this.context && this.context.invalid) {
      return;
    }
    if (this.disabled === true || this.isDependsInvalid) {
      return;
    }

    this.setTempValue(this.formControlRef.value);
    const htmlCollection = document.getElementsByClassName('sb-modal-dropdown-web');
    const modalElements = Array.from(htmlCollection);
    const isModalAlreadyOpened = modalElements.some((element: HTMLElement) => element.hidden === false );

    if (this.platform === 'web' && isModalAlreadyOpened && !this.showModal) {
      modalElements.forEach((item: HTMLElement) => {
        item.hidden = true;
      });
    }

    if (this.platform === 'web' && this.showModal) {
      this.showModal = false;
    } else {
      this.showModal = true;
    }

    event.stopPropagation();
  }

  addSelected(option: Map<string, string>) {
    if (this.isMultiple) {
      if(this.field.output) {
        if(this.tempValue.includes(option.get(this.field.output))) {
          this.tempValue = this.tempValue.remove(option.get(this.field.output));
        } else {
          this.tempValue = this.tempValue.add(option.get(this.field.output));
        }
      } else if (this.tempValue.includes(option.get('name'))) {
        this.tempValue = this.tempValue.remove(option.get('name'));
      } else if (this.tempValue.includes(option.get('identifier'))) {
        this.tempValue = this.tempValue.remove(option.get('identifier'));
      } else {
        this.tempValue = this.tempValue.add(option.get('name'));
      }
    } else {
      if(this.field.output) {
        this.tempValue = this.tempValue.clear();
        this.tempValue = this.tempValue.add(option.get(this.field.output))
      } else {
        this.tempValue = this.tempValue.clear();
        this.tempValue = this.tempValue.add(option.get('name'));
      }
    }

    this.masterSelected = this.tempValue.size === this.options.length;
  }

  onCancel() {
    this.formControlRef.markAsDirty();
    this.showModal = false;
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

  private setTempValue(value: any) {
    if (value) {
      if (Array.isArray(value)) {
        this.tempValue = Set(fromJS(value));
      } else {
        this.tempValue = Set(fromJS([value]));
      }
      // this.onSubmit();
    }
  }

  private resetTempValue() {
    this.tempValue = Set(null);
  }

  private setupOptions() {
    if (!this.options) {
      this.options = [];
      this.resolvedOptions = this.resolvedOptions.clear();
    }

    if (this.isOptionsArray()) {
      const optionMap = _.map(this.options, option => {
        return {
          identifier: option.value || option.identifier || option.name || option,
          name: option.label || option.name || option.value || option,
        };
      });
      this.resolvedOptions = fromJS(optionMap);
    } else if (this.isOptionsMap()) {
      this.resolvedOptions = (this.depends) ?
        fromJS(this.options[this.context.value]) :
        this.resolvedOptions;
    } else if (this.isOptionsClosure()) {
      from((this.options as DynamicFieldConfigOptionsBuilder<any>)(
        this.formControlRef,
        this.depends,
        this.formGroup,
        () => this.dataLoadStatusDelegate.next('LOADING'),
        () => this.dataLoadStatusDelegate.next('LOADED')
      )).pipe(
        tap((options = []) => {
          this.resolvedOptions = fromJS(options);

          this.resolvedOptions.forEach((option) => {
            const value: any = !_.isEmpty(this.field.output) ? option.get(this.field.output) :
             option.get('name') || option.get('identifier') || option.get('value') || option;
            const labelVal: any = option.get('name') || option.get('label') || option;

            this.optionValueToOptionLabelMap = this.optionValueToOptionLabelMap.set(value, labelVal);
          });

          this.setTempValue(this.default);

          this.changeDetectionRef.detectChanges();
        }),
        takeUntil(this.dispose$)
      ).subscribe();
    }

    this.resolvedOptions.forEach((option) => {
      const value: any = !_.isEmpty(this.field.output) ? option.get(this.field.output) :
      option.get('name') || option.get('identifier') || option.get('value') || option;

      const labelVal: any = option.get('name') || option.get('label') || option;

      this.optionValueToOptionLabelMap = this.optionValueToOptionLabelMap.set(value, labelVal);
    });

    this.setTempValue(this.default);
  }

  isAllSelected() {
    if (this.isOptionsArray()) {
      if (this.default && this.default.length > 1 && this.default.length == this.options.length) {
        this.masterSelected = true;
      }
    }
  }

  checkUncheckAll(event) {
    this.formControlRef.patchValue(null);
    this.resetTempValue();

    if (event.target.checked) {
      this.resolvedOptions.forEach(option => {
        this.addSelected(option);
      });

      this.masterSelected = true;
      this.onSubmit();
    } else {
      this.masterSelected = false;
    }
  }
}
