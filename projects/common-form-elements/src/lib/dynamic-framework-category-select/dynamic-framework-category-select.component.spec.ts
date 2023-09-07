import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFrameworkCategorySelectComponent } from './dynamic-framework-category-select.component';
import {FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { CaretDownComponent } from '../icon/caret-down/caret-down.component';


describe('DynamicFrameworkCategorySelectComponent', () => {
  let component: DynamicFrameworkCategorySelectComponent;
  let fixture: ComponentFixture<DynamicFrameworkCategorySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ DynamicFrameworkCategorySelectComponent, CaretDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFrameworkCategorySelectComponent);
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

});
