import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RedExclamationComponent } from './red-exclamation.component';

describe('RedExclamationComponent', () => {
  let component: RedExclamationComponent;
  let fixture: ComponentFixture<RedExclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedExclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedExclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
