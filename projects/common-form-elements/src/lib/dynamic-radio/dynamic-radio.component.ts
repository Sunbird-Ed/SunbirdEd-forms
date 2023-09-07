import { Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FieldConfig} from '../common-form-config';
import * as _ from 'lodash-es';

@Component({
  selector: 'sb-dynamic-radio',
  templateUrl: './dynamic-radio.component.html',
  styleUrls: ['./dynamic-radio.component.css']
})
export class DynamicRadioComponent implements OnInit {
  @Input() field: FieldConfig<String>;
  @Input() disabled?: boolean;
  @Input() visible?: boolean;
  @Input() label?: string;
  @Input() formControlRef?: FormControl;
  @Input() default?: any;
  _: any = _;

  constructor() { }

  ngOnInit() {}

  isOptionsArrayMap(input: any) {
    return Array.isArray(input) && typeof input[0] === 'object';
  }

  isOptionsArray(options: any) {
    return Array.isArray(options);
  }

  getOptionValueForRange(option, optionsType) {
    if (this.field.output) {
      if (this.field.dataType === 'list') {
        if (optionsType === 'map' || optionsType === 'closure') {
          return [option[this.field.output]] || [option.value] || [option.identifier] || [option.name] || [option.label];
        } else  {
          return [option];
        }
      } else {
        if (optionsType === 'map' || optionsType === 'closure') {
          return option[this.field.output] || option.value || option.identifier || option.name || option.label;
        } else  {
          return option;
        }
      }
    } else {
      if (this.field.dataType === 'list') {
        if (optionsType === 'map' || optionsType === 'closure') {
          return [option.value] || [option.identifier] || [option.name] || [option.label];
        } else  {
          return [option];
        }
      } else {
        if (optionsType === 'map' || optionsType === 'closure') {
          return  option.name || option.label || option.value || option.identifier;
        } else  {
          return option;
        }
      }
    }
  }

}
