import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {from, Subject} from 'rxjs';
import {FieldConfigOptionsBuilder} from '../common-form-config';
import {takeUntil, tap} from 'rxjs/operators';
import {fromJS, List, Map, Set} from 'immutable';


@Component({
  selector: 'sb-multiple-dropdown',
  templateUrl: './multiple-dropdown.component.html',
  styleUrls: ['./multiple-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleDropdownComponent implements OnInit, OnChanges, OnDestroy {
  @Input() disabled?: boolean;
  @Input() options: any;
  @Input() label?: string;
  @Input() labelHtml: any;
  @Input() placeHolder?: string;
  @Input() isMultiple?: boolean;
  @Input() context?: FormControl;
  @Input() formControlRef?: FormControl;
  @Input() default?: any;
  @Input() contextData: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  showModal = false;
  tempValue = Set<any>();
  resolvedOptions = List<Map<string, string>>();
  optionValueToOptionLabelMap = Map<any, string>();

  fromJS = fromJS;

  private dispose$ = new Subject<undefined>();

  constructor(
    private changeDetectionRef: ChangeDetectorRef
  ) {
  }
  ngOnInit() {
    if (this.context) {
      this.context.valueChanges.pipe(
        tap(() => {
          this.formControlRef.patchValue(null);
          this.setupOptions();
        }),
        takeUntil(this.dispose$)
      ).subscribe();
    }

    this.formControlRef.valueChanges.pipe(
      tap((value) => {
        this.setTempValue(value);
        this.changeDetectionRef.detectChanges();
      }),
      takeUntil(this.dispose$)
    ).subscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['options'] || !changes['options'].currentValue) {
      return;
    }

    this.setupOptions();
  }

  onSubmit() {
    const finalValue = this.tempValue.toList().toJS();
    this.formControlRef.patchValue(this.isMultiple ? finalValue : finalValue[0]);
    this.formControlRef.markAsDirty();
    this.showModal = false;
  }
  openModal() {
    if (this.context && this.context.invalid) {
      return;
    }

    this.setTempValue(this.formControlRef.value);

    this.showModal = true;
  }

  addSelected(option: Map<string, string>) {
    if (this.isMultiple) {
      if (this.tempValue.includes(option.get('value'))) {
        this.tempValue = this.tempValue.remove(option.get('value'));
      } else {
        this.tempValue = this.tempValue.add(option.get('value'));
      }
    } else {
      this.tempValue = this.tempValue.clear();
      this.tempValue = this.tempValue.add(option.get('value'));
    }
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
    }
  }

  private setupOptions() {
    if (!this.options) {
      this.options = [];
      this.resolvedOptions = this.resolvedOptions.clear();
    }

    if (this.isOptionsArray()) {
      this.resolvedOptions = fromJS(this.options);
    } else if (this.isOptionsMap()) {
      this.resolvedOptions = (this.context && this.context.value) ?
        fromJS(this.options[this.context.value]) :
        this.resolvedOptions;
    } else if (this.isOptionsClosure()) {
      from((this.options as FieldConfigOptionsBuilder<any>)(
        this.formControlRef,
        this.context,
        () => this.dataLoadStatusDelegate.next('LOADING'),
        () => this.dataLoadStatusDelegate.next('LOADED')
      )).pipe(
        tap((options = []) => {
          this.resolvedOptions = fromJS(options);

          this.resolvedOptions.forEach((option) => {
            this.optionValueToOptionLabelMap = this.optionValueToOptionLabelMap.set(option.get('value'), option.get('label'));
          });

          this.setTempValue(this.default);

          this.changeDetectionRef.detectChanges();
        }),
        takeUntil(this.dispose$)
      ).subscribe();
    }

    this.resolvedOptions.forEach((option) => {
      this.optionValueToOptionLabelMap = this.optionValueToOptionLabelMap.set(option.get('value'), option.get('label'));
    });

    this.setTempValue(this.default);
  }
}
