import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less'],
})
export class BasicComponent {
  isCollapsed$ = new BehaviorSubject<boolean>(false);
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
