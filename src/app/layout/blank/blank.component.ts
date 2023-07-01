import { Component } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'layout-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.less'],
})
export class BlankComponent {
  constructor(public layoutService: LayoutService) {}
}
