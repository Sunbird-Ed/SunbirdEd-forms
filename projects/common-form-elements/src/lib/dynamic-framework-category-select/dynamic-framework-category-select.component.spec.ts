import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFrameworkCategorySelectComponent } from './dynamic-framework-category-select.component';

describe('DynamicFrameworkCategorySelectComponent', () => {
  let component: DynamicFrameworkCategorySelectComponent;
  let fixture: ComponentFixture<DynamicFrameworkCategorySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFrameworkCategorySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFrameworkCategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
