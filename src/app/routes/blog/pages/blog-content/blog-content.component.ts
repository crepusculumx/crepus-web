import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

import { MenusService } from '../../../../layout/services/menus.service';
import { AsyncSubject, filter, map, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.less'],
})
export class BlogContentComponent implements OnInit, OnDestroy {
  constructor(
    private blogService: BlogService,
    private menusService: MenusService,
    private route: ActivatedRoute
  ) {}

  private destroy$ = new AsyncSubject<boolean>();

  private blogTreeData$ = this.blogService.getBlogTreeData$();

  private curBlogPath$: Observable<string> = this.route.paramMap.pipe(
    map((params: ParamMap) => {
      return params.get('filePath');
    }),
    filter((value): value is string => value !== null)
  );
  ngOnInit() {
    return;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
