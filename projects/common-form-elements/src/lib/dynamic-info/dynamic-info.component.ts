import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sb-dynamic-info',
  templateUrl: './dynamic-info.component.html',
  styleUrls: ['./dynamic-info.component.css']
})
export class DynamicInfoComponent implements OnInit {
  @Input() data?: any;
  constructor() { }

  ngOnInit() {
  }

}
