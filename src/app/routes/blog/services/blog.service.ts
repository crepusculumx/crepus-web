import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { BlogInfo, BlogTreeData } from '../interfaces/blog';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../../../services/cache.service';
import { UserService } from '../../../services/user.service';

interface Preference {
  defaultUserName: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(
    private httpClient: HttpClient,
    private cacheService: CacheService,
    private userService: UserService
  ) {
    this.setDefaultUserName();
    this.startCachingUserName();
  }

  private prefCacheKey = 'BlogServicePreferences';

  getBlogTreeData$(userName: string): Observable<BlogTreeData> {
    return this.httpClient.get<BlogTreeData>(`blog/file-tree/${userName}`);
  }

  getBlogInfo$(userName: string, path: string): Observable<BlogInfo> {
    return this.httpClient.get<BlogInfo>(
      `blog/blog-info/${userName}/` +
        encodeURIComponent(encodeURIComponent(path)) // path中有'/'字符，两次encodeURIComponent
    );
  }

  private _curUserName$ = new ReplaySubject<string>(1);
  get curUserName$() {
    return this._curUserName$;
  }
  private setDefaultUserName() {
    if (this.cacheService.has(this.prefCacheKey)) {
      this._curUserName$.next(
        this.cacheService.get<Preference>(this.prefCacheKey).defaultUserName
      );
      return;
    }

    this.userService.getUserInfos$().subscribe((userInfos) => {
      if (userInfos.length === 0) return;
      this._curUserName$.next(userInfos[0].userName);
    });
  }

  private startCachingUserName() {
    this._curUserName$.subscribe((userName) => {
      this.cacheService.set<Preference>(this.prefCacheKey, {
        defaultUserName: userName,
      });
    });
  }
}
