import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFrameworkComponent } from './dynamic-framework.component';

describe('DynamicFrameworkComponent', () => {
  let component: DynamicFrameworkComponent;
  let fixture: ComponentFixture<DynamicFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFrameworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
