import { Component, Input } from '@angular/core';
import { Menus } from '../../../services/menus.service';

@Component({
  selector: 'layout-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.less'],
})
export class MenusComponent {
  @Input() menus: Menus = [];
}
