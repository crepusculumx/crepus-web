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

type StampedFileType = StampedType<FileType>;
type StampedFileTypes = StampedType<FileTypes>;

type StampedThemeType = StampedType<ThemeType>;
type StampedThemeTypes = StampedType<ThemeTypes>;

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

  /**
   * 通过url参数获取当前页面在浏览哪篇blog的路径标识
   * 该路径为user内的路径，如/folder/some-page.html
   * @private
   */
  private blogPath$ = new ReplaySubject<string>();

  private startBlogPath() {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          return params.get('filePath');
        }),
        filter((value): value is string => value !== null),
        takeUntil(this.destroy$)
      )
      .subscribe((path) => {
        this.blogPath$.next(path);
      });
  }

  public breadcrumbs$: Observable<string[]> = this.blogPath$.pipe(
    map((path) => {
      return path.split('/');
    })
  );

  /**
   * 当前blog的详细信息
   * @public
   */
  public blogInfo$: Observable<BlogInfo> = this.blogPath$.pipe(
    switchMap((curBlogPath: string) => {
      return this.blogService.getBlogInfo$(curBlogPath);
    })
  );

  /**
   * 当前blog支持的文件类型（filetype）列表
   * @private
   */
  private blogFiletypes$: Observable<StampedFileTypes> = this.blogInfo$.pipe(
    map((blogInfo: BlogInfo): StampedFileTypes => {
      return {
        stamp: blogInfo.path,
        value: blogInfo.blogFileInfos.map((fileInfo: BlogFileInfo) => {
          return fileInfo.fileType;
        }),
      };
    })
  );

  /**
   * 当前选中的文件类型（filetype）
   * @private
   */
  private blogFileType$ = new ReplaySubject<StampedFileType>(1);

  /**
   * blogFileType$的订阅
   * @private
   */
  private startBlogFileType() {
    // 当curBlogFiletypes变化时（由blog切换触发）
    this.blogFiletypes$
      .pipe(
        map((stampedFileTypes: StampedFileTypes): StampedFileType => {
          const setFileTypes: Set<FileType> = new Set(stampedFileTypes.value);
          // 默认显示优先级
          const primaries: FileType[] = ['html', 'pdf', 'md', 'default'];
          for (const primary of primaries) {
            if (setFileTypes.has(primary)) {
              return { stamp: stampedFileTypes.stamp, value: primary };
            }
          }
          return { stamp: stampedFileTypes.stamp, value: '' };
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
  private blogThemeTypes$: Observable<StampedThemeTypes> = combineLatest([
    this.blogInfo$,
    this.blogFileType$,
  ]).pipe(
    filter(([blog, fileType]) => {
      return blog.path === fileType.stamp;
    }),
    map(([blog, fileType]): StampedThemeTypes => {
      const themes: ThemeTypes = blog.blogFileInfos
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
  private blogThemeType$ = new ReplaySubject<StampedThemeType>(1);

  /**
   * 根据当前blog，文件主题（themeType），文件类型（fileType）确定文件url
   * @public
   */
  public docUrl$: Observable<string> = combineLatest([
    this.blogInfo$,
    this.blogFileType$,
    this.blogThemeType$,
  ]).pipe(
    filter(([blogInfo, fileType, themeType]): boolean => {
      return (
        new Set([blogInfo.path, fileType.stamp, themeType.stamp]).size === 1
      );
    }),
    map(([blogInfo, fileType, themeType]): [BlogInfo, FileType, ThemeType] => {
      return [blogInfo, fileType.value, themeType.value];
    }),
    map(([blogInfo, fileType, themeType]): string => {
      const res = blogInfo.blogFileInfos.find((fileInfo) => {
        return (
          fileInfo.fileType === fileType && fileInfo.themeType === themeType
        );
      });
      if (res) {
        // todo user
        return environment.api.baseUrl + 'blog/' + 'default-user' + res.urlPath;
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
        map(([theme, themeTypes]): StampedThemeType => {
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
    this.startBlogPath();
    this.startBlogFileType();
    this.startBlogThemeType();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
