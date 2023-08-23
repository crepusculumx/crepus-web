import { Component } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  takeUntil,
} from 'rxjs';
import { UserService } from '../../../../../../services/user.service';
import { BlogService } from '../../../../services/blog.service';

export interface UserCardState {
  name: string;
  selected$: BehaviorSubject<boolean>;
}

export type UserCardStates = UserCardState[];

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.less'],
})
export class UserCardsComponent {
  constructor(
    private userService: UserService,
    private blogService: BlogService
  ) {}

  private destroy$ = new AsyncSubject<boolean>();

  public userCardStates$: Observable<UserCardStates> = combineLatest([
    this.blogService.curUserName$,
    this.userService.getUserInfos$(),
  ]).pipe(
    map(([userName, userInfos]): UserCardStates => {
      const destroyCurCardStates$ = new AsyncSubject<boolean>();
      return userInfos.map((userInfo) => {
        const selected$ =
          userInfo.userName === userName
            ? new BehaviorSubject<boolean>(true)
            : new BehaviorSubject<boolean>(false);

        selected$
          .pipe(
            filter((selected) => {
              return selected && userInfo.userName != userName;
            }),
            takeUntil(destroyCurCardStates$)
          )
          .subscribe(() => {
            this.blogService.curUserName$.next(userInfo.userName);
            destroyCurCardStates$.next(true); // unsubscribe all.
          });

        return { name: userInfo.userName, selected$: selected$ };
      });
    }),
    map((states): UserCardStates => {
      return states.sort((a, b) => {
        // 选中的在最上
        if (a.selected$.value) return -1;
        if (b.selected$.value) return 1;

        if (a.name < b.name) return -1;
        else if (a.name === b.name) return 0;
        else return 1;
      });
    })
  );
}
