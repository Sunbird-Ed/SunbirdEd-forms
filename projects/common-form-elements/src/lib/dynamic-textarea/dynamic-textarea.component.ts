import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FieldConfig, FieldConfigValidationType} from '../common-form-config';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'sb-dynamic-textarea',
  templateUrl: './dynamic-textarea.component.html',
  styleUrls: ['./dynamic-textarea.component.css']
})
export class DynamicTextareaComponent implements OnInit {

  @Input() label: String;
  @Input() placeholder: String;
  @Input() formControlRef: FormControl;
  @Input() field: FieldConfig<String>;
  @Input() validations?: any;
  @Input() default: String;
  @Input() disabled: Boolean;

  remainderValidLength$?: Observable<number>;

  constructor() {
  }

  ngOnInit() {
    const maxLengthValidation = this.field.validations &&
    this.field.validations.find((validation) => validation.type === FieldConfigValidationType.MAXLENGTH);

    if (maxLengthValidation) {
      this.remainderValidLength$ = this.formControlRef.valueChanges.pipe(
        startWith(''),
        map((v) => ((typeof maxLengthValidation.value === 'number') ? maxLengthValidation.value : 0) - (v || '').length)
      );
    }
  }
}
