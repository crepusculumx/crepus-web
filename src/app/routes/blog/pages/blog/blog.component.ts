import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

import {
  Menu,
  Menus,
  MenusService,
} from '../../../../layout/services/menus.service';
import { AsyncSubject, map, takeUntil } from 'rxjs';
import { BlogTreeData } from '../../interfaces/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less'],
})
export class BlogComponent implements OnInit, OnDestroy {
  constructor(
    public blogService: BlogService,
    private menusService: MenusService
  ) {}

  private destroy$ = new AsyncSubject<boolean>();
  private blogTreeData$ = this.blogService.getBlogTreeData$();
  ngOnInit() {
    this.setMenu();
  }

  setMenu() {
    function buildMenuFromBlog(
      blogTreeData: BlogTreeData,
      level: number
    ): Menus {
      return blogTreeData.map<Menu>((blogTreeNode): Menu => {
        if (blogTreeNode.children == undefined) {
          return {
            disabled: false,
            icon: 'file',
            level: level,
            routerLink: ['blog', ...blogTreeNode.path.split('/')],
            selected: false,
            title: blogTreeNode.title,
          };
        } else {
          return {
            children: buildMenuFromBlog(blogTreeNode.children, level + 1),
            open: false,
            disabled: false,
            icon: 'folder',
            level: level,
            selected: false,
            title: blogTreeNode.title,
          };
        }
      });
    }

    this.blogTreeData$
      .pipe(
        takeUntil(this.destroy$),
        map((blogTreeData: BlogTreeData): Menus => {
          return buildMenuFromBlog(blogTreeData, 1);
        })
      )
      .subscribe(this.menusService.menus$);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
