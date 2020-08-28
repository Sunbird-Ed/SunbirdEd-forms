import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
  @Input() placeHolder?: string;
  @Input() isMultiple?: boolean;
  @Input() context?: FormControl;
  @Input() formControlRef?: FormControl;
  @Input() default?: any;
  @Input() contextData: any;
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;

  options$?: Observable<FieldConfigOption<any>[]>;
  contextValueChangesSubscription?: Subscription;

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
}
