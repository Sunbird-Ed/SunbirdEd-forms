import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { throwError as observableThrowError, of as observableOf, Observable, Subscription } from 'rxjs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FieldConfig } from './form.component.spec.data';


describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserDynamicTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [FormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.config = FieldConfig.configData;
    component.formGroup = formBuilder.group({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit form values on change', () => {
    const changes = {
      config: {
        currentValue: [{ category: 'abcd' }, { subCategory: 'abcd' }],
        firstChange: true,
        previousValue: [{ category: 'dabc' }, { subCategory: 'dabc' }],
        isFirstChange: function () {
          return true;
        }
      }
    };
    component['statusChangesSubscription'] = observableOf(true).subscribe();
    // component['statusChangesSubscription'] = new Subscription();
    spyOn<any>(component['statusChangesSubscription'], 'unsubscribe');
    spyOn<any>(component, 'initializeForm').and.stub();
    component.ngOnChanges(changes);
    expect(component['initializeForm']).toHaveBeenCalled();
    expect(component['statusChangesSubscription'].unsubscribe).toHaveBeenCalled();
  });
});
