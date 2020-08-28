import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDropdownComponent } from './multiple-dropdown.component';

describe('MultipleDropdownComponent', () => {
  let component: MultipleDropdownComponent;
  let fixture: ComponentFixture<MultipleDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
