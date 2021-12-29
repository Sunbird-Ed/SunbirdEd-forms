import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef, Renderer2, ElementRef} from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { FieldConfig } from '../common-form-config';
// import { InputComponent } from '../input/input.component';
// import { ButtonComponent } from '../button/button.component';
// import { SelectComponent } from '../select/select.component';
import * as _ from 'lodash-es';
import {Subject} from 'rxjs';


import { DynamicTextboxComponent } from '../dynamic-textbox/dynamic-textbox.component'
import { DynamicTextareaComponent } from '../dynamic-textarea/dynamic-textarea.component';
import { TopicpickerComponent } from '../topicpicker/topicpicker.component';
import { KeywordsComponent } from '../keywords/keywords.component';
import { DynamicMultiSelectComponent } from '../dynamic-multi-select/dynamic-multi-select.component';
import { DynamicDropdownComponent } from '../dynamic-dropdown/dynamic-dropdown.component';
import { DynamicMultipleDropdownComponent } from '../dynamic-multiple-dropdown/dynamic-multiple-dropdown.component';
import { DynamicCheckboxComponent } from '../dynamic-checkbox/dynamic-checkbox.component';
import { DynamicTimerComponent } from '../dynamic-timer/dynamic-timer.component';
import { DynamicFrameworkComponent } from '../dynamic-framework/dynamic-framework.component';
import { DynamicFrameworkCategorySelectComponent } from '../dynamic-framework-category-select/dynamic-framework-category-select.component';
import { DynamicRadioComponent } from '../dynamic-radio/dynamic-radio.component';
import { DynamicDialcodeComponent } from '../dynamic-dialcode/dynamic-dialcode.component';
import { DynamicFrameworkCategoryNestedSelectComponent } from '../dynamic-framework-category-nested-select/dynamic-framework-category-nested-select.component';
import { DynamicDateComponent } from '../dynamic-date/dynamic-date.component';
import { DynamicRichtextComponent } from '../dynamic-richtext/dynamic-richtext.component';
import { DynamicInputFieldComponent } from '../dynamic-input-field/dynamic-input-field.component';

const componentMapper = {
  textarea: DynamicTextareaComponent,
  text: DynamicTextboxComponent,
  select: DynamicDropdownComponent,
  multiselect: DynamicMultiSelectComponent,
  nestedselect: DynamicMultipleDropdownComponent,
  keywords: KeywordsComponent,
  selectTextBox: KeywordsComponent,
  topicselector: TopicpickerComponent,
  licenses: DynamicDropdownComponent,
  label: DynamicTextboxComponent,
  number: DynamicTextboxComponent,
  checkbox: DynamicCheckboxComponent,
  timer: DynamicTimerComponent,
  framework: DynamicFrameworkComponent,
  frameworkCategoryNestedSelect: DynamicFrameworkCategoryNestedSelectComponent,
  frameworkCategorySelect: DynamicFrameworkCategorySelectComponent,
  radio: DynamicRadioComponent,
  dialcode: DynamicDialcodeComponent,
  date: DynamicDateComponent,
  richtext: DynamicRichtextComponent,
  dynamicInput: DynamicInputFieldComponent
};

@Directive({
  selector: '[sbDynamicField]'
})
export class DynamicFieldDirective implements OnInit {



  @Input() field: FieldConfig<String>;
  @Input() formGroup: FormGroup;
  @Input() formControlRef?: FormControl;
  @Input() disabled?: boolean;
  @Input() visible?: boolean;
  @Input() label: String;
  @Input() labelHtml?: any;
  @Input() options?: any = [];
  @Input() placeholder?: string;
  @Input() context?: FormControl;
  @Input() validations?: any;
  @Input() contextTerms?: any = [];
  @Input() depends?: FormControl[];
  @Input() dependencyTerms?: any = [];
  @Input() default: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;

  componentRef: any;


  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private renderer2: Renderer2,
    private elementRef: ElementRef

  ) { }

  ngOnInit() {
    const mappedComponent =  componentMapper[this.field.inputType];
    if (_.isFunction(mappedComponent)) {
      const factory = this.resolver.resolveComponentFactory(mappedComponent);
      this.componentRef = this.container.createComponent(factory);
      // this.renderer2.appendChild(this.elementRef.nativeElement, this.componentRef.location.nativeElement);
      if (this.field.renderingHints && this.field.renderingHints.class) {
        this.setClassListOnElement(this.field.renderingHints.class);
      }
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.formGroup = this.formGroup;
      this.componentRef.instance.formControlRef = this.formControlRef;
      this.componentRef.instance.label = this.label;
      this.componentRef.instance.labelHtml = this.labelHtml;
      this.componentRef.instance.placeholder = this.placeholder;
      this.componentRef.instance.options = this.options;
      this.componentRef.instance.context = this.context;
      this.componentRef.instance.contextTerms = this.contextTerms;
      this.componentRef.instance.depends = this.depends;
      this.componentRef.instance.dependencyTerms = this.dependencyTerms;
      this.componentRef.instance.default = this.default;
      this.componentRef.instance.dataLoadStatusDelegate = this.dataLoadStatusDelegate;
      this.componentRef.instance.validations = this.validations;
      this.componentRef.instance.disabled = this.disabled;
      this.componentRef.instance.visible = this.visible;
    }

    // this.componentRef.instance = {
    //   field : this.field,
    //   formGroup : this.formGroup,
    //   formControlRef : this.formControlRef,
    //   label : this.label,
    //   options : this.options,
    //   context : this.context
    // };
  }

  setClassListOnElement (cssClasses) {
    const classList = cssClasses.split(' ');
    _.forEach(classList, cssClass => {
      this.renderer2.addClass(this.componentRef.location.nativeElement, cssClass);
    });
  }

}
