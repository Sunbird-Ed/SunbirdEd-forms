import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, AfterViewInit } from '@angular/core';
import { Subscription, combineLatest, Subject, merge, from } from 'rxjs';
import * as _ from 'lodash-es';
import { FormControl , FormGroup} from '@angular/forms';
import { FieldConfig } from '../common-form-config';
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
  @Input() formControlRef: FormControl;
  @Input() field: FieldConfig<String>;
  @Output() topicChange = new EventEmitter();
  @Input() validations?: any;
  @Input() formGroup?: FormGroup;
  @Input() default?: any;

  @Input() depends?: FormControl[];
  @Input() dependencyTerms?: any = [];
  public selectedNodes: any;
  public placeHolder: string;

  public isDependsInvalid: any;
  private dispose$ = new Subject<undefined>();
  latestParentValue: string;
  tempAssociation: any;

  constructor() { }

  ngOnInit() {

    this.formControlRef.valueChanges.pipe(
      tap(val => {
        console.log(val);
      }),
      takeUntil(this.dispose$)
    ).subscribe();
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




    if (!_.isEmpty(this.default)) {
      this.placeHolder = this.default &&  this.default.length + ' topics selected';
      this.formControlRef.setValue(this.default);
    }


    if (!_.isEmpty(this.depends)) {
      merge(..._.map(this.depends, depend => depend.valueChanges)).pipe(
       tap((value: any) => {
         this.latestParentValue = value;
         this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
         this.formControlRef.patchValue(null);
         this.placeHolder = '';
         this.default = [];
         this.selectedNodes = {};
         this.initTopicPicker(this.formatTopics(this.fetchAssociations()));
       }),
       takeUntil(this.dispose$)
       ).subscribe();

       this.isDependsInvalid = _.includes(_.map(this.depends, depend => depend.invalid), true);
     }

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.initTopicPicker(this.formatTopics(this.field.terms));

  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }

  private formatTopics(topics, subTopic = false): Array<TopicTreeNode> {
    return _.map(topics, (topic) => ({
      id: topic.identifier,
      name: topic.name,
      selectable: subTopic ? 'selectable' : 'notselectable',
      nodes: this.formatTopics(topic.children, true)
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
      $(`.topic-picker-selector_${this.field.code}`).treePicker({
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
          this.placeHolder = this.selectedTopics.length + ' topics selected';
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
          return this.disabled ? true : ( this.depends ? (this.isDependsInvalid ? true : false) : false )
        }
      });
      setTimeout(() => document.getElementById(`topicSelector_${this.field.code}`).classList.add(this.topicPickerClass), 0);
  }

  fetchAssociations() {
    // && this.context.value && this.field.association
    if (!_.isEmpty(this.depends)) {
      const filteredTerm = _.find(this.dependencyTerms, terms => {
        return !_.isEmpty(this.field.output) ? _.includes(this.getParentValue(), terms[this.field.output]) :
         _.includes(this.getParentValue(), terms.name) ;
      });
      if (filteredTerm) {
        this.tempAssociation =  _.filter(filteredTerm.associations, association => {
          return (this.field.sourceCategory) ? (association.category === this.field.sourceCategory) :
           association.category === this.field.code;
        });
        return this.tempAssociation;
      } else  {
        return this.field.terms;
      }
    } else {
      return this.field.terms;
    }
  }

  getParentValue() {
    return this.latestParentValue || _.compact(_.map(this.depends, 'value'));
  }

}
