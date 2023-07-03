import { Component, Input, OnInit } from '@angular/core';
import { Menus } from '../../../services/menus.service';

@Component({
  selector: 'layout-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.less'],
})
export class MenusComponent implements OnInit {
  @Input() menus: Menus = [];

  ngOnInit(): void {
    console.log(this.menus);
  }
}
