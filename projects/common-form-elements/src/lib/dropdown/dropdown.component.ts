import {Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject, Subscription} from 'rxjs';
import {FieldConfigOption, FieldConfigOptionsBuilder} from '../common-form-config';
import {tap} from 'rxjs/operators';
import {ValueComparator} from '../utilities/value-comparator';

@Component({
  selector: 'sb-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, OnChanges, OnDestroy {
  ValueComparator = ValueComparator;

  @Input() disabled?: boolean;
  @Input() options: any = [];
  @Input() label?: string;
  @Input() labelHtml: any;
  @Input() placeHolder?: string;
  @Input() isMultiple?: boolean;
  @Input() context?: FormControl;
  @Input() formControlRef?: FormControl;
  @Input() default?: any;
  @Input() contextData: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  @Input() type?: string;
  @Input() styleClass?: string;
  @Output() onChangeFilter: EventEmitter<any> = new EventEmitter();
  options$?: Observable<FieldConfigOption<any>[]>;
  contextValueChangesSubscription?: Subscription;
  selectedType: any;
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.options) {
      this.options = [];
    }

    if (this.isOptionsClosure(this.options)) {
      this.options$ = (this.options as FieldConfigOptionsBuilder<any>)(
        this.formControlRef,
        this.context,
        () => this.dataLoadStatusDelegate.next('LOADING'),
        () => this.dataLoadStatusDelegate.next('LOADED')
      ) as any;
    }
  }

  ngOnInit() {
    if (this.context) {
      this.contextValueChangesSubscription = this.context.valueChanges.pipe(
        tap(() => {
          this.formControlRef.patchValue(null);
        })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
  }

  isOptionsArray(options: any) {
    return Array.isArray(options);

  }

  isOptionsClosure(options: any) {
    return typeof options === 'function';
  }

  isOptionsMap(input: any) {
    return !Array.isArray(input) && typeof input === 'object';
  }

  onChangeFacet($event) {
    const selectedObject = this.options.data[$event.currentTarget.options.selectedIndex - 1];
    let emitPayload = JSON.parse(JSON.stringify(this.options));
    emitPayload['data'] = selectedObject;
    emitPayload['selectedLabel'] = selectedObject.label;
    emitPayload['selectedValue'] = selectedObject.value;
    this.onChangeFilter.emit(emitPayload);
  }
}
