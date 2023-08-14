import { Component, Input } from '@angular/core';

import { Menus } from '../../../interfaces/menu';

@Component({
  selector: 'layout-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.less'],
})
export class MenusComponent {
  @Input() menus: Menus = [];
}
