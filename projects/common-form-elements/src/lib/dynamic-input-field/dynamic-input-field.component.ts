import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { FieldConfig } from "../common-form-config";
import * as _ from 'lodash-es';

@Component({
  selector: "sb-dynamic-input-field",
  templateUrl: "./dynamic-input-field.component.html",
  styleUrls: ["./dynamic-input-field.component.css"],
})
export class DynamicInputFieldComponent implements OnInit {
  @Input() label: String;
  @Input() placeholder: String;
  @Input() formControlRef: FormControl;
  @Input() field: FieldConfig<String>;
  @Input() validations?: any;
  @Input() default: String;
  @Input() disabled: Boolean;
  dynamicForm: FormGroup;
  disabledAddInput:boolean=false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      inputs: this.fb.array([]),
    });
    if(!_.isEmpty(this.field?.default)){
      this.formControlRef.patchValue(this.field?.default)
        this.field?.default.forEach(element => {
          this.addInputs(element);
        });
    }
    else{
      this.addInputs();
    }
  }

  newInput(val?:any): FormGroup {
    return this.fb.group({
      inputVal: val ? val : '',
    });
  }

  inputsArray(): FormArray {
    return this.dynamicForm.get("inputs") as FormArray;
  }

  addInputs(val?:any) {
    if(!this.disabledAddInput){
      this.inputsArray().push(this.newInput(val));
      this.checkNoOfField();
    }
  }

  remove(i: number) {
    this.inputsArray().removeAt(i);
  }

  onSubmit() {
    let data = this.dynamicForm.value.inputs;
    let array:any = [];
    _.forEach(data, (el) => {
      array.push(el.inputVal);
    });
    this.formControlRef.patchValue(array);
    console.log(this.formControlRef);
  }


  checkNoOfField(){
    this.validations.forEach(element => {
      if(this.inputsArray().length === +element.value){
        this.disabledAddInput = true;
      }
    });
  }

}
