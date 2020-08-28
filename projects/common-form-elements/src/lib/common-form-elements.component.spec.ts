import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFormElementsComponent } from './common-form-elements.component';

describe('CommonFormElementsComponent', () => {
  let component: CommonFormElementsComponent;
  let fixture: ComponentFixture<CommonFormElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFormElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFormElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
