import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMultipleDropdownComponent } from './dynamic-multiple-dropdown.component';

describe('DynamicMultipleDropdownComponent', () => {
  let component: DynamicMultipleDropdownComponent;
  let fixture: ComponentFixture<DynamicMultipleDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicMultipleDropdownComponent ]
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
