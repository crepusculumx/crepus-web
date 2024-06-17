import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AsyncPipe } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BlogApiService } from '../../services/blog-api.service';
import { UserCardComponent } from './widgets/user-card/user-card.component';
import { toSignal } from '@angular/core/rxjs-interop';

export interface UserCardState {
  name: string;
  selected: boolean;
}
export type UserCardStates = UserCardState[];

@Component({
  selector: 'app-blog-welcome',
  standalone: true,
  imports: [
    NzCardModule,
    NzIconModule,
    NzAvatarModule,
    NzSpaceModule,
    NzButtonModule,
    AsyncPipe,
    UserCardComponent,
  ],
  templateUrl: './blog-welcome.component.html',
  styleUrl: './blog-welcome.component.less',
})
export class BlogWelcomeComponent {
  constructor(
    private blogApiService: BlogApiService,
    private blogService: BlogService,
  ) {}

  private userCardStates$: Observable<UserCardStates> = combineLatest([
    this.blogService.userName$,
    this.blogApiService.getUserInfos$(),
  ]).pipe(
    map(([userName, userInfos]): UserCardStates => {
      console.log(userName);
      console.log(userInfos);
      return userInfos.map((userInfo) => {
        return {
          name: userInfo.userName,
          selected: userName === userInfo.userName,
        };
      });
    }),
    map((states): UserCardStates => {
      return states.sort((a, b) => {
        // 选中的在最上
        if (a.selected) return -1;
        if (b.selected) return 1;

        if (a.name < b.name) return -1;
        else if (a.name === b.name) return 0;
        else return 1;
      });
    }),
  );

  public userCardStates = toSignal(this.userCardStates$);
}
