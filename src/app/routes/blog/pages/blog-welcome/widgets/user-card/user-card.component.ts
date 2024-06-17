import { Component, Input } from '@angular/core';

import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BlogService } from '../../../../services/blog.service';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    NzWaveDirective,
    NzCardModule,
    NzAvatarModule,
    NzIconModule,
    NzSpaceModule,
    NzButtonModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.less',
})
export class UserCardComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) selected!: boolean;

  constructor(private blogService: BlogService) {}

  public onSelect() {
    this.blogService.setUserName(this.name);
  }
}
