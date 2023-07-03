import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { BasicComponent } from './basic/basic.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LayoutComponent } from './layout.component';
import { BlankComponent } from './blank/blank.component';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MenusComponent } from './basic/widgets/menus/menus.component';

@NgModule({
  declarations: [
    BasicComponent,
    LayoutComponent,
    BlankComponent,
    MenusComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzCollapseModule,
    NzRadioModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzAffixModule,
    NzButtonModule,
  ],
})
export class LayoutModule {}
