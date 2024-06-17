import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogInfo, BlogTreeData } from '../interfaces/blog';
import { HttpClient } from '@angular/common/http';
import { UserInfos } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class BlogApiService {
  constructor(private httpClient: HttpClient) {}

  getBlogTreeData$(userName: string): Observable<BlogTreeData> {
    return this.httpClient.get<BlogTreeData>(`blog/file-tree/${userName}`);
  }

  getBlogInfo$(userName: string, path: string): Observable<BlogInfo> {
    return this.httpClient.get<BlogInfo>(
      `blog/blog-info/${userName}/` +
        encodeURIComponent(encodeURIComponent(path)), // path中有'/'字符，两次encodeURIComponent
    );
  }

  getUserInfos$() {
    return this.httpClient.get<UserInfos>('user/user-infos');
  }
}
