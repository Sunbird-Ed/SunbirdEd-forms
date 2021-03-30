import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTimerComponent } from './dynamic-timer.component';

describe('DynamicTimerComponent', () => {
  let component: DynamicTimerComponent;
  let fixture: ComponentFixture<DynamicTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
