import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFrameworkCategoryNestedSelectComponent } from './dynamic-framework-category-nested-select.component';
import {FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { CaretDownComponent } from '../icon/caret-down/caret-down.component';


describe('DynamicFrameworkCategoryNestedSelectComponent', () => {
  let component: DynamicFrameworkCategoryNestedSelectComponent;
  let fixture: ComponentFixture<DynamicFrameworkCategoryNestedSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ DynamicFrameworkCategoryNestedSelectComponent, CaretDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFrameworkCategoryNestedSelectComponent);
    component = fixture.componentInstance;
    component.formControlRef = new FormControl();
    component.options = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#isAllSelected() should be called after #ngOnInit()', ()=> {
    spyOn(component, 'isAllSelected').and.callThrough();
    component.ngOnInit();
    expect(component.isAllSelected).toHaveBeenCalled();
  });

  it('#setMasterSelected() should be called after #isAllSelected()', ()=> {
    component.default = [1, 2];
    component.options = [1, 2];
    spyOn(component, 'setMasterSelected').and.callThrough();
    component.isAllSelected();
    expect(component.setMasterSelected).toHaveBeenCalled();
  });

  it('#setMasterSelected() should set #masterSelected to true', ()=> {
    component.setMasterSelected();
    expect(component.masterSelected).toBeTruthy();
  });

  it('#resetMasterSelected() should set #masterSelected to false', ()=> {
    component.resetMasterSelected();
    expect(component.masterSelected).toBeFalsy();
  });

  it('#resetTempValue() should be called after #checkUncheckAll()', ()=> {
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
