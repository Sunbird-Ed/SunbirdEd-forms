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
  selecteditems:any;
  constructor() { }

  ngOnInit() {
    if (!_.isEmpty(this.default)) {
      this.items = this.default;
    }
    if(!_.isEmpty(this.field?.default)){
      this.selecteditems = this.field?.default;
    }
  }

  onItemAdded(ev) {
    let items: any = [];
    items = this.field.options;
    let res = items.filter(item => item === ev.label);
    if (res.length === 0) {
      items.push(ev.label);
    }
    this.selecteditems.push(ev.label)
    this.selecteditems.forEach((el, index) => {
      if (el?.label === ev.label) {
        this.selecteditems.splice(index, 1);
      }
    })
  }

}
