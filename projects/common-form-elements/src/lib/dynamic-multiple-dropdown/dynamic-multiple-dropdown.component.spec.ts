import { from } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMultipleDropdownComponent } from './dynamic-multiple-dropdown.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CaretDownComponent } from '../icon/caret-down/caret-down.component';

describe('DynamicMultipleDropdownComponent', () => {
  let component: DynamicMultipleDropdownComponent;
  let fixture: ComponentFixture<DynamicMultipleDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ DynamicMultipleDropdownComponent, CaretDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMultipleDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
