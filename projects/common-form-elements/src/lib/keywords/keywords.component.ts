import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldConfig } from '../common-form-config';
import * as _ from 'lodash-es';

@Component({
  selector: 'sb-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css']
})
export class KeywordsComponent implements OnInit {
  @Input() label: String;
  @Input() placeholder: String;
  @Input() formControlRef: FormControl;
  @Input() field: FieldConfig<String>;
  @Input() validations?: any;
  @Input() disabled: Boolean;
  @Input() default: String;


  public items: any;
  inputText = '';
  constructor() { }

  ngOnInit() {
    if (!_.isEmpty(this.default)) {
      this.items = this.default;
    }
  }

}
