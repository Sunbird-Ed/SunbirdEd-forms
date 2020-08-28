import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyCircleComponent } from './empty-circle.component';

describe('EmptyCircleComponent', () => {
  let component: EmptyCircleComponent;
  let fixture: ComponentFixture<EmptyCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
