import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRichtextComponent } from './dynamic-richtext.component';

describe('DynamicRichtextComponent', () => {
  let component: DynamicRichtextComponent;
  let fixture: ComponentFixture<DynamicRichtextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicRichtextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicRichtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});