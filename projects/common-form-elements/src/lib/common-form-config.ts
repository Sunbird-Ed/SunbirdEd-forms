import {Observable} from 'rxjs';
import {AsyncValidatorFn, FormControl} from '@angular/forms';

export enum FieldConfigInputType {
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  LABEL = 'label',
  TEXTAREA = 'textarea',
  NESTED_SELECT = 'nested_select',
  NESTED_GROUP = 'nested_group',
  MULTIPLE_SELECT = 'multiple_select'
}

export enum FieldConfigValidationType {
  REQUIRED = 'required',
  MAXLENGTH = 'maxLength',
  REQUIRED_TRUE = 'required_true',
  MINLENGTH = 'minLength',
  PATTERN = 'pattern'
}

export type FieldConfigOptionsBuilder<T> =
  (control: FormControl, context?: FormControl, notifyLoading?: () => void,
    notifyLoaded?: () => void) => Observable<FieldConfigOption<T>[]> | Promise<FieldConfigOption<T>[]>;
export type AsyncValidatorFactory = (marker: string, trigger: HTMLElement) => AsyncValidatorFn;

export interface FieldConfigOption<T> {
  label: string;
  value: T;
  extras?: T;
}
export interface FieldConfigOptionAssociations<T> {
  [key: string]: FieldConfigOption<T>[];
}
export interface FieldConfigAsyncValidation {
  marker: string;
  message?: string;
  trigger?: string;
  asyncValidatorFactory?: AsyncValidatorFactory;
}
export interface FieldConfig<T> {
  code: string;
  type: FieldConfigInputType;
  fieldName?: string;
  default?: any;
  context?: string;
  children?: { [key: string]: FieldConfig<T>[] } | FieldConfig<T>[];
  templateOptions: {
    type?: string,
    label?: string,
    placeHolder?: string,
    prefix?: string,
    multiple?: boolean,
    hidden?: boolean,
    disabled?: boolean,
    options?: FieldConfigOption<T>[] | FieldConfigOptionsBuilder<T> | FieldConfigOptionAssociations<T>,
    labelHtml?: {
      contents: string,
      values?: { [key: string]: string }
    }
  };
  validations?: {
    type: FieldConfigValidationType,
    value?: string | boolean | number | RegExp,
    message?: string
  }[];
  asyncValidation?: FieldConfigAsyncValidation;
}
