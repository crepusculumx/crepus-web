import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less'],
})
export class BasicComponent {
  isCollapsed$ = new BehaviorSubject<boolean>(false);
  constructor(
    public themeService: ThemeService,
    public layoutService: LayoutService
  ) {}
}
