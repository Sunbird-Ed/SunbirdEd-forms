import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownIconComponent } from './dropdownIcon.component';

describe('DropdownComponent', () => {
  let component: DropdownIconComponent;
  let fixture: ComponentFixture<DropdownIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
