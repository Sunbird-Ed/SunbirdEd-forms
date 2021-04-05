import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, AfterViewInit } from '@angular/core';
import { Subscription, combineLatest, Subject, merge, from, Observable } from 'rxjs';
import * as _ from 'lodash-es';
import { FormControl , FormGroup} from '@angular/forms';
import { CustomFormControl, CustomFormGroup, DynamicFieldConfigOptionsBuilder,
  FieldConfig, FieldConfigOption } from '../common-form-config';
import { tap, takeUntil } from 'rxjs/operators';

declare var treePicker: any;
declare var $: any;
interface TopicTreeNode {
  id: string;
  name: string;
  selectable: string;
  nodes: Array<TopicTreeNode>;
}
interface JQuery {
  treePicker(options?: any);
}


@Component({
  selector: 'sb-topicpicker',
  templateUrl: './topicpicker.component.html',
  styleUrls: ['./topicpicker.component.css']
})
export class TopicpickerComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() selectedTopics: any;
  @Input() topicPickerClass: string;
  @Input() label: String;
  @Input() disabled?: boolean;
  @Input() placeholder: String;
  @Input() options: any;
  @Input() formControlRef: CustomFormControl;
  @Input() field: FieldConfig<String>;
  @Output() topicChange = new EventEmitter();
  @Input() validations?: any;
  @Input() formGroup?: CustomFormGroup;
  @Input() default?: any;

  @Input() depends?: FormControl[];
  @Input() dataLoadStatusDelegate: Subject<'LOADING' | 'LOADED'>;
  @Input() dependencyTerms?: any = [];
  public selectedNodes: any;
  public placeHolder: string;

  public isDependsInvalid: any = false;
  private dispose$ = new Subject<undefined>();
  options$?: Observable<FieldConfigOption<any>[]>;
  latestParentValue: string;
  tempAssociation: any;
  isDynamicDependencyTerms: any;
  isDependsTouched: any;

  constructor() { }

  ngOnInit() {
    this.handleSelfChange();
    if (!_.isEmpty(this.depends)) {
      this.checkForCustomEventHandler();
     this.handleDependantFieldChanges();
     this.checkIfDependsHasDefault();
    }

    this.handleClosureOption();

     this.setDefaultValue();
  }

  checkIfDependsHasDefault() {
    this.checkIfDependsIsInvalid();
    this.checkIfDependsIsTouched();
    this.generateDependencyTerms();
    this.initTopicPicker(this.formatTopics(this.fetchDependencyTerms()));
  }

  handleSelfChange() {
    this.formControlRef.valueChanges.pipe(
      tap(val => val),
      takeUntil(this.dispose$)
    ).subscribe();
  }

  handleDependantFieldChanges() {
    merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
      tap((value: any) => {
        this.formControlRef.patchValue(null);
        this.latestParentValue = value;
        this.checkIfDependsIsInvalid();
        this.checkIfDependsIsTouched();
        this.generateDependencyTerms();
        this.placeHolder = '';
        this.default = [];
        this.selectedNodes = {};
       if (!_.isEmpty(this.isDynamicDependencyTerms)) {
         this.initTopicPicker(this.formatTopics(this.fetchDependencyTerms()));
       } else {
         this.initTopicPicker(this.formatTopics(this.fetchDependencyTerms()));
       }
      }),
      takeUntil(this.dispose$)
      ).subscribe();

      this.checkIfDependsIsInvalid();
  }

  handleClosureOption() {
    if (this.isOptionsClosure(this.options)) {
      // tslint:disable-next-line:max-line-length
      this.options$ = (this.options as DynamicFieldConfigOptionsBuilder<any>)(this.formControlRef, this.depends, this.formGroup, () => this.dataLoadStatusDelegate.next('LOADING'), () => this.dataLoadStatusDelegate.next('LOADED')) as any;

      this.options$.subscribe(
        (response) => {
          this.checkIfDependsIsInvalid();
          this.dependencyTerms = response;
        },
      );
    }
  }

  checkForCustomEventHandler() {
    merge(..._.compact(_.map(this.depends, depend => depend.customEventHandler$))).pipe(
      takeUntil(this.dispose$)
      ).subscribe(
        (response) => {
          if (response === true) {
            this.checkIfDependsHasDefault();
            this.setDefaultValue();
          }
        }, error => {
          console.log(error);
        }
      );
  }

  checkIfDependsIsInvalid() {
    this.isDependsInvalid = _.every(_.map(this.depends, depend => depend.invalid), true);
    return this.isDependsInvalid;
  }

  checkIfDependsIsTouched() {
    this.isDependsTouched = _.every(_.map(this.depends, depend => depend.touched), false);
    return this.isDependsTouched;
  }

  generateDependencyTerms() {
    this.isDynamicDependencyTerms = _.compact(_.flatten(_.map(this.depends, depend => {
      return depend.termsForDependantFields;
    })));
  }

  setDefaultValue() {
    const selectedTopics = _.reduce(this.default, (collector, element) => {
      if (typeof element === 'string') {
        collector.unformatted.push(element);
      } else if (_.get(element, 'identifier')) {
        collector.formatted.push(element);
      }
      return collector;
    }, { formatted: [], unformatted: [] });

    this.formatSelectedTopics(this.field.terms, selectedTopics.unformatted, selectedTopics.formatted);
    this.default = selectedTopics.unformatted;
    this.selectedNodes = { ...selectedTopics.formatted };
    this.topicChange.emit(this.selectedTopics);

    if (!_.isEmpty(this.default) && this.isDefaultExistsInTerms()) {
      this.placeHolder = this.getPlaceHolder();
    } else if (!_.isEmpty(this.default)) {
      this.placeHolder = this.getPlaceHolder();
      this.formControlRef.setValue(this.default);
    }

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
      this.initTopicPicker(this.formatTopics(this.field.terms || this.tempAssociation || []));
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }

  private formatTopics(topics): Array<TopicTreeNode> {
    return _.map(topics, (topic) => ({
      id: topic.identifier,
      name: topic.name,
      selectable: 'selectable',
      nodes: this.formatTopics(topic.children)
    }));
  }

  private formatSelectedTopics(topics, unformatted, formatted) {
    _.forEach(topics, (topic) => {
      if (unformatted.includes(this.field.output ? topic[this.field.output] : topic.name) && !topic.children) {
        formatted.push({
          identifier: topic.identifier,
          name: topic.name
        });
      }
      if (topic.children) {
        this.formatSelectedTopics(topic.children, unformatted, formatted);
      }
    });
  }

  private initTopicPicker(data: Array<TopicTreeNode>) {
      $(`#treePicker_${this.field.code}`).treePicker({
        data: data,
        name: 'Topics',
        noDataMessage: 'noDataMessage',
        submitButtonText: 'Done',
        cancelButtonText: 'Cancel',
        removeAllText: 'Remove All',
        chooseAllText: 'Choose All',
        searchText: 'Search',
        selectedText: 'selected',
        picked: (!_.isEmpty(this.selectedNodes)) ? _.map(this.selectedNodes, 'identifier') : (!_.isEmpty(this.default) ? this.default : []),
        onSubmit: (selectedNodes) => {
          this.selectedNodes = selectedNodes;
          this.selectedTopics = _.map(selectedNodes, node => ({
            identifier: node.id,
            name: node.name
          }));
          this.placeHolder = this.getPlaceHolder();
          this.topicChange.emit(this.selectedTopics);
          const topics = [];
          _.forEach(this.selectedTopics, (value, index) => {
            if (this.field.output) {
             topics.push(value[this.field.output]);
            } else {
              topics.push(value.name);
            }
          });
          this.formControlRef.setValue(topics);
        },
        nodeName: `topicSelector_${this.field.code}`,
        displayFormat: function(picked) { return this.placeHolder; } ,
        minSearchQueryLength: 1,
        disabled: (node)  => {
          return this.disabled ? true : ( this.depends ? (this.isDependsInvalid ? true : false) : false );
        }
      });
      setTimeout(() => document.getElementById(`topicSelector_${this.field.code}`).classList.add(`topicSelector_${this.field.code}`), 0);
  }

  getPlaceHolder() {
    if (!_.isEmpty(this.selectedTopics)) {
      return this.selectedTopics.length + ' topics selected';
    } else if (!_.isEmpty(this.selectedNodes)) {
      const selectedNodesIdentifiers =  _.map(this.selectedNodes, 'identifier');
      return selectedNodesIdentifiers.length + ' topics selected';
    } else if (!_.isEmpty(this.default)) {
      return this.default.length + ' topics selected';
    }
  }

  fetchAssociations() {
    // && this.context.value && this.field.association
    if (!_.isEmpty(this.depends)) {
      const filteredTerm = _.find(this.dependencyTerms, terms => {
        return !_.isEmpty(this.field.output) ? _.includes(this.getParentValue(), terms[this.field.output]) : _.includes(this.getParentValue(), terms.name) ;
      });
      if (filteredTerm) {
        this.tempAssociation =  _.filter(filteredTerm.associations, association => {
          return (this.field.sourceCategory) ? (association.category === this.field.sourceCategory) : association.category === this.field.code;
        });
        return this.tempAssociation;
      } else  {
        return this.field.terms;
      }
    } else {
      return this.field.terms;
    }
  }

  fetchDependencyTerms() { // subject
    if (!_.isEmpty(this.isDynamicDependencyTerms)) {
      const filteredTerm = this.getTermsByValue(this.isDynamicDependencyTerms, this.getParentValue(), true);
      if (!_.isEmpty(filteredTerm)) {
        const consolidatedAssociations = [];
        _.forEach(filteredTerm, item => {
            let tempAssociations: any;
            let lookUp: string;
            if (item.categories) {
              tempAssociations = item.categories;
              lookUp = 'code';
            } else if (item.terms) {
              tempAssociations = item.terms;
              lookUp = 'category';
            } else if (item.associations) {
              tempAssociations = item.associations;
              lookUp = 'category';
            }
            const filteredCategory = _.filter(tempAssociations, association => {
              return (this.field.sourceCategory) ? (association[lookUp] === this.field.sourceCategory) :
              association[lookUp] === this.field.code;
            });
            consolidatedAssociations.push(...this.extractAndFlattenTerms(filteredCategory));
        });
        this.tempAssociation = _.uniqBy(consolidatedAssociations, 'identifier');
        return this.tempAssociation;
      }

    }
  }

  getParentValue() {
    return !_.isEmpty(this.latestParentValue) && this.latestParentValue ||
    !_.isEmpty(this.formGroup.lastChangedField) &&
    !_.isEmpty(this.formGroup.lastChangedField.value) &&
    this.formGroup.lastChangedField.value ||
    _.castArray(_.last(_.compact(_.flatten((_.map(this.depends, 'value'))))));
  }

  getTermsByValue(categories, value,  doFlatten?) {
    let array = categories;
    if (doFlatten) {
      array = _.flatten(categories);
    }
    if (!_.isEmpty(array)) {
      const filteredTerms = _.filter(array, terms => {
        return !_.isEmpty(this.field.output) ?
        _.includes(value, terms[this.field.output]) :
        _.includes(value, terms.name) ;
      });
      return filteredTerms || [];
    }
  }

  isOptionsClosure(options: any) {
    return typeof options === 'function';
  }

  extractAndFlattenTerms(categories) {
    return _.flatten(_.map(categories, category => {
      if (_.has(category, 'terms')) {
        return category.terms;
      } else if (_.has(category, 'association')) {
        return category.associations;
      } else if (_.has(category, 'categories')) {
        return category.categories;
      } else {
        return category;
      }
    }));
  }

  isDefaultExistsInTerms() {
    if (!this.formControlRef.touched && !_.isEmpty(this.tempAssociation && this.default)) {
      return _.find(this.tempAssociation, association => {
        return !_.isEmpty(this.field.output) ?
        _.includes(this.default, association[this.field.output]) :
        _.includes(this.default, association.name);
      });
    }
    return false;
  }

}
