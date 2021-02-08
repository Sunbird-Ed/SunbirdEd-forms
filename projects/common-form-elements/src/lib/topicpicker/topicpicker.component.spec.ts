import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicpickerComponent } from './topicpicker.component';

describe('TopicpickerComponent', () => {
  let component: TopicpickerComponent;
  let fixture: ComponentFixture<TopicpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
