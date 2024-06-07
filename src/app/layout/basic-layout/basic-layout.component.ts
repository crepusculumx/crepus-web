import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenusComponent } from './widgets/menus/menus.component';
import { ThemeService } from '../../services/theme.service';
import { MenusService } from '../services/menus.service';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Menus } from '../interfaces/menu';
import { UserHeaderComponent } from './widgets/user-header/user-header.component';
import { NzResizableModule, NzResizeEvent } from 'ng-zorro-antd/resizable';
@Component({
  selector: 'app-basic-layout',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzIconModule,
    RouterOutlet,
    MenusComponent,
    RouterLink,
    UserHeaderComponent,
    NgOptimizedImage,
    NzResizableModule,
  ],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.less',
})
export class BasicLayoutComponent {
  constructor(
    public themeService: ThemeService,
    public menuService: MenusService,
  ) {}

  public isCollapsed$ = new BehaviorSubject<boolean>(false);

  //ExpressionChangedAfterItHasBeenCheckedError
  //如果子组件构造时立刻通知修改menus，则会出现在变更检测中子组件更改父组件的情形
  //通过delay(0)延迟到下一个周期变更检测周期
  public menus$: Observable<Menus> = this.menuService.menus$.pipe(delay(0));

  siderWidth = 300;
  id = -1;

  onSideResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.siderWidth = width!;
    });
  }
}
