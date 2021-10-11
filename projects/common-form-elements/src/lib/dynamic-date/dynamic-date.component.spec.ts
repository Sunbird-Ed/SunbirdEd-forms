import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDateComponent } from './dynamic-date.component';

describe('DynamicDateComponent', () => {
  let component: DynamicDateComponent;
  let fixture: ComponentFixture<DynamicDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
