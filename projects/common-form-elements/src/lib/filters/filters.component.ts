import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { FilterType } from '../common-form-config';

@Component({
  selector: 'sb-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Input() type: string;
  @Input() facets: any = [];
  @Input() config?: object;
  @Input() styleClass?: string;
  @Output() selectedFilter: EventEmitter<any> = new EventEmitter();
  FilterType = FilterType;
  formGroup: FormGroup;

  formattedFacets: any = [];

  constructor() {
  }

  ngOnInit() {
    this.formatFacets();
  }

  formatFacets () {
    this.facets.forEach((facet, index) => {
      let facetObj = {};
      facetObj['name']        = facet['name'];
      facetObj['type']        = this.config[facet['name']] && this.config[facet['name']]['type'] ? this.config[facet['name']]['type'] : 'dropdown';
      facetObj['index']       = this.config[facet['name']] && this.config[facet['name']]['index'] ? this.config[facet['name']]['index'] : index;
      facetObj['label']       = this.config[facet['name']] && this.config[facet['name']]['label'] ? this.config[facet['name']]['label'] : facet['name'];
      facetObj['placeHolder'] = this.config[facet['name']] && this.config[facet['name']]['placeHolder'] ? this.config[facet['name']]['placeHolder'] : 'Select ' + facet['name'];

      facetObj['default']     = this.config[facet['name']] && this.config[facet['name']]['default'] ? this.config[facet['name']]['default'] : '';
      
      facetObj['data'] = [];
      facet['values'].forEach(facetValue => {
        facetObj['data'].push({
          label: facetValue['name'],
          value: facetValue['name']
        });
      });
      this.formattedFacets.push(facetObj);
      this.formattedFacets.sort((a, b) => a.index - b.index);
    });
  }
}
