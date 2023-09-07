export const timer = [
  {
    'name': 'Rich Text Section',
    'fields': [{
        'code': 'instructions',
        'dataType': 'text',
        'description': 'Name of the Instruction',
        'showInfo':true,
        'editable': true,
        'inputType': 'richtext',
        'label': 'Instructions',
        'name': 'Instruction',
        'placeholder': 'Enter instructions',
        'renderingHints': {
          'class': 'sb-g-col-lg-2 required'
        },
        'validations': [
          {
            'type': 'maxLength',
            'value': '100',
            'message': 'Input is Exceeded'
          },
          {
            'type': 'required',
            'message': 'Instruction is required'
          }
        ],
        'required': true,
        'visible': true,
      }]
},
{
    'name': 'First Section',
    'fields': [
        {
            'code': 'showEvidence',
            'dataType': 'text',
            'description': 'Allow Evidence',
            'showInfo':true,
            'editable': true,
            'index': 5,
            'inputType': 'radio',
            'label': 'Allow Evidence',
            'name': 'showEvidence',
            'placeholder': 'showEvidence',
            'renderingHints': {
                'class': 'sb-g-col-lg-1'
            },
            'range': [
                'Yes',
                'No'
            ],
            'required': true,
            'visible': true
        },
        {
            'code': 'evidenceMimeType',
            'dataType': 'list',
            'depends': [
                'showEvidence'
            ],
            'description': 'Evidence',
            'editable': true,
            'inputType': 'multiselect',
            'label': 'evidence',
            'name': 'evidenceMimeType',
            'placeholder': 'evidence',
            'renderingHints': {
                'class': 'sb-g-col-lg-1'
            },
            'required': false,
            'visible': true,
            'range': [
                {
                'value': 'image/png',
                'label': 'image/png'
                },
                {'value': 'audio/mp3',
                'label': 'audio/mp3'
                },
                {'value': 'video/mp4',
                'label': 'video/mp4'
                },
                {'value': 'video/webm',
                'label': 'video/webm'
                }
            ]
        },
        {
            'code': 'appIcon',
            'dataType': 'text',
            'description': 'appIcon of the content',
            'editable': true,
            'inputType': 'appIcon',
            'label': 'Icon',
            'name': 'Icon',
            'placeholder': 'Icon',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'required': true,
            'visible': true
        },
        {
            'code': 'name',
            'dataType': 'text',
            'description': 'Name of the content',
            'editable': true,
            'showInfo':true,
            'inputType': 'text',
            'label': 'Title',
            'name': 'Name',
            'placeholder': 'Title',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'required': true,
            'visible': true,
            'validations': [
                {
                    'type': 'maxLength',
                    'value': '120',
                    'message': 'Input is Exceeded'
                },
                {
                    'type': 'required',
                    'message': 'Title is required'
                }
            ],
            'default': 'Untitled Course'
        },
        {
            'code': 'startDate',
            'dataType': 'date',
            'description': 'start Date',
            'showInfo':true,
            'editable': true,
            'inputType': 'date',
            'label': 'Start Date',
            'name': 'Start Date',
            'placeholder': 'start Date',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'required': true,
            'visible': true,
            'default': '2021-07-20T00:00:00.000Z',
            'validations': [
                {
                    'type': 'minDate',
                    'value': '2021-07-01T00:00:00.000Z',
                    'message': 'Date should not be less than 01-07-2021'
                },
                {
                    'type': 'maxDate',
                    'value':'2022-01-01T00:00:00.000Z',
                    'message': 'Date should be greater than 01-07-2022'
                },
                {
                    'type': 'dateFormat',
                    'value':'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]',
                    'message': 'Date format not matched'
                }
            ]
        },
        {
            'code': 'description',
            'dataType': 'text',
            'description': 'Description of the content',
            'showInfo':true,
            'editable': true,
            'inputType': 'textarea',
            'label': 'Description',
            'name': 'Description',
            'placeholder': 'Description',
            'renderingHints': {
                'class': 'sb-g-col-lg-1'
            },
            'required': false,
            'visible': true,
            'validations': [
                {
                    'type': 'maxLength',
                    'value': '256',
                    'message': 'Input is Exceeded'
                }
            ],
            'default': 'Enter description for Course'
        },
        {
            'code': 'keywords',
            'visible': true,
            'editable': true,
            'showInfo':true,
            'dataType': 'list',
            'name': 'Keywords',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'description': 'Keywords for the content',
            'inputType': 'keywords',
            'label': 'Keywords',
            'placeholder': 'Enter Keywords',
            'required': false,
            'validations': []
        }
    ]
},
{
    'name': 'Second Section',
    'fields': [
        {
            'code': 'dialcodeRequired',
            'dataType': 'text',
            'description': 'QR CODE REQUIRED',
            'showInfo':true,
            'editable': true,
            'default': 'No',
            'index': 5,
            'inputType': 'radio',
            'label': 'QR code required',
            'name': 'dialcodeRequired',
            'placeholder': 'QR code required',
            'renderingHints': {
                'class': 'sb-g-col-lg-1'
            },
            'range': [
                'Yes',
                'No'
            ],
            'required': false,
            'visible': true
        },
        {
            'code': 'dialcodes',
            'depends': [
                'dialcodeRequired'
            ],
            'dataType': 'list',
            'description': 'Digital Infrastructure for Augmented Learning',
            'editable': true,
            'inputType': 'dialcode',
            'label': 'QR code',
            'name': 'dialcode',
            'placeholder': 'Enter code here',
            'renderingHints': {
                'class': 'sb-g-col-lg-1'
            },
            'required': true,
            'visible': true,
            'validations': [
                {
                    'type': 'minLength',
                    'value': '2'
                },
                {
                    'type': 'maxLength',
                    'value': '20'
                }
            ]
        },
         {
            'code': 'instanceLabel',
            'depends': [
            'dialcodeRequired'
            ],
            'dataType': 'text',
            'description': 'Add label',
            'editable': true,
            'inputType': 'text',
            'label': 'Add label',
            'name': 'instanceLabel',
            'placeholder': '',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'required': true,
            'visible': true,
            'validations': [
                {
                    'type': 'maxLength',
                    'value': '120',
                    'message': 'Input is Exceeded'
                },
                {
                    'type': 'required',
                    'message': 'Label is required'
                }
            ],
        },
    ]
},
{
    'name': 'Third Section',
    'fields': [
        {
            'code': 'primaryCategory',
            'dataType': 'list',
            'description': 'Type',
            'showInfo':true,
            'editable': true,
            'renderingHints': {},
            'inputType': 'select',
            'label': 'Category',
            'name': 'Type',
            'placeholder': '',
            'required': true,
            'visible': true,
            'validations': [],
            'default': ['Course'],
            'range': [
                'Course'
            ]
        },
        {
            'code': 'additionalCategories',
            'dataType': 'list',
            'depends': [
                'primaryCategory'
            ],
            'description': 'Additonal Category of the Content',
            'editable': true,
            'inputType': 'nestedselect',
            'label': 'Additional Category',
            'name': 'Additional Category',
            'placeholder': 'Select Additional Category',
            'renderingHints': {},
            'required': false,
            'visible': true,
            'range': [
                'Textbook',
                'Lesson Plan'
            ]
        }
    ]
},
{
    'name': 'Organisation Framework Terms',
    'fields': [
        {
            'code': 'framework',
            'visible': true,
            'editable': true,
            'showInfo':true,
            'dataType': 'text',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'description': 'Course Type',
            'label': 'Course Type',
            'required': true,
            'name': 'Framework',
            'inputType': 'framework',
            'default': 'nit_k-12',
            'placeholder': 'Select Course Type',
            'output': 'identifier',
            'validations': [
                {
                    'type': 'required',
                    'message': 'Course Type is required'
                }
            ],
            'range': [
                {
                    'label': 'nit_k-12',
                    'identifier': 'nit_k-12'
                },
                {
                    'label': 'nit_tpd',
                    'identifier': 'nit_tpd'
                }
            ]
        },
        {
            'code': 'subjectIds',
            'visible': true,
            'editable': true,
            'dataType': 'text',
            'depends': [
                'framework'
            ],
            'sourceCategory': 'subject',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'description': '',
            'default': 'nit_k-12_subject_english',
            'label': 'Subjects covered in the course',
            'required': true,
            'name': 'Subject',
            'inputType': 'frameworkCategorySelect',
            'placeholder': 'Select Subject(s)',
            'output': 'identifier',
            'validations': [
                {
                    'type': 'required',
                    'message': 'Subjects Taught is required'
                }
            ]
        },
        {
            'code': 'topicsIds',
            'visible': true,
            'editable': true,
            'dataType': 'list',
            'showInfo':true,
            'depends': [
                'framework',
                'subjectIds'
            ],
            'sourceCategory': 'topic',
            'renderingHints': {},
            'name': 'Topic',
            'description': 'Choose a Topics',
            'inputType': 'topicselector',
            'label': 'Topics covered in the course',
            'placeholder': 'Choose Topics',
            'required': false,
            'output': 'identifier'
        }
    ]
},
{
    'name': 'Target Framework Terms',
    'fields': [
        {
            'code': 'audience',
            'dataType': 'list',
            'description': 'Audience',
            'showInfo':true,
            'editable': true,
            'inputType': 'nestedselect',
            'renderingHints': {
                'class': 'sb-g-col-lg-1'
            },
            'label': 'Audience Type',
            'name': 'Audience Type',
            'placeholder': 'Select Audience Type',
            'required': false,
            'visible': true,
            'range': [
                'Student',
                'Teacher',
                'Parent',
                'Administrator'
            ],
            'default': [
                'Student'
            ]
        },
        {
            'code': 'targetBoardIds',
            'visible': true,
            'depends': [],
            'editable': true,
            'dataType': 'list',
            'sourceCategory': 'board',
            'output': 'identifier',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'description': 'Board',
            'label': 'Board/Syllabus of the audience',
            'required': true,
            'showInfo':true,
            'name': 'Board/Syllabus',
            'inputType': 'select',
            'placeholder': 'Select Board/Syllabus',
            'validations': [
                {
                    'type': 'required',
                    'message': 'Board is required'
                }
            ],
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
            ]
        },
        {
            'code': 'targetMediumIds',
            'visible': true,
            'depends': [
                'targetBoardIds'
            ],
            'editable': true,
            'dataType': 'list',
            'sourceCategory': 'medium',
            'output': 'identifier',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'description': '',
            'label': 'Medium(s) of the audience',
            'required': true,
            'name': 'Medium',
            'inputType': 'nestedselect',
            'placeholder': 'Select Medium',
            'validations': [
                {
                    'type': 'required',
                    'message': 'Medium is required'
                }
            ],
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
            ]
        },
        {
            'code': 'targetGradeLevelIds',
            'visible': true,
            'depends': [
                'targetBoardIds',
                'targetMediumIds'
            ],
            'editable': true,
            'dataType': 'list',
            'sourceCategory': 'gradeLevel',
            'output': 'identifier',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'description': 'Class',
            'label': 'Class(es) of the audience',
            'required': true,
            'name': 'Class',
            'inputType': 'nestedselect',
            'placeholder': 'Select Class',
            'validations': [
                {
                    'type': 'required',
                    'message': 'Class is required'
                }
            ],
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
            ]
        },
        {
            'code': 'targetSubjectIds',
            'visible': true,
            'depends': [
                'targetBoardIds',
                'targetMediumIds',
                'targetGradeLevelIds'
            ],
            'editable': true,
            'dataType': 'list',
            'sourceCategory': 'subject',
            'output': 'identifier',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'description': '',
            'label': 'Subject(s) of the audience',
            'required': true,
            'name': 'Subject',
            'inputType': 'nestedselect',
            'placeholder': 'Select Subject',
            'validations': [
                {
                    'type': 'required',
                    'message': 'Subject is required'
                }
            ],
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
            ]
        }
    ]
},
{
    'name': 'Sixth Section',
    'fields': [
        {
            'code': 'author',
            'dataType': 'text',
            'description': 'Author of the content',
            'showInfo':true,
            'editable': true,
            'inputType': 'text',
            'label': 'Author',
            'name': 'Author',
            'placeholder': 'Author',
            'renderingHints': {
                'class': 'sb-g-col-lg-1'
            },
            'required': false,
            'visible': true
        },
        {
            'code': 'attributions',
            'dataType': 'text',
            'description': 'Attributions',
            'showInfo':true,
            'editable': true,
            'inputType': 'text',
            'label': 'Attributions',
            'name': 'Attributions',
            'placeholder': 'Attributions',
            'renderingHints': {
                'class': 'sb-g-col-lg-1'
            },
            'required': false,
            'visible': true
        },
        {
            'code': 'copyright',
            'dataType': 'text',
            'description': 'Copyright',
            'showInfo':true,
            'editable': true,
            'inputType': 'text',
            'label': 'Copyright',
            'name': 'Copyright & year',
            'placeholder': 'Copyright',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'required': true,
            'visible': true,
            'validations': [
                {
                    'type': 'required',
                    'message': 'Copyright is required'
                }
            ],
            'default': 'NIT123'
        },
        {
            'code': 'copyrightYear',
            'dataType': 'text',
            'description': 'Year',
            'showInfo':true,
            'editable': true,
            'inputType': 'text',
            'label': 'Copyright Year',
            'name': 'Copyright Year',
            'placeholder': 'Copyright Year',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'required': true,
            'visible': true,
            'validations': [
                {
                    'type': 'required',
                    'message': 'Copyright Year is required'
                }
            ]
        },
        {
            'code': 'license',
            'dataType': 'text',
            'description': 'license',
            'showInfo':true,
            'editable': true,
            'inputType': 'select',
            'label': 'License',
            'name': 'license',
            'placeholder': 'Select License',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'required': true,
            'visible': true,
            'defaultValue': 'CC BY 4.0',
            'validations': [
                {
                    'type': 'required',
                    'message': 'License is required'
                }
            ],
            'default': 'CC BY 4.0',
            'range': [
                '-458552951',
                '-45855295122',
                '6L',
                '@+kp_ft_license_102876130',
                '@+kp_ft_license_132244417',
                '@+kp_ft_license_164164056',
                '@+kp_ft_license_286331732',
                '@+kp_ft_license_498246311',
                '@+kp_ft_license_521144914',
                '@+kp_ft_license_636993495',
                '@+kp_ft_license_672532435',
                '@+kp_ft_license_901890155',
                'CC BY 4.0',
                'CC BY-NC 4.0',
                'CC BY-NC-SA 4.0',
                'CC BY-ND 4.0',
                'CC BY-SA 4.0',
                'CC-BY-ND',
                'dddd',
                'g1ZWJ',
                'H5p content',
                'ILzzW',
                'kp_ft_100191779',
                'kp_ft_100375181',
                'kp_ft_100737426',
                'kp_ft_100905252',
                'kp_ft_102812116',
                'kp_ft_104490138',
                'kp_ft_105561653',
                'kp_ft_106535531',
                'kp_ft_110061100',
                'kp_ft_110129883',
                'kp_ft_110373338',
                'kp_ft_111248116',
                'kp_ft_112181869',
                'kp_ft_112348463',
                'kp_ft_112611587',
                'kp_ft_119364153',
                'kp_ft_119983025',
                'kp_ft_120196901',
                'kp_ft_121031563',
                'kp_ft_122810212',
                'kp_ft_125593226',
                'kp_ft_128971207',
                'kp_ft_129602359',
                'kp_ft_130758550',
                'kp_ft_130867493',
                'kp_ft_131412327',
                'kp_ft_131425817',
                'kp_ft_131696054',
                'kp_ft_131710976',
                'kp_ft_131933204',
                'kp_ft_132826627',
                'kp_ft_132958141',
                'kp_ft_132983874',
                'kp_ft_133298378',
                'kp_ft_134086708',
                'kp_ft_134230027',
                'kp_ft_142669093',
                'kp_ft_143257518',
                'kp_ft_144102734',
                'kp_ft_146726233',
                'kp_ft_146831717',
                'kp_ft_146858574',
                'kp_ft_148225639',
                'kp_ft_148718730',
                'kp_ft_149389903',
                'kp_ft_149479769',
                'kp_ft_150679871',
                'kp_ft_150801989',
                'kp_ft_151255386',
                'kp_ft_151728040',
                'kp_ft_154431274',
                'kp_ft_154878314',
                'KP_FT_154935468',
                'kp_ft_155892624',
                'kp_ft_157224276',
                'kp_ft_158293175',
                'kp_ft_158920797',
                'KP_FT_1591100865142',
                'KP_FT_1591100876934',
                'KP_FT_1591101166392',
                'KP_FT_1591101169139',
                'KP_FT_1591101169537',
                'KP_FT_1591101169937',
                'KP_FT_1591264229320',
                'KP_FT_1591264231006',
                'KP_FT_1591264231502',
                'KP_FT_1591264231837',
                'KP_FT_1591275096702',
                'KP_FT_1591275097981',
                'KP_FT_1591275098134',
                'KP_FT_1591275098310',
                'KP_FT_1591276062479',
                'KP_FT_1591276063946',
                'KP_FT_1591276064201',
                'KP_FT_1591276064365',
                'KP_FT_1591276468206',
                'KP_FT_1591276469489',
                'KP_FT_1591276469748'
            ]
        },
        {
            'code': 'maxTime',
            'visible': true,
            'editable': true,
            'showInfo':true,
            'dataType': 'text',
            'name': 'MaxTimer',
            // 'default': '00:10',
            'renderingHints': {
                'class': 'sb-g-col-lg-1 required'
            },
            'description': 'MaxTime for the content',
            'inputType': 'timer',
            'label': 'Max time',
            'placeholder': 'hh:mm',
            'required': true,
            'validations': [
                {
                    'type': 'required',
                    'message': 'Maxtime is required'
                },
                {
                    'type': 'maxTime',
                    'value': '05:30',
                    'message': 'max time should be less than or equal to 05:30'
                },
                {
                    'type': 'minTime',
                    'value': '00:01',
                    'message': 'max time should not be 00:00'
                }
            ]
        },
        {
            'code': 'warningTime',
            'visible': true,
            'editable': true,
            'showInfo':true,
            'dataType': 'text',
            'name': 'Warning Time',
            'renderingHints': {
                'class': 'sb-g-col-lg-1'
            },
            'depends': [
                'maxTime'
            ],
            'description': 'warning for the content',
            'inputType': 'timer',
            'label': 'Warning Time',
            'placeholder': 'hh:mm',
            'required': false,
            'validations': [
                {
                    'type': 'compare',
                    'criteria': {
                        '<=': [
                            'maxTime'
                        ]
                    },
                    'message': 'warning time should be less than max timer'
                }
            ]
        },
    ]
}
];
