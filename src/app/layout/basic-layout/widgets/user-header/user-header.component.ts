import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-basic-layout-user-header',
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownModule,
    NzIconModule,
    NzAvatarModule,
    NzSpaceModule,
    RouterLink,
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.less',
})
export class UserHeaderComponent {
  constructor() {}

  public userName$: Observable<string | null> = of(null);

  public logout() {}
}
