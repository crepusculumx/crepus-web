import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Blog, BlogTreeData } from '../interfaces/blog';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private httpClient: HttpClient) {}

  getBlog(): Observable<Blog> {
    return this.httpClient.get<Blog>('http://localhost:8080/blog').pipe(
      map((blog) => {
        // blog-content.context = 'data:text/html,' + blog-content.context;
        console.log(blog);
        return blog;
      })
    );
  }

  getBlogTreeData$(): Observable<BlogTreeData> {
    return of<BlogTreeData>([
      {
        title: 'a',
        path: '/a',
        children: [
          {
            title: 'b',
            path: '/a/b',
            children: [{ title: 'c', path: '/a/b/c' }],
          },
          { title: 'd', path: '/a/d' },
        ],
      },
      {
        title: 'a',
        path: '/a',
        children: [
          {
            title: 'b',
            path: '/a/b',
            children: [{ title: 'c', path: '/a/b/c' }],
          },
          { title: 'd', path: '/a/d' },
        ],
      },
      {
        title: 'a',
        path: '/a',
        children: [
          {
            title: 'b',
            path: '/a/b',
            children: [{ title: 'c', path: '/a/b/c' }],
          },
          { title: 'd', path: '/a/d' },
        ],
      },
    ]);
    // return this.httpClient.get<BlogTreeData>('');
  }
}
