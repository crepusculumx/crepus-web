import { Component } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
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

  //ExpressionChangedAfterItHasBeenCheckedError
  //如果子组件构造时立刻通知修改menus，则会出现在变更检测中子组件更改父组件的情形
  //通过delay(0)延迟到下一个周期变更检测周期
  public menus$: Observable<Menus> = this.menuService.menus$.pipe(delay(0));
}
