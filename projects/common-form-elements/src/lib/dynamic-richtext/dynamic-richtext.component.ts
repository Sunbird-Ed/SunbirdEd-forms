import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FieldConfigAsyncValidation, CustomFormControl } from '../common-form-config';
import ClassicEditor from '@project-sunbird/ckeditor-build-classic';
import * as _ from 'lodash-es';
@Component({
  selector: 'sb-dynamic-richtext',
  templateUrl: './dynamic-richtext.component.html',
  styleUrls: ['./dynamic-richtext.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class DynamicRichtextComponent implements OnInit, AfterViewInit {
  @ViewChild('EDITOR', { static: false }) public editorRef: ElementRef;
  @Input() asyncValidation?: FieldConfigAsyncValidation;
  @Input() label: String;
  @Input() labelHtml: any;
  @Input() field: any;
  @Input() placeholder: String;
  @Input() validations?: any;
  @Input() formControlRef?: CustomFormControl;
  @Input() prefix?: String;
  @Input() default: String;
  @Input() disabled: Boolean;
  @Input() visible: Boolean;
  @ViewChild('validationTrigger', { static: false }) validationTrigger: ElementRef;
  showEditor = false;
  editorConfig: any;
  editorInstance: any;
  characterCount: any;
  constructor() { }

  ngOnInit() {
    this.editorConfig = {
      alignment: {
        options: [
          { name: 'left', className: 'text-left' },
          { name: 'center', className: 'text-center' },
          { name: 'right', className: 'text-right' }
        ]
      },
      toolbar: ['bold', '|', 'italic', '|', 'underline', '|', 'insertTable',
        '|', 'numberedList', '|', 'BulletedList', '|', 'fontSize', '|', 'alignment', '|'
      ],
      fontSize: {
        options: [
          'eight',
          'ten',
          'twelve',
          'fourteen',
          'sixteen',
          'eighteen',
          'twenty',
          'twentytwo',
          'twentyfour',
          'twentysix',
          'twentyeight',
          'thirty',
          'thirtysix'
        ]
      },
      isReadOnly: this.disabled,
      removePlugins: ['ImageCaption', 'mathtype', 'ChemType']
    };
    this.showEditor = true;
  }
  ngAfterViewInit() {
    if (this.visible) {
      this.initializeEditors();
    }
    if (this.asyncValidation && this.asyncValidation.asyncValidatorFactory && this.formControlRef) {
      if (this.formControlRef.asyncValidator) {
        return;
      }
      this.formControlRef.setAsyncValidators(this.asyncValidation.asyncValidatorFactory(
        this.asyncValidation.marker,
        this.validationTrigger.nativeElement
      ));
    }
  }

  initializeEditors() {
    ClassicEditor.create(this.editorRef.nativeElement, {
      extraPlugins: ['Font', 'Table'],
      alignment : this.editorConfig.alignment,
      toolbar: this.editorConfig.toolbar,
      fontSize: this.editorConfig.fontSize,
      isReadOnly: this.editorConfig.isReadOnly,
      removePlugins: this.editorConfig.removePlugins,
      wordCount: {
        onUpdate: stats => {
          this.characterCount = stats.characters;
        },
      }
    })
      .then(editor => {
        this.editorInstance = editor;
        editor.isReadOnly = this.disabled;
        this.onChangeEditor(this.editorInstance);
      })
      .catch(error => {
        console.error(error.stack);
      });
  }
  onChangeEditor(editor) {
    editor.model.document.on('change', (eventInfo, batch) => {
      this.formControlRef.markAsTouched();
      this.formControlRef.richTextCharacterCount = this.characterCount;
      this.formControlRef.patchValue(editor.getData());
    });
  }
}
