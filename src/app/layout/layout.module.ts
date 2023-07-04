import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { SharedModule } from '../shared/shared.module';

import { BasicComponent } from './basic/basic.component';
import { LayoutComponent } from './layout.component';
import { BlankComponent } from './blank/blank.component';
import { MenusComponent } from './basic/widgets/menus/menus.component';

@NgModule({
  declarations: [
    BasicComponent,
    LayoutComponent,
    BlankComponent,
    MenusComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}
