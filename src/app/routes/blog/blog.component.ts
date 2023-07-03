import { Component } from '@angular/core';
import { BlogService } from './services/blog.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less'],
})
export class BlogComponent {
  constructor(
    public blogService: BlogService,
    public sanitizer: DomSanitizer
  ) {}
}
