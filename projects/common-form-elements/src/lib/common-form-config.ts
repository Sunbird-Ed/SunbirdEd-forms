import {Observable} from 'rxjs';
import {AsyncValidatorFn, FormControl, FormGroup} from '@angular/forms';

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
  type?: FieldConfigInputType;
  fieldName?: string;
  default?: any;
  context?: string;
  children?: { [key: string]: FieldConfig<T>[] } | FieldConfig<T>[];
  templateOptions?: {
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
    message?: string,
    name?: string,
    validator?: any
  }[];
  asyncValidation?: FieldConfigAsyncValidation;
  visible?: boolean;
  editable?: boolean;
  dataType?: string;
  renderingHints?: any;
  name?: string;
  description?: string;
  inputType?: string;
  index?: number;
  placeholder?: string;
  required?: boolean;
  label?: string;
  options?: string[];
  collections?: any;
  value?: any;
  terms?: any;
  range?: any;
  depends?: FormControl[];
  dependencyTerms?: any;
  output?: string;
  sourceCategory?: string;
  association?: any;
}

export enum FilterType {
  FACET = 'facet'
}

export interface Validator {
  name?: string;
  validator?: any;
  message?: string;
  type?: string;
  value?: string;
}


export type DynamicFieldConfigOptionsBuilder<T> =
  (control: FormControl, depends?: FormControl[], formGroup?: FormGroup, notifyLoading?: () => void,
    notifyLoaded?: () => void) => Observable<FieldConfigOption<T>[]> | Promise<FieldConfigOption<T>[]>;



export interface SectionConfig<T> {
  name: string;
  fields: FieldConfig<T>[];
}
