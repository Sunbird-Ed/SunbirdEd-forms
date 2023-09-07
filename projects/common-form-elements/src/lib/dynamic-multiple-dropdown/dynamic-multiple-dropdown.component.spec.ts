import { from } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMultipleDropdownComponent } from './dynamic-multiple-dropdown.component';
import {FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
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
    component.formControlRef = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#isAllSelected() should be called after ngOnInit', ()=> {
    spyOn(component, 'isAllSelected').and.callThrough();
    component.ngOnInit();
    expect(component.isAllSelected).toHaveBeenCalled();
  });

  it('#setMasterSelected() should be called after isAllSelected', ()=> {
    component.default = [1, 2];
    component.options = [1, 2];
    spyOn(component, 'setMasterSelected').and.callThrough();
    component.isAllSelected();
    expect(component.setMasterSelected).toHaveBeenCalled();
  });

  it('#setMasterSelected() call should set #masterSelected to true', ()=> {
    component.setMasterSelected();
    expect(component.masterSelected).toBeTruthy();
  });

  it('#resetMasterSelected() call should set #masterSelected to false', ()=> {
    component.resetMasterSelected();
    expect(component.masterSelected).toBeFalsy();
  });

  it('#resetTempValue() and #addSelected() should be called after #checkUncheckAll()', ()=> {
    spyOn(component, 'resetTempValue').and.callThrough();
    component.checkUncheckAll();
    expect(component.resetTempValue).toHaveBeenCalled();
  });

  it('#onSubmit() should be called after #checkUncheckAll() if #masterSelected is false', ()=> {
    spyOn(component, 'onSubmit').and.callThrough();
    component.checkUncheckAll();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('#resetMasterSelected() should be called after #checkUncheckAll() if #masterSelected is true', ()=> {
    component.masterSelected = true;
    spyOn(component, 'resetMasterSelected').and.callThrough();
    component.checkUncheckAll();
    expect(component.resetMasterSelected).toHaveBeenCalled();
  });
});
