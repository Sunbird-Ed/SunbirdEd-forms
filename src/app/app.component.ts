import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, FormArray  } from '@angular/forms';
import { merge, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { timer } from './formConfig';
import * as _ from 'lodash-es';
import * as moment_ from 'moment';
let evidenceMimeType;
let ecm;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sunbird-forms';
  config: any  = timer;
  evidenceMimeType: any;


  ngOnInit() {
    _.forEach(this.config, (section) => {
      _.forEach(section.fields, field => {
        if (field.code === 'framework') {
          field.options = this.getFramework;
        }
        if (field.code === 'evidenceMimeType') {
            evidenceMimeType = field.range;
            field.options = this.setEvidence;
            field.range = null;
        }
        else if(field.code === 'allowECM'){
            field.options = this.setAllowEcm;
        }
        else if (field.code === 'ecm') {
            ecm = field.options;
            field.options = this.setEcm;
        }
      });
    });

  }

  output(event) {
    // console.log(event);
  }

  valueChanges(event) {
    if(event.startDate){
        let date = moment_(event.startDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        event.startDate=date;
      }
    console.log(event);
  }

  statusChanges(event) {
    // console.log(event);
  }

  getFramework(control, depends: FormControl[], formGroup: FormGroup, loading, loaded) {
    const response =  control.valueChanges.pipe(
      switchMap((value: any) => {
        if (!_.isEmpty(value)) {
          return of({
            'framework': {
                'identifier': 'nit_k-12',
                'code': 'nit_k-12',
                'name': 'nit_k-12',
                'description': 'nit_k-12 Framework',
                'categories': [
                    {
                        'identifier': 'nit_k-12_subject',
                        'code': 'subject',
                        'terms': [
                            {
                                'identifier': 'nit_k-12_subject_english',
                                'code': 'English',
                                'translations': null,
                                'name': 'English',
                                'description': 'English',
                                'index': 1,
                                'category': 'subject',
                                'status': 'Live'
                            },
                            {
                                'identifier': 'nit_k-12_subject_hindi',
                                'code': 'Hindi',
                                'translations': null,
                                'name': 'Hindi',
                                'description': 'Hindi',
                                'index': 2,
                                'category': 'subject',
                                'status': 'Live'
                            }
                        ],
                        'translations': null,
                        'name': 'Subject',
                        'description': 'Subject',
                        'index': 1,
                        'status': 'Live'
                    },
                    {
                        'identifier': 'nit_k-12_medium',
                        'code': 'medium',
                        'terms': [
                            {
                                'associations': [
                                    {
                                        'identifier': 'nit_k-12_subject_english',
                                        'code': 'English',
                                        'translations': null,
                                        'name': 'English',
                                        'description': 'English',
                                        'index': 0,
                                        'category': 'subject',
                                        'status': 'Live'
                                    },
                                    {
                                        'identifier': 'nit_k-12_gradelevel_grade-1',
                                        'code': 'Grade 1',
                                        'translations': null,
                                        'name': 'Grade 1',
                                        'description': 'Grade 1',
                                        'index': 0,
                                        'category': 'gradeLevel',
                                        'status': 'Live'
                                    }
                                ],
                                'identifier': 'nit_k-12_medium_english',
                                'code': 'English',
                                'translations': null,
                                'name': 'English',
                                'description': 'English',
                                'index': 1,
                                'category': 'medium',
                                'status': 'Live'
                            },
                            {
                                'associations': [
                                    {
                                        'identifier': 'nit_k-12_subject_hindi',
                                        'code': 'Hindi',
                                        'translations': null,
                                        'name': 'Hindi',
                                        'description': 'Hindi',
                                        'index': 0,
                                        'category': 'subject',
                                        'status': 'Live'
                                    },
                                    {
                                        'identifier': 'nit_k-12_gradelevel_grade-2',
                                        'code': 'Grade 2',
                                        'translations': null,
                                        'name': 'Grade 2',
                                        'description': 'Grade 2',
                                        'index': 0,
                                        'category': 'gradeLevel',
                                        'status': 'Live'
                                    }
                                ],
                                'identifier': 'nit_k-12_medium_hindi',
                                'code': 'Hindi',
                                'translations': null,
                                'name': 'Hindi',
                                'description': 'Hindi',
                                'index': 2,
                                'category': 'medium',
                                'status': 'Live'
                            }
                        ],
                        'translations': null,
                        'name': 'Medium',
                        'description': 'Medium',
                        'index': 2,
                        'status': 'Live'
                    },
                    {
                        'identifier': 'nit_k-12_board',
                        'code': 'board',
                        'terms': [
                            {
                                'associations': [
                                    {
                                        'identifier': 'nit_k-12_subject_english',
                                        'code': 'English',
                                        'translations': null,
                                        'name': 'English',
                                        'description': 'English',
                                        'index': 0,
                                        'category': 'subject',
                                        'status': 'Live'
                                    },
                                    {
                                        'identifier': 'nit_k-12_gradelevel_grade-1',
                                        'code': 'Grade 1',
                                        'translations': null,
                                        'name': 'Grade 1',
                                        'description': 'Grade 1',
                                        'index': 0,
                                        'category': 'gradeLevel',
                                        'status': 'Live'
                                    },
                                    {
                                        'identifier': 'nit_k-12_medium_english',
                                        'code': 'English',
                                        'translations': null,
                                        'name': 'English',
                                        'description': 'English',
                                        'index': 0,
                                        'category': 'medium',
                                        'status': 'Live'
                                    }
                                ],
                                'identifier': 'nit_k-12_board_cbse',
                                'code': 'CBSE',
                                'translations': null,
                                'name': 'CBSE',
                                'description': 'CBSE',
                                'index': 1,
                                'category': 'board',
                                'status': 'Live'
                            },
                            {
                                'associations': [
                                    {
                                        'identifier': 'nit_k-12_medium_hindi',
                                        'code': 'Hindi',
                                        'translations': null,
                                        'name': 'Hindi',
                                        'description': 'Hindi',
                                        'index': 0,
                                        'category': 'medium',
                                        'status': 'Live'
                                    },
                                    {
                                        'identifier': 'nit_k-12_gradelevel_grade-2',
                                        'code': 'Grade 2',
                                        'translations': null,
                                        'name': 'Grade 2',
                                        'description': 'Grade 2',
                                        'index': 0,
                                        'category': 'gradeLevel',
                                        'status': 'Live'
                                    },
                                    {
                                        'identifier': 'nit_k-12_subject_hindi',
                                        'code': 'Hindi',
                                        'translations': null,
                                        'name': 'Hindi',
                                        'description': 'Hindi',
                                        'index': 0,
                                        'category': 'subject',
                                        'status': 'Live'
                                    }
                                ],
                                'identifier': 'nit_k-12_board_ncert',
                                'code': 'NCERT',
                                'translations': null,
                                'name': 'NCERT',
                                'description': 'NCERT',
                                'index': 2,
                                'category': 'board',
                                'status': 'Live'
                            }
                        ],
                        'translations': null,
                        'name': 'Board',
                        'description': 'Board',
                        'index': 3,
                        'status': 'Live'
                    },
                    {
                        'identifier': 'nit_k-12_gradelevel',
                        'code': 'gradeLevel',
                        'terms': [
                            {
                                'associations': [
                                    {
                                        'identifier': 'nit_k-12_subject_english',
                                        'code': 'English',
                                        'translations': null,
                                        'name': 'English',
                                        'description': 'English',
                                        'index': 0,
                                        'category': 'subject',
                                        'status': 'Live'
                                    }
                                ],
                                'identifier': 'nit_k-12_gradelevel_grade-1',
                                'code': 'Grade 1',
                                'translations': null,
                                'name': 'Grade 1',
                                'description': 'Grade 1',
                                'index': 1,
                                'category': 'gradeLevel',
                                'status': 'Live'
                            },
                            {
                                'associations': [
                                    {
                                        'identifier': 'nit_k-12_subject_hindi',
                                        'code': 'Hindi',
                                        'translations': null,
                                        'name': 'Hindi',
                                        'description': 'Hindi',
                                        'index': 0,
                                        'category': 'subject',
                                        'status': 'Live'
                                    }
                                ],
                                'identifier': 'nit_k-12_gradelevel_grade-2',
                                'code': 'Grade 2',
                                'translations': null,
                                'name': 'Grade 2',
                                'description': 'Grade 2',
                                'index': 2,
                                'category': 'gradeLevel',
                                'status': 'Live'
                            }
                        ],
                        'translations': null,
                        'name': 'GradeLevel',
                        'description': 'GradeLevel',
                        'index': 4,
                        'status': 'Live'
                    },
                    {
                        'identifier': 'nit_k-12_topic',
                        'code': 'topic',
                        'terms': [
                            {
                                'identifier': 'nit_k-12_topic_topic-1',
                                'code': 'Topic 1',
                                'translations': null,
                                'name': 'Topic 1',
                                'description': 'Topic 1',
                                'index': 1,
                                'category': 'topic',
                                'status': 'Live'
                            }
                        ],
                        'translations': null,
                        'name': 'Topic',
                        'description': 'Topic',
                        'index': 5,
                        'status': 'Live'
                    },
                    {
                        'identifier': 'nit_k-12_developmentgoal',
                        'code': 'developmentGoal',
                        'translations': null,
                        'name': 'Development Goal',
                        'description': 'Category for Development Goal',
                        'index': 6,
                        'status': 'Live'
                    }
                ],
                'type': 'K-12',
                'objectType': 'Framework'
            }
        }).pipe(delay(100));
        } else {
          return of(null);
        }
      })
    );
    return response;
  }

  setEvidence(control, depends: FormControl[], formGroup: FormGroup, loading, loaded) {
    console.log(control);
    control.isVisible = 'no';
    control.range = evidenceMimeType;
    const response = merge(..._.map(depends, depend => depend.valueChanges)).pipe(
        switchMap((value: any) => {
             console.log(value);
            if (!_.isEmpty(value) && _.toLower(value) === 'yes') {
                control.isVisible = 'yes';
                return of({range: evidenceMimeType});
            } else {
                control.isVisible = 'no';
                return of(null);
            }
        })
    );
    return response;
  }

  setEcm(control, depends: FormControl[], formGroup: FormGroup, loading, loaded){
    console.log(control);
    control.isVisible = 'no';
    control.options = ecm;
    const response = merge(..._.map(depends, depend => depend.valueChanges)).pipe(
        switchMap((value: any) => {
            if (!_.isEmpty(value) && _.toLower(value) === 'yes') {
                control.isVisible = 'yes';
                return of({options:ecm});
            } else {
                control.isVisible = 'no';
                return of(null);
            }
        })
    );
    return response;
  }

  setAllowEcm(control, depends: FormControl[], formGroup: FormGroup, loading, loaded){
    console.log(control);
    control.isVisible = 'no';
    const response = merge(..._.map(depends, depend => depend.valueChanges)).pipe(
        switchMap((value: any) => {
             console.log(value);
             if (!_.isEmpty(value) && _.toLower(value) === 'self' ){
                control.isVisible = 'no';
                return of(null)
             }
             else{
                control.isVisible = 'yes'; 
                return of(null)
             }
        })
    );
    return response;
  }

}
