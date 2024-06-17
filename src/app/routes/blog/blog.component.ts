import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogService } from './services/blog.service';
import { MenusService } from '../../layout/services/menus.service';
import { BlogTreeData } from './interfaces/blog';
import { Menu, Menus } from '../../layout/interfaces/menu';
import { map, switchMap } from 'rxjs';
import { BlogApiService } from './services/blog-api.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class BlogComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private menusService: MenusService,
    private blogApiService: BlogApiService,
    // private route: ActivatedRoute,
  ) {}

  setMenu() {
    function buildMenuFromBlog(
      userName: string,
      blogTreeData: BlogTreeData,
      level: number,
    ): Menus {
      return blogTreeData.map<Menu>((blogTreeNode): Menu => {
        if (blogTreeNode.children == undefined) {
          return {
            disabled: false,
            icon: 'file',
            level: level,
            routerLink: ['/blog', userName, 'file', blogTreeNode.path],
            selected: false,
            title: blogTreeNode.title,
          };
        } else {
          return {
            children: buildMenuFromBlog(
              userName,
              blogTreeNode.children,
              level + 1,
            ),
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

    function sortMenus(menus: Menus) {
      menus.sort((l, r): number => {
        if (l.children === undefined && r.children != undefined) {
          return 1;
        }
        if (l.children != undefined && r.children === undefined) {
          return -1;
        }
        if (l.title > r.title) {
          return 1;
        } else if (l.title < r.title) {
          return -1;
        } else {
          return 0;
        }
      });

      for (const menu of menus) {
        if (menu.children) {
          sortMenus(menu.children);
        }
      }
      return menus;
    }

    this.blogService.userName$
      .pipe(
        switchMap((userName: string) => {
          return this.blogApiService.getBlogTreeData$(userName).pipe(
            map((blogTreeData) => {
              return { userName: userName, blogTreeData: blogTreeData };
            }),
          );
        }),
        map((value): Menus => {
          return buildMenuFromBlog(value.userName, value.blogTreeData, 1);
        }),
        map((menus): Menus => {
          return sortMenus(menus);
        }),
      )
      .subscribe((menus) => {
        menus.unshift({
          disabled: false,
          icon: 'file',
          level: 1,
          routerLink: ['blog', 'welcome'],
          selected: false,
          title: '首页',
        });
        this.menusService.setMenus(menus);
      });
  }

  ngOnInit() {
    this.setMenu();
  }
}
