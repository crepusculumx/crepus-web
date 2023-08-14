import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { MenusService } from '../../layout/services/menus.service';
import { BlogTreeData } from './interfaces/blog';
import { AsyncSubject, map, takeUntil } from 'rxjs';
import { Menu, Menus } from '../../layout/interfaces/menu';

@Component({
  selector: 'app-blog',
  template: '<router-outlet></router-outlet>',
})
export class BlogComponent implements OnInit, OnDestroy {
  constructor(
    private blogService: BlogService,
    private menusService: MenusService
  ) {}

  private destroy$ = new AsyncSubject<boolean>();

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
            routerLink: ['/blog', 'file', blogTreeNode.path],
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

    this.blogService
      .getBlogTreeData$()
      .pipe(
        takeUntil(this.destroy$),
        map((blogTreeData: BlogTreeData): Menus => {
          return buildMenuFromBlog(blogTreeData, 1);
        })
      )
      .subscribe((menus) => {
        this.menusService.menus$.next(menus);
      });
  }

  ngOnInit() {
    this.setMenu();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
