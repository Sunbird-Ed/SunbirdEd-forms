import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTimeComponent } from './dynamic-time.component';

describe('DynamicTimeComponent', () => {
  let component: DynamicTimeComponent;
  let fixture: ComponentFixture<DynamicTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
