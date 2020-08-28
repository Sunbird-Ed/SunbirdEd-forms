import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {AsyncValidatorFactory, FieldConfig, FieldConfigInputType, FieldConfigValidationType} from '../common-form-config';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, map, scan, tap} from 'rxjs/operators';

@Component({
  selector: 'sb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {
  @Output() initialize = new EventEmitter();
  @Output() finalize = new EventEmitter();
  @Output() linkClicked = new EventEmitter();
  @Output() valueChanges = new EventEmitter();
  @Output() statusChanges = new EventEmitter();
  @Output() dataLoadStatus = new EventEmitter<'LOADING' | 'LOADED'>();
  @Input() config;
  @Input() dataLoadStatusDelegate = new Subject<'LOADING' | 'LOADED'>();
  @Input() asyncValidatorFactory?: AsyncValidatorFactory;

  formGroup: FormGroup;

  FieldConfigInputType = FieldConfigInputType;

  private statusChangesSubscription: Subscription;
  private valueChangesSubscription: Subscription;
  private dataLoadStatusSinkSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder
  ) {
    if (!window['forms']) {
      window['forms'] = [];
    }
    window['forms'].push(this);
  }

  ngOnDestroy(): void {
    this.finalize.emit();

    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }

    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    if (this.dataLoadStatusSinkSubscription) {
      this.dataLoadStatusSinkSubscription.unsubscribe();
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      if ((changes['config'].currentValue && changes['config'].firstChange) || changes['config'].previousValue !== changes['config'].currentValue) {
        this.initializeForm();
      }
    }

    if (this.dataLoadStatusSinkSubscription) {
      this.dataLoadStatusSinkSubscription.unsubscribe();
    }

    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }

    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    this.dataLoadStatusSinkSubscription = this.dataLoadStatusDelegate.pipe(
      scan<'LOADING' | 'LOADED', { loadingCount: 0, loadedCount: 0 }>((acc, event) => {
        if (event === 'LOADED') {
          acc.loadedCount++;
          return acc;
        }

        acc.loadingCount++;
        return acc;
      }, {loadingCount: 0, loadedCount: 0}),
      map<{ loadingCount: 0, loadedCount: 0 }, 'LOADING' | 'LOADED'>((aggregates) => {
        if (aggregates.loadingCount !== aggregates.loadedCount) {
          return 'LOADING';
        }

        return 'LOADED';
      }),
      distinctUntilChanged(),
      tap((result) => {
        if (result === 'LOADING') {
          this.dataLoadStatus.emit('LOADING');
        } else {
          this.dataLoadStatus.emit('LOADED');
        }
      })
    ).subscribe();

    this.statusChangesSubscription = this.formGroup.statusChanges.pipe(
      tap((v) => {
        this.statusChanges.emit({
          isPristine: this.formGroup.pristine,
          isDirty: this.formGroup.dirty,
          isInvalid: this.formGroup.invalid,
          isValid: this.formGroup.valid
        });
      })
    ).subscribe();

    this.valueChangesSubscription = this.formGroup.valueChanges.pipe(
      tap((v) => {
        this.valueChanges.emit(v);
      })
    ).subscribe();
  }

  onNestedFormFinalize(nestedFormGroup: FormGroup, fieldConfig: FieldConfig<any>) {
    if (!this.formGroup.get('children') || !this.formGroup.get(`children.${fieldConfig.code}`)) {
      return;
    }

    (this.formGroup.get('children') as FormGroup).removeControl(fieldConfig.code);

    if (!Object.keys((this.formGroup.get('children') as FormGroup).controls).length) {
      this.formGroup.removeControl('children');
    }
  }

  onNestedFormInitialize(nestedFormGroup: FormGroup, fieldConfig: FieldConfig<any>) {
    if (!this.formGroup.get('children')) {
      this.formGroup.addControl('children', new FormGroup({}));
    }

    (this.formGroup.get('children') as FormGroup).removeControl(fieldConfig.code);
    (this.formGroup.get('children') as FormGroup).addControl(fieldConfig.code, nestedFormGroup);
  }

  private initializeForm() {
    if (!this.config.length) {
      console.error('FORM LIST IS EMPTY');
      return;
    }
    const formGroupData = {};
    this.config.forEach((element: any, index) => {
      if (element.type !== FieldConfigInputType.LABEL) {
        const formValueList = this.prepareFormValidationData(element, index);
        formGroupData[element.code] = formValueList;
      }
    });

    this.formGroup = this.formBuilder.group(formGroupData);
    this.initialize.emit(this.formGroup);
  }

  private prepareFormValidationData(element: FieldConfig<any>, index) {
    const formValueList = [];
    const validationList = [];

    let defaultVal: any = '';
    switch (element.type) {
      case FieldConfigInputType.INPUT:
        defaultVal = element.templateOptions.type === 'number' ?
          (element.default && Number.isInteger(element.default) ? element.default : 0) :
          (element.default && (typeof element.default) === 'string' ? element.default : '');
        break;
      case FieldConfigInputType.SELECT:
      case FieldConfigInputType.NESTED_SELECT:
        defaultVal = element.templateOptions.multiple ?
          (element.default && Array.isArray(element.default) ? element.default : []) : (element.default || null);
        break;
      case FieldConfigInputType.CHECKBOX:
        defaultVal = false || !!element.default;
        break;
    }

    formValueList.push(defaultVal);

    if (element.validations && element.validations.length) {
      element.validations.forEach((data, i) => {
        switch (data.type) {
          case FieldConfigValidationType.REQUIRED:
            if (element.type === FieldConfigInputType.CHECKBOX) {
              validationList.push(Validators.requiredTrue);
            } else if (element.type === FieldConfigInputType.SELECT || element.type === FieldConfigInputType.NESTED_SELECT) {
              validationList.push((c) => {
                if (element.templateOptions.multiple) {
                  return c.value && c.value.length ? null : 'error';
                }
                return !!c.value ? null : 'error';
              });
            } else {
              validationList.push(Validators.required);
            }
            break;
          case FieldConfigValidationType.PATTERN:
            validationList.push(Validators.pattern(element.validations[i].value as string));
            break;
          case FieldConfigValidationType.MINLENGTH:
            validationList.push(Validators.minLength(element.validations[i].value as number));
            break;
          case FieldConfigValidationType.MAXLENGTH:
            validationList.push(Validators.maxLength(element.validations[i].value as number));
            break;
        }
      });
    }

    formValueList.push(Validators.compose(validationList));

    return formValueList;
  }

  clickedLink(event) {
    this.linkClicked.emit(event);
  }
}
