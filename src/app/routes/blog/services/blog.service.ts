import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private httpClient: HttpClient) {}

  getBlog(): Observable<Blog> {
    return this.httpClient.get<Blog>('http://localhost:8080/blog').pipe(
      map((blog) => {
        // blog.context = 'data:text/html,' + blog.context;
        console.log(blog);
        return blog;
      })
    );
  }
}
