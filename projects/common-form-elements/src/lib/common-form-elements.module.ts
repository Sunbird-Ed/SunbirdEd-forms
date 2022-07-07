import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TextboxComponent } from './textbox/textbox.component';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormComponent } from './form/form.component';
import { OptionGroupComponent } from './option-group/option-group.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownIconComponent } from './icon/dropdown/dropdownIcon.component';
import { MultipleDropdownComponent } from './multiple-dropdown/multiple-dropdown.component';
import { MaterialAutoCompleteComponent } from './material-auto-complete/material-auto-complete.component';
import { MaterialDropdownComponent } from './material-dropdown/material-dropdown.component';
import { CaretDownComponent } from './icon/caret-down/caret-down.component';
import { CaretUpComponent } from './icon/caret-up/caret-up.component';
import { PipesModule } from './pipes/pipes.module';
import { RedExclamationComponent } from './icon/red-exclamation/red-exclamation.component';
import { GreenTickComponent } from './icon/green-tick/green-tick.component';
import { EmptyCircleComponent } from './icon/empty-circle/empty-circle.component';
import { FiltersComponent } from './filters/filters.component';
import { PillsComponent } from './pills/pills.component';


import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicTextboxComponent } from './dynamic-textbox/dynamic-textbox.component';
import { DynamicTextareaComponent } from './dynamic-textarea/dynamic-textarea.component';
import { DynamicDropdownComponent } from './dynamic-dropdown/dynamic-dropdown.component';
import { DynamicMultipleDropdownComponent } from './dynamic-multiple-dropdown/dynamic-multiple-dropdown.component';
import { DynamicCheckboxComponent } from './dynamic-checkbox/dynamic-checkbox.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { DynamicMultiSelectComponent } from './dynamic-multi-select/dynamic-multi-select.component';
import { TopicpickerComponent } from './topicpicker/topicpicker.component';
import { KeywordsComponent } from './keywords/keywords.component';
import { TagInputModule } from 'ngx-chips';
import { DynamicTimerComponent } from './dynamic-timer/dynamic-timer.component';
import { DynamicFrameworkCategorySelectComponent } from './dynamic-framework-category-select/dynamic-framework-category-select.component';
import { DynamicFrameworkComponent } from './dynamic-framework/dynamic-framework.component';
import { DynamicRadioComponent } from './dynamic-radio/dynamic-radio.component';
import { DynamicDialcodeComponent } from './dynamic-dialcode/dynamic-dialcode.component';
import { DynamicFrameworkCategoryNestedSelectComponent } from './dynamic-framework-category-nested-select/dynamic-framework-category-nested-select.component';
import { DynamicDateComponent } from './dynamic-date/dynamic-date.component';
import { DynamicRichtextComponent } from './dynamic-richtext/dynamic-richtext.component';
import { DynamicInputFieldComponent } from './dynamic-input-field/dynamic-input-field.component';
import { DynamicInfoComponent } from './dynamic-info/dynamic-info.component';

import { MaterialModule } from './material.module';

@NgModule({
   declarations: [
      DropdownComponent,
      TextboxComponent,
      TextareaComponent,
      CheckboxComponent,
      FormComponent,
      OptionGroupComponent,
      DropdownIconComponent,
      MultipleDropdownComponent,
      MaterialAutoCompleteComponent,
      MaterialDropdownComponent,
      CaretDownComponent,
      CaretUpComponent,
      RedExclamationComponent,
      GreenTickComponent,
      EmptyCircleComponent,
      FiltersComponent,
      PillsComponent,
      DynamicFormComponent,
      DynamicTextboxComponent,
      DynamicTextareaComponent,
      DynamicDropdownComponent,
      DynamicMultipleDropdownComponent,
      DynamicCheckboxComponent,
      DynamicFieldDirective,
      TopicpickerComponent,
      KeywordsComponent,
      DynamicMultiSelectComponent,
      DynamicTimerComponent,
      DynamicFrameworkCategorySelectComponent,
      DynamicFrameworkCategoryNestedSelectComponent,
      DynamicFrameworkComponent,
      DynamicRadioComponent,
      DynamicDialcodeComponent,
      DynamicFrameworkComponent,
      DynamicDateComponent,
      DynamicRichtextComponent,
      DynamicInputFieldComponent,
      DynamicInfoComponent
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      PipesModule,
      TagInputModule,
      MaterialModule
   ],
   exports: [
      DropdownComponent,
      CaretDownComponent,
      CaretUpComponent,
      TextboxComponent,
      TextareaComponent,
      CheckboxComponent,
      FormComponent,
      OptionGroupComponent,
      DropdownIconComponent,
      RedExclamationComponent,
      GreenTickComponent,
      EmptyCircleComponent,
      MultipleDropdownComponent,
      MaterialAutoCompleteComponent,
      MaterialDropdownComponent,
      FiltersComponent,
      DynamicFormComponent,
      DynamicTextboxComponent,
      DynamicTextareaComponent,
      DynamicDropdownComponent,
      DynamicMultipleDropdownComponent,
      DynamicCheckboxComponent,
      DynamicMultiSelectComponent,
      TopicpickerComponent,
      KeywordsComponent,
      DynamicFieldDirective,
      DynamicTimerComponent,
      DynamicFrameworkCategorySelectComponent,
      DynamicFrameworkCategoryNestedSelectComponent,
      DynamicFrameworkComponent,
      DynamicRadioComponent,
      DynamicDialcodeComponent,
      DynamicFrameworkComponent,
      DynamicDateComponent,
      DynamicRichtextComponent,
      DynamicInfoComponent
   ],
   entryComponents: [
      DynamicFormComponent,
      DynamicTimerComponent,
      DynamicTextboxComponent,
      DynamicTextareaComponent,
      DynamicDropdownComponent,
      DynamicMultipleDropdownComponent,
      DynamicCheckboxComponent,
      DynamicMultiSelectComponent,
      TopicpickerComponent,
      KeywordsComponent,
      DynamicTimerComponent,
      DynamicFrameworkCategorySelectComponent,
      DynamicFrameworkCategoryNestedSelectComponent,
      DynamicFrameworkComponent,
      DynamicRadioComponent,
      DynamicDialcodeComponent,
      DynamicFrameworkComponent,
      DynamicDateComponent,
      DynamicRichtextComponent
   ]
})
export class CommonFormElementsModule { }
