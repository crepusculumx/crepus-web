import { Component } from '@angular/core';
import { LayoutService, LayoutType } from './services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  protected readonly LayoutType = LayoutType;

  public curLayout$ = this.layoutService.CurLayout$;

  constructor(private layoutService: LayoutService) {}
}
