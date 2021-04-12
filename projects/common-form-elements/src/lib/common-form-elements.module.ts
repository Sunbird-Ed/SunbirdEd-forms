import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonFormElementsComponent } from './common-form-elements.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TextboxComponent } from './textbox/textbox.component';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormComponent } from './form/form.component';
import { OptionGroupComponent } from './option-group/option-group.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownIconComponent } from './icon/dropdown/dropdownIcon.component';
import { MultipleDropdownComponent } from './multiple-dropdown/multiple-dropdown.component';
import { CaretDownComponent } from './icon/caret-down/caret-down.component';
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

@NgModule({
   declarations: [
      CommonFormElementsComponent,
      DropdownComponent,
      TextboxComponent,
      TextareaComponent,
      CheckboxComponent,
      FormComponent,
      OptionGroupComponent,
      DropdownIconComponent,
      MultipleDropdownComponent,
      CaretDownComponent,
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
      DynamicFrameworkComponent
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      PipesModule,
      TagInputModule
   ],
   exports: [
      CommonFormElementsComponent,
      DropdownComponent,
      CaretDownComponent,
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
      DynamicFrameworkComponent
   ],
   entryComponents: [
      DynamicFormComponent,
      CommonFormElementsComponent,
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
      DynamicFrameworkComponent
   ]
})
export class CommonFormElementsModule { }
