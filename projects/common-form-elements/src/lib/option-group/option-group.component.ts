import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'sb-option-group',
  templateUrl: './option-group.component.html',
  styleUrls: ['./option-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
