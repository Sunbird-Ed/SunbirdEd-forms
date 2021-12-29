import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInputFieldComponent } from './dynamic-input-field.component';

describe('DynamicInputFieldComponent', () => {
  let component: DynamicInputFieldComponent;
  let fixture: ComponentFixture<DynamicInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicInputFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
