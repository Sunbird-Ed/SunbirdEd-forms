import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GreenTickComponent } from './green-tick.component';

describe('RedExclamationComponent', () => {
  let component: GreenTickComponent;
  let fixture: ComponentFixture<GreenTickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenTickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
