import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FieldConfig, FieldConfigValidationType} from '../common-form-config';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'sb-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input() label: String;
  @Input() placeholder: String;
  @Input() formControlRef: FormControl;
  @Input() config: FieldConfig<String>;

  remainderValidLength$?: Observable<number>;

  constructor() {
  }

  ngOnInit() {
    const maxLengthValidation = this.config.validations && this.config.validations.find((validation) => validation.type === FieldConfigValidationType.MAXLENGTH);

    if (maxLengthValidation) {
      this.remainderValidLength$ = this.formControlRef.valueChanges.pipe(
        startWith(''),
        map((v) => ((typeof maxLengthValidation.value === 'number') ? maxLengthValidation.value : 0) - (v || '').length)
      );
    }
  }
}
