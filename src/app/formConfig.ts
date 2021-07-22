export const timer = [
    {
        'name': 'Dialcode Section',
        'fields': [
            {
                'code': 'dialcodeRequired',
                'dataType': 'text',
                'description': 'QR CODE REQUIRED',
                'editable': true,
                'default': 'No',
                'index': 5,
                'inputType': 'radio',
                'label': 'QR CODE REQUIRED',
                'name': 'dialcodeRequired',
                'placeholder': 'QR CODE REQUIRED',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'range': ['Yes', 'No'],
                'required': false,
                'visible': true
            },
            {
                'code': 'dialcodes',
                'depends': ['dialcodeRequired'],
                'dataType': 'list',
                'description': 'QR CODES',
                'editable': true,
                'inputType': 'dialcode',
                'label': 'QR CODES',
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
                        'value': '2',
                    },
                    {
                        'type': 'maxLength',
                        'value': '20',
                    }
                ],
            }
        ]
    },
    {
        'name': '',
        'fields': [
            {
                'code': 'instructions',
                'dataType': 'text',
                'description': 'Instructions for the question set',
                'editable': true,
                'inputType': 'richtext',
                'label': 'Instructions',
                'name': 'Instruction',
                'placeholder': 'Enter Instructions',
                'renderingHints': {
                    'class': 'sb-g-col-lg-2 required'
                },
                'validations': [
                    {
                        'type': 'maxLength',
                        'value': '500',
                        'message': 'Input is Exceeded'
                    },
                    {
                        'type': 'required',
                        'message': 'Instruction is required'
                    }
                ],
                'required': true,
                'visible': true,
                'default': '<p>Chapter 1:&nbsp;<i><strong>माता का अँचल</strong></i></p><p>Chapter 2:&nbsp;<i><strong>जॉर्ज पंचम की नाक</strong></i></p><p>Chapter 3:&nbsp;<i><strong>साना – साना हाथ जोड़ि</strong></i></p><p>Chapter 4:&nbsp;<i><strong>एही ठैयाँ झुलनी हेरानी हो रामा!</strong></i></p><p>Chapter 5:&nbsp;<i><strong>मैं क्यों लिखता हूँ?</strong></i></p><p>Chapter 6:<i><strong>&nbsp;लेखक परिचय</strong></i></p><p>Chapter 7:<i><strong>&nbsp;लेखक परिचय</strong></i></p>'
            },
            {
                'code': 'name',
                'dataType': 'text',
                'description': 'Name of the QuestionSet',
                'editable': true,
                'inputType': 'text',
                'label': 'Name',
                'name': 'Name',
                'placeholder': 'Name',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1 required'
                },
                'required': true,
                'visible': true,
                'validations': [
                    {
                        'type': 'max',
                        'value': '120',
                        'message': 'Input is Exceeded'
                    },
                    {
                        'type': 'required',
                        'message': 'Name is required'
                    }
                ],
                'default': 'NCERT Solutions new'
            },
            {
                'code': 'description',
                'dataType': 'text',
                'description': 'Description of the content',
                'editable': true,
                'inputType': 'textarea',
                'label': 'Description',
                'name': 'Description',
                'placeholder': 'Description',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1 required'
                },
                'required': true,
                'visible': true,
                'validations': [
                    {
                        'type': 'required',
                        'message': 'description is required'
                    }
                ],
                'default': 'Hello'
            },
            {
                'code': 'keywords',
                'visible': true,
                'editable': true,
                'dataType': 'list',
                'name': 'Keywords',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1 required'
                },
                'description': 'Keywords for the content',
                'inputType': 'keywords',
                'label': 'keywords',
                'placeholder': 'Enter Keywords',
                'required': true,
                'validations': [
                    {
                        'type': 'required',
                        'message': 'keywords is required'
                    }
                ],
                'default': [
                    'test'
                ]
            },
            {
                'code': 'primaryCategory',
                'dataType': 'text',
                'description': 'Type',
                'editable': false,
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'inputType': 'text',
                'label': 'Type',
                'name': 'Type',
                'placeholder': '',
                'required': false,
                'visible': true,
                'default': 'Practice Question Set',
                'range': [
                    'Practice Question Set'
                ]
            },
            {
                'code': 'additionalCategories',
                'dataType': 'list',
                'description': 'Additonal Category of the Content',
                'editable': true,
                'inputType': 'nestedselect',
                'label': 'Additional Category',
                'name': 'Additional Category',
                'placeholder': 'Select Additional Category',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'default': [
                    'Classroom Teaching Video'
                ],
                'required': false,
                'visible': true,
                'range': [
                    'Classroom Teaching Video',
                    'வரவேற்பு',
                    '1',
                    1,
                    10,
                    'स्वागत हे',
                    'Concept Map',
                    'Curiosity Question Set',
                    'Experiential Resource',
                    'Explanation Video',
                    'Focus Spot',
                    'Learning Outcome Definition',
                    'Lesson Plan',
                    'Marking Scheme Rubric',
                    'Pedagogy Flow',
                    'Previous Board Exam Papers',
                    'TV Lesson',
                    'Textbook'
                ]
            },
            {
                'code': 'audience',
                'dataType': 'list',
                'description': 'Audience',
                'editable': true,
                'inputType': 'select',
                'label': 'Audience',
                'name': 'Audience',
                'placeholder': 'Select Audience',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1 required'
                },
                'required': true,
                'visible': true,
                'range': [
                    'Student',
                    'Teacher',
                    'Administrator'
                ],
                'validations': [
                    {
                        'type': 'required',
                        'message': 'Audience is required'
                    }
                ],
                'default': [
                    'Student'
                ]
            },
            {
                'code': 'showFeedback',
                'dataType': 'text',
                'description': 'Show Feedback',
                'editable': true,
                'default': 'Yes',
                'inputType': 'checkbox',
                'label': 'Show Feedback',
                'name': 'showFeedback',
                'placeholder': 'Show Feedback',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'required': false,
                'visible': true
            },
            {
                'code': 'shuffle',
                'dataType': 'boolean',
                'description': 'Shuffle Questions',
                'editable': true,
                'default': true,
                'inputType': 'checkbox',
                'label': 'Shuffle Questions',
                'name': 'Shuffle Questions',
                'placeholder': 'Shuffle Questions',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'required': false,
                'visible': true
            },
            {
                'code': 'maxAttempts',
                'visible': true,
                'editable': true,
                'dataType': 'number',
                'name': 'Max Attempts',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'description': 'Max Attempts',
                'inputType': 'select',
                'label': 'Max Attempts',
                'placeholder': 'Max Attempts',
                'required': false,
                'range': [
                    1,
                    2,
                    3,
                    4,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25
                ],
                'default': 15
            },
            {
                'code': 'maxTime',
                'visible': true,
                'editable': true,
                'dataType': 'text',
                'name': 'MaxTimer',
                'default': '00:00:00',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1 required'
                },
                'description': 'MaxTime for the content',
                'inputType': 'timer',
                'label': 'Max time',
                'placeholder': 'HH:mm:ss',
                'required': true,
                'validations': [
                    {
                        'type': 'required',
                        'message': 'Maxtime is required'
                    },
                    {
                        'type': 'time',
                        'message': 'Please enter in hh:mm:ss',
                        'value': 'HH:mm:ss'
                    },
                    {
                        'type': 'max',
                        'value': '05:59:59',
                        'message': 'max time should be less than 05:59:59'
                    }
                ]
            },
            {
                'code': 'warningTime',
                'visible': true,
                'editable': true,
                'dataType': 'list',
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
                'placeholder': 'hh:mm:ss',
                'required': false,
                'validations': [
                    {
                        'type': 'time',
                        'message': 'Please enter hh:mm:ss',
                        'value': 'HH:mm:ss'
                    },
                    {
                        'type': 'compare',
                        'criteria': {
                            '<=': [
                                'maxTime'
                            ]
                        },
                        'message': 'warning time should be less than max timer'
                    }
                ],
                'default': null
            },
            {
                'code': 'requiresSubmit',
                'visible': true,
                'editable': true,
                'dataType': 'text',
                'name': 'Submit Confirmation',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'description': 'Submit Confirmation',
                'inputType': 'checkbox',
                'label': 'Submit Confirmation',
                'placeholder': 'Submit Confirmation',
                'required': false,
                'default': 'Yes'
            },
            {
                'code': 'maxQuestions',
                'dataType': 'number',
                'description': 'Show Questions',
                'editable': true,
                'inputType': 'select',
                'label': 'Show Questions',
                'name': 'maxQuestions',
                'placeholder': 'Number of questions to be shown',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'required': false,
                'visible': true,
                'default': 2,
                'range': [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8
                ]
            },
            {
                'code': 'author',
                'dataType': 'text',
                'description': 'Author of the content',
                'editable': true,
                'inputType': 'text',
                'label': 'Author',
                'name': 'Author',
                'placeholder': 'Author',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1 required'
                },
                'required': true,
                'visible': true,
                'validations': [
                    {
                        'type': 'required',
                        'message': 'Author is required'
                    }
                ],
                'default': 'Test'
            },
            {
                'code': 'attributions',
                'dataType': 'text',
                'description': 'Attributions',
                'editable': true,
                'inputType': 'text',
                'label': 'Attributions',
                'name': 'Attributions',
                'placeholder': 'Attributions',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'required': false,
                'visible': true,
                'default': null
            },
            {
                'code': 'copyright',
                'dataType': 'text',
                'description': 'Copyright & year',
                'editable': true,
                'inputType': 'text',
                'label': 'Copyright & year',
                'name': 'Copyright & year',
                'placeholder': 'Copyright & year',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'required': false,
                'visible': true,
                'default': 'NIT123'
            },
            {
                'code': 'license',
                'dataType': 'text',
                'description': 'license',
                'editable': true,
                'inputType': 'select',
                'label': 'license',
                'name': 'license',
                'placeholder': 'Select license',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'required': false,
                'visible': true,
                'range': [],
                'default': 'CC BY 4.0'
            },
            {
                'code': 'showTimer',
                'visible': false,
                'editable': false,
                'dataType': 'text',
                'default': 'Yes',
                'depends': [
                    'maxTime'
                ],
                'name': 'Show Timer',
                'renderingHints': {
                    'class': 'sb-g-col-lg-1'
                },
                'description': 'Show Timer',
                'inputType': 'checkbox',
                'label': 'Show Timer',
                'placeholder': 'Show Timer',
                'required': false
            },
            {
                'code': 'startdate',
                'visible': true,
                'editable': true,
                'dataType': 'date',
                'default': 'dd:mm:yyyy',
                'name': 'start date',
                'description': 'start date',
                'inputType': 'date',
                'label': 'start date',
                'placeholder': 'start date',
                'required': true,
                'validations': [
                    {
                        'type': 'required',
                        'message': 'Start Date is required'
                    }
                ],
            },
            {
                'code': 'enddate',
                'visible': true,
                'editable': true,
                'dataType': 'date',
                'default': 'dd:mm:yyyy',
                'depends': [
                    'startdate'
                ],
                'name': 'end date',
                'description': 'end date',
                'inputType': 'date',
                'label': 'end date',
                'placeholder': 'end date',
                'required': true,
                'validations': [
                    {
                        'type': 'required',
                        'message': 'End Date is required'
                    },
                    {
                        'type': 'compare',
                        'criteria': {
                            '<=': [
                                'startTime'
                            ]
                        },
                        'message': 'warning date should be greater than start date'
                    }
                ]
            },
            {
                'code': 'starttime',
                'visible': true,
                'editable': true,
                'dataType': 'time',
                // 'depends': [
                //     'maxTime'
                // ],
                'name': 'start time',
                // 'renderingHints': {
                //     'class': 'sb-g-col-lg-1'
                // },
                'description': 'start time',
                'inputType': 'time',
                'label': 'start time',
                'placeholder': 'start time',
                'required': true,
                'validations': [
                    {
                        'type': 'required',
                        'message': 'Start Time is required'
                    }
                ]
            },
            {
                'code': 'endtime',
                'visible': true,
                'editable': true,
                'dataType': 'time',
                'default': 'hh:mm:ss',
                'depends': [
                    'starttime'
                ],
                'name': 'end time',
                // 'renderingHints': {
                //     'class': 'sb-g-col-lg-1'
                // },
                'description': 'end time',
                'inputType': 'time',
                'label': 'end time',
                'placeholder': 'end time',
                'required': true,
                'validations': [
                    {
                        'type': 'required',
                        'message': 'End Time is required'
                    }
                ]
            },
            
        ]
    }
];
