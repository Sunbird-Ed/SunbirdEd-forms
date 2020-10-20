import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sb-pills',
  templateUrl: './pills.component.html',
  styleUrls: ['./pills.component.css']
})
export class PillsComponent implements OnInit {
  @Input() options: any = [];
  @Input() label?: string;
  @Input() styleClass?: string;
  @Output() onChangeFilter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChangeFacet(selectedValue) {
    let emitPayload = JSON.parse(JSON.stringify(this.options));
    emitPayload['data'] = selectedValue;
    emitPayload['selectedLabel'] = selectedValue.label;
    emitPayload['selectedValue'] = selectedValue.value;
    this.onChangeFilter.emit(emitPayload);
  }
}
