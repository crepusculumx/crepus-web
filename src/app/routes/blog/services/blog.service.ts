import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogInfo, BlogTreeData } from '../interfaces/blog';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private httpClient: HttpClient) {}

  getBlogTreeData$(): Observable<BlogTreeData> {
    // todo user
    return this.httpClient.get<BlogTreeData>('blog/file-tree/default-user');
  }

  getBlogInfo$(path: string): Observable<BlogInfo> {
    // todo user
    return this.httpClient.get<BlogInfo>(
      'blog/blog-info/default-user/' +
        encodeURIComponent(encodeURIComponent(path)) // path中有'/'字符，两次encodeURIComponent
    );
  }
}
