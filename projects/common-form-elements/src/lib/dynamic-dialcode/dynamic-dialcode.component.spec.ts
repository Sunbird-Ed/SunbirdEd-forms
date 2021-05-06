import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialcodeComponent } from './dynamic-dialcode.component';

describe('DynamicDialcodeComponent', () => {
  let component: DynamicDialcodeComponent;
  let fixture: ComponentFixture<DynamicDialcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
