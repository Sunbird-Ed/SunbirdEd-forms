import {Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import { FieldConfig, FieldConfigAsyncValidation } from '../common-form-config';

@Component({
  selector: 'sb-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() asyncValidation?: FieldConfigAsyncValidation;
  @Input() label: String;
  @Input() labelHtml: any;
  @Input() placeholder: String;
  @Input() validations?: any;
  @Input() formControlRef?: FormControl;
  @Input() prefix?: String;
  @Input() config: FieldConfig<String>;
  @Output() labelClickEventHandler = new EventEmitter();
  @Output() inputIconClick = new EventEmitter();
  @ViewChild('validationTrigger') validationTrigger: ElementRef;
  image: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    
  }

  ngAfterViewInit() {
    if (this.asyncValidation && this.asyncValidation.asyncValidatorFactory && this.formControlRef) {
      if (this.formControlRef.asyncValidator) {
        return;
      }

      this.formControlRef.setAsyncValidators(this.asyncValidation.asyncValidatorFactory(
        this.asyncValidation.marker,
        this.validationTrigger.nativeElement
      ));
    }
    if (this.config.templateOptions.showIcon && this.config.templateOptions.showIcon.show) {
      this.image = this.config.templateOptions.showIcon.image.inactive;
    }
  }

  labelClickHandler(event) {
    this.labelClickEventHandler.emit(event);
  }

  inputIconHandler(event) {
    if (event) {
      if(this.config.templateOptions.type == 'text') {
        this.config.templateOptions.type = "password";
        this.image = this.config.templateOptions.showIcon.image.inactive;
      } else if(this.config.templateOptions.type == 'password') {
        this.config.templateOptions.type = "text";
        this.image = this.config.templateOptions.showIcon?.image?.active;
      }
    }
    this.inputIconClick.emit({config: this.config, event});
  }
}
