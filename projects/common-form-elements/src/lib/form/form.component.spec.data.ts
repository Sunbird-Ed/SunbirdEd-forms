export const FieldConfig = {
    configData: [
        {
            'code': 'category',
            'type': 'nested_select',
            'templateOptions': {
                'placeHolder': 'Select Category',
                'multiple': false,
                'hidden': false,
                'options': [
                    {
                        'value': 'content',
                        'label': 'Content'
                    },
                    {
                        'value': 'loginRegistraction',
                        'label': 'Login/Registration'
                    },
                    {
                        'value': 'teacherTraining',
                        'label': 'Teacher Training'
                    },
                    {
                        'value': 'otherissues',
                        'label': 'Other Issues',
                        'dataSrc': {
                            'action': 'initiateEmail'
                        }
                    }
                ]
            },
            'validations': [
                {
                    'type': 'required'
                }
            ],
            'children': {
                'otherissues': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'subject',
                        'type': 'nested_select',
                        'context': 'grade',
                        'templateOptions': {
                            'placeHolder': 'Select Subject',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'subject'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ]
            }
        },
        {
            'code': 'subcategory',
            'context': 'category',
            'type': 'nested_select',
            'children': {
                'contentquality': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'subject',
                        'type': 'nested_select',
                        'context': 'grade',
                        'templateOptions': {
                            'placeHolder': 'Select Subject',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'subject'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'contentname',
                        'type': 'input',
                        'context': null,
                        'templateOptions': {
                            'placeHolder': 'Enter Content Name'
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ],
                'contentnotplaying': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'subject',
                        'type': 'nested_select',
                        'context': 'grade',
                        'templateOptions': {
                            'placeHolder': 'Select Subject',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'subject'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'contentname',
                        'type': 'input',
                        'context': null,
                        'templateOptions': {
                            'placeHolder': 'Enter Content Name'
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ],
                'contentavailability': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    },
                    {
                        'code': 'notify',
                        'default': false,
                        'templateOptions': {
                            label: 'Notify me on availability'
                        },
                        'validations': [
                            {
                            }
                        ]
                    }
                ],
                'contentotherissues': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'subject',
                        'type': 'nested_select',
                        'context': 'grade',
                        'templateOptions': {
                            'placeHolder': 'Select Subject',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'subject'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'contentname',
                        'type': 'input',
                        'context': null,
                        'templateOptions': {
                            'placeHolder': 'Enter Content Name'
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ],
                'otpissue': [
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ],
                'profilevalidation': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'subject',
                        'type': 'nested_select',
                        'context': 'grade',
                        'templateOptions': {
                            'placeHolder': 'Select Subject',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'subject'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ],
                'profiledetails': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'subject',
                        'type': 'nested_select',
                        'context': 'grade',
                        'templateOptions': {
                            'placeHolder': 'Select Subject',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'subject'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ],
                'certificate': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'subject',
                        'type': 'nested_select',
                        'context': 'grade',
                        'templateOptions': {
                            'placeHolder': 'Select Subject',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'subject'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ],
                'teacherid': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'subject',
                        'type': 'nested_select',
                        'context': 'grade',
                        'templateOptions': {
                            'placeHolder': 'Select Subject',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'subject'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ],
                'profileotherissues': [
                    {
                        'code': 'board',
                        'type': 'select',
                        'templateOptions': {
                            'placeHolder': 'Select Baord',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'ACTIVE_CHANNEL.SUGGESTED_FRAMEWORK_LIST.MAPPED_TO_FRAMEWORKCATEGORIES'
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'medium',
                        'type': 'nested_select',
                        'context': 'board',
                        'default': null,
                        'templateOptions': {
                            'placeHolder': 'Select Medium',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'medium'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'grade',
                        'type': 'nested_select',
                        'context': 'medium',
                        'templateOptions': {
                            'placeHolder': 'Select Grade',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'grade'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'subject',
                        'type': 'nested_select',
                        'context': 'grade',
                        'templateOptions': {
                            'placeHolder': 'Select Subject',
                            'multiple': false,
                            'dataSrc': {
                                'marker': 'FRAMEWORK_CATEGORY_TERMS',
                                'params': {
                                    'categoryCode': 'subject'
                                }
                            }
                        },
                        'validations': [
                            {
                                'type': 'required'
                            }
                        ]
                    },
                    {
                        'code': 'details',
                        'type': 'textarea',
                        'context': null,
                        'templateOptions': {
                            'label': 'Tell us more about the problem you faced',
                            'placeHolder': 'Enter Details'
                        },
                        'validations': [
                            {
                                'type': 'maxLength',
                                'value': 1000
                            }
                        ]
                    }
                ]
            },
            'templateOptions': {
                'placeHolder': 'Select Subcategory',
                'multiple': false,
                'hidden': false,
                'options': {
                    'loginRegistraction': [
                        {
                            'value': 'otpissue',
                            'label': 'OTP Issue',
                            'dataSrc': {
                                'action': 'initiateEmail'
                            }
                        },
                        {
                            'value': 'profilevalidation',
                            'label': 'Profile validation/No green tick on my profile',
                            'dataSrc': {
                                'action': 'contactBoard'
                            }
                        },
                        {
                            'value': 'profiledetails',
                            'label': 'Profile details incorrect',
                            'dataSrc': {
                                'action': 'contactBoard'
                            }
                        },
                        {
                            'value': 'certificate',
                            'label': 'Certificate related',
                            'dataSrc': {
                                'action': 'contactBoard'
                            }
                        },
                        {
                            'value': 'teacherid',
                            'label': 'Teacher id',
                            'dataSrc': {
                                'action': 'contactBoard'
                            }
                        },
                        {
                            'value': 'profileotherissues',
                            'label': 'Other issues',
                            'dataSrc': {
                                'action': 'contactBoard'
                            }
                        }
                    ],
                    'content': [
                        {
                            'value': 'contentquality',
                            'label': 'Content Quality',
                            'dataSrc': {
                                'action': 'initiateEmail'
                            }
                        },
                        {
                            'value': 'contentnotplaying',
                            'label': 'Content not playing/downloading',
                            'dataSrc': {
                                'action': 'initiateEmail'
                            }
                        },
                        {
                            'value': 'contentavailability',
                            'label': 'Content availability'
                        },
                        {
                            'value': 'contentotherissues',
                            'label': 'Other Issues',
                            'dataSrc': {
                                'action': 'initiateEmail'
                            }
                        }
                    ],
                    'teacherTraining': [
                        {
                            'value': 'profilevalidation',
                            'label': 'Profile validation/No green tick on my profile',
                            'dataSrc': {
                                'action': 'contactBoard'
                            }
                        },
                        {
                            'value': 'profiledetails',
                            'label': 'Profile details incorrect',
                            'dataSrc': {
                                'action': 'contactBoard'
                            }
                        },
                        {
                            'value': 'caertificate',
                            'label': 'Certificate related',
                            'dataSrc': {
                                'action': 'contactBoard'
                            }
                        },
                        {
                            'value': 'otherissues',
                            'label': 'Other issues',
                            'dataSrc': {
                                'action': 'contactBoard'
                            }
                        }
                    ]
                }
            },
            'validations': [
                {
                    'type': 'required'
                }
            ]
        }
    ]
};
