import { Injectable } from '@angular/core';
import { concat, map, Observable, of, shareReplay, Subject, tap } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { BlogApiService } from './blog-api.service';

interface Preference {
  defaultUserName: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(
    private localStorageService: LocalStorageService,
    private blogApiService: BlogApiService,
  ) {}

  private prefCacheKey = 'BlogServicePreferences';

  private _setUserName$ = new Subject<string>();

  public setUserName(userName: string) {
    this._setUserName$.next(userName);
  }

  private defaultUserName$: Observable<string> = this.localStorageService.has(
    this.prefCacheKey,
  )
    ? of(
        this.localStorageService.get<Preference>(this.prefCacheKey)
          .defaultUserName,
      )
    : this.blogApiService.getUserInfos$().pipe(
        map((userInfos) => {
          return userInfos[0].userName;
        }),
      );

  public userName$: Observable<string> = concat(
    this.defaultUserName$,
    this._setUserName$,
  ).pipe(
    tap((userName) => {
      this.localStorageService.set<Preference>(this.prefCacheKey, {
        defaultUserName: userName,
      });
    }),
    shareReplay(1),
  );
}
