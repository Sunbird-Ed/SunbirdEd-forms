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


const componentMapper = {
  textarea: DynamicTextareaComponent,
  text: DynamicTextboxComponent,
  select: DynamicDropdownComponent,
  multiselect: DynamicMultiSelectComponent,
  nestedselect: DynamicMultipleDropdownComponent,
  keywords: KeywordsComponent,
  dialcode: DynamicTextboxComponent,
  topicselector: TopicpickerComponent,
  licenses: DynamicDropdownComponent,
  label: DynamicTextboxComponent,
  number: DynamicTextboxComponent,
  checkbox: DynamicCheckboxComponent
};

@Directive({
  selector: '[sbDynamicField]'
})
export class DynamicFieldDirective implements OnInit {



  @Input() field: FieldConfig<String>;
  @Input() formGroup: FormGroup;
  @Input() formControlRef?: FormControl;
  @Input() disabled?: boolean;
  @Input() label: String;
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
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.inputType]);
    this.componentRef = this.container.createComponent(factory);
    // this.renderer2.appendChild(this.elementRef.nativeElement, this.componentRef.location.nativeElement);
    if (this.field.renderingHints && this.field.renderingHints.class) {
      this.setClassListOnElement(this.field.renderingHints.class);
    }
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.formGroup = this.formGroup;
    this.componentRef.instance.formControlRef = this.formControlRef;
    this.componentRef.instance.label = this.label;
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
