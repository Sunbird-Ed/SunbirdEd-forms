import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMultiSelectComponent } from './dynamic-multi-select.component';

describe('DynamicMultiSelectComponent', () => {
  let component: DynamicMultiSelectComponent;
  let fixture: ComponentFixture<DynamicMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
