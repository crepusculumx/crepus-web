import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../services/layout.service';
import { Menus, MenusService } from '../services/menus.service';

@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less'],
})
export class BasicComponent {
  constructor(
    public themeService: ThemeService,
    public layoutService: LayoutService,
    public menuService: MenusService
  ) {
    menuService.menus$.subscribe((_) => {
      console.log(_);
    });
  }

  public isCollapsed$ = new BehaviorSubject<boolean>(false);

  public menus$: BehaviorSubject<Menus> = this.menuService.menus$;
}
