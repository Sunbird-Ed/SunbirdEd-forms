import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDropdownComponent } from './dynamic-dropdown.component';

describe('DynamicDropdownComponent', () => {
  let component: DynamicDropdownComponent;
  let fixture: ComponentFixture<DynamicDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
