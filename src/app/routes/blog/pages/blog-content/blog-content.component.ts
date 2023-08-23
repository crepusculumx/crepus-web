import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

import { MenusService } from '../../../../layout/services/menus.service';
import {
  AsyncSubject,
  combineLatest,
  filter,
  map,
  Observable,
  ReplaySubject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  BlogFileInfo,
  BlogInfo,
  FileType,
  FileTypes,
  ThemeType,
  ThemeTypes,
} from '../../interfaces/blog';
import {
  ThemeService,
  ThemeType as SystemThemeType,
} from '../../../../services/theme.service';
import { environment } from '../../../../../environments/environment';

interface StampedType<T> {
  stamp: string;
  value: T;
}

type StBlogPath = StampedType<string>;
type StUserName = StampedType<string>;

type StBlogInfo = StampedType<BlogInfo>;

type StFileType = StampedType<FileType>;
type StFileTypes = StampedType<FileTypes>;

type StThemeType = StampedType<ThemeType>;
type StThemeTypes = StampedType<ThemeTypes>;

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.less'],
})
export class BlogContentComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private menusService: MenusService,
    private themeService: ThemeService
  ) {}

  private destroy$ = new AsyncSubject<boolean>();

  private userName$ = new ReplaySubject<StUserName>();

  /**
   * 通过url参数获取当前页面在浏览哪篇blog的路径标识
   * 该路径为user内的路径，如/folder/some-page.html
   * @private
   */
  private blogPath$ = new ReplaySubject<StBlogPath>();

  private startGetParamsFromRoute() {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          return {
            userName: params.get('userName'),
            blogPath: params.get('filePath'),
          };
        }),
        filter((params): params is { userName: string; blogPath: string } => {
          return params.userName != null && params.blogPath != null;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((params) => {
        this.blogPath$.next({
          stamp: JSON.stringify(params),
          value: params.blogPath,
        });
        this.userName$.next({
          stamp: JSON.stringify(params),
          value: params.userName,
        });
      });
  }

  public breadcrumbs$: Observable<string[]> = this.blogPath$.pipe(
    map((path) => {
      return path.value.split('/');
    })
  );

  /**
   * 当前blog的详细信息
   * @public
   */
  public blogInfo$: Observable<StBlogInfo> = combineLatest([
    this.userName$,
    this.blogPath$,
  ]).pipe(
    filter(([userName, blogPath]) => {
      return userName.stamp === blogPath.stamp;
    }),
    switchMap(([userName, blogPath]) => {
      return this.blogService.getBlogInfo$(userName.value, blogPath.value).pipe(
        map((blogInfo: BlogInfo): StBlogInfo => {
          return { stamp: blogPath.stamp, value: blogInfo };
        })
      );
    })
  );

  /**
   * 当前blog支持的文件类型（filetype）列表
   * @private
   */
  private blogFiletypes$: Observable<StFileTypes> = this.blogInfo$.pipe(
    map((blogInfo): StFileTypes => {
      return {
        stamp: blogInfo.stamp,
        value: blogInfo.value.blogFileInfos.map((fileInfo: BlogFileInfo) => {
          return fileInfo.fileType;
        }),
      };
    })
  );

  /**
   * 当前选中的文件类型（filetype）
   * @private
   */
  public blogFileType$ = new ReplaySubject<StFileType>(1);

  /**
   * blogFileType$的订阅
   * @private
   */
  private startBlogFileType() {
    // 当curBlogFiletypes变化时（由blog切换触发）
    this.blogFiletypes$
      .pipe(
        map((fileTypes): StFileType => {
          const setFileTypes: Set<FileType> = new Set(fileTypes.value);
          // 默认显示优先级
          const primaries: FileType[] = [
            'html',
            'jpg',
            'png',
            'pdf',
            'md',
            'default',
          ];
          for (const primary of primaries) {
            if (setFileTypes.has(primary)) {
              return { stamp: fileTypes.stamp, value: primary };
            }
          }
          return { stamp: fileTypes.stamp, value: '' };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((fileType) => {
        this.blogFileType$.next(fileType);
      });
  }

  /**
   * 可选文件主题（themeType）列表，由当前选中的文件类型（filetype）决定（支持该文件类型的主题有哪些）。
   * @private
   */
  private blogThemeTypes$: Observable<StThemeTypes> = combineLatest([
    this.blogInfo$,
    this.blogFileType$,
  ]).pipe(
    filter(([blogInfo, fileType]) => {
      return blogInfo.stamp === fileType.stamp;
    }),
    map(([blogInfo, fileType]): StThemeTypes => {
      const themes: ThemeTypes = blogInfo.value.blogFileInfos
        .filter((fileInfo: BlogFileInfo) => {
          return fileInfo.fileType === fileType.value;
        })
        .map((fileInfo: BlogFileInfo) => {
          return fileInfo.themeType;
        });
      return { stamp: fileType.stamp, value: themes };
    })
  );

  /**
   * 当前选中的文件主题类型
   * @private
   */
  private blogThemeType$ = new ReplaySubject<StThemeType>(1);

  /**
   * 根据当前blog，文件主题（themeType），文件类型（fileType）确定文件url
   * @public
   */
  public docUrl$: Observable<string> = combineLatest([
    this.userName$,
    this.blogInfo$,
    this.blogFileType$,
    this.blogThemeType$,
  ]).pipe(
    filter(([userName, blogInfo, fileType, themeType]): boolean => {
      return (
        new Set([
          userName.stamp,
          blogInfo.stamp,
          fileType.stamp,
          themeType.stamp,
        ]).size === 1
      );
    }),
    map(([userName, blogInfo, fileType, themeType]): string => {
      const res = blogInfo.value.blogFileInfos.find((fileInfo) => {
        return (
          fileInfo.fileType === fileType.value &&
          fileInfo.themeType === themeType.value
        );
      });
      if (res) {
        return (
          environment.api.baseUrl +
          'public/blog/' +
          userName.value +
          res.urlPath
        );
      }
      return '';
    })
  );

  /**
   * curBlogThemeType$的订阅
   * @private
   */
  private startBlogThemeType() {
    // 由系统主题切换引起的blog主题切换
    combineLatest([this.themeService.currentTheme$, this.blogThemeTypes$])
      .pipe(
        map(([theme, themeTypes]): StThemeType => {
          const themes = new Set<ThemeType>(themeTypes.value);
          if (theme === SystemThemeType.default && themes.has('light')) {
            return { stamp: themeTypes.stamp, value: 'light' };
          }
          if (theme === SystemThemeType.dark && themes.has('dark')) {
            return { stamp: themeTypes.stamp, value: 'dark' };
          }
          if (themes.has('default')) {
            return { stamp: themeTypes.stamp, value: 'default' };
          }
          if (themes.size > 0) {
            return {
              stamp: themeTypes.stamp,
              value: themes.values().next().value, // any
            };
          }
          return { stamp: themeTypes.stamp, value: '' };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((themeType) => {
        this.blogThemeType$.next(themeType);
      });
  }
  ngOnInit() {
    this.startGetParamsFromRoute();
    this.startBlogFileType();
    this.startBlogThemeType();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
