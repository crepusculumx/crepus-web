import { Component } from '@angular/core';
import { HtmlDocComponent } from './widgets/html-doc/html-doc.component';
import { ImgDocComponent } from './widgets/img-doc/img-doc.component';
import { PdfDocComponent } from './widgets/pdf-doc/pdf-doc.component';
import { combineLatest, from, map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { MenusService } from '../../../../layout/services/menus.service';
import {
  ThemeService,
  ThemeType as SystemThemeType,
} from '../../../../services/theme.service';
import {
  BlogFileInfo,
  BlogInfo,
  FileType,
  FileTypes,
  ThemeType,
  ThemeTypes,
} from '../../interfaces/blog';
import { environment } from '../../../../../environments/environment';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogApiService } from '../../services/blog-api.service';

@Component({
  selector: 'app-blog-content',
  standalone: true,
  imports: [
    HtmlDocComponent,
    ImgDocComponent,
    PdfDocComponent,
    NzSpaceModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
  ],
  templateUrl: './blog-content.component.html',
  styleUrl: './blog-content.component.less',
})
export class BlogContentComponent {
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private blogApiService: BlogApiService,
    private menusService: MenusService,
    private themeService: ThemeService,
  ) {}

  private userName$: Observable<string | null> = this.route.paramMap.pipe(
    map((params) => {
      return params.get('userName');
    }),
  );

  /**
   * 通过url参数获取当前页面在浏览哪篇blog的路径标识
   * 该路径为user内的路径，如/folder/some-page.html
   * @private
   */
  private blogPath$ = this.route.paramMap.pipe(
    map((params) => {
      return params.get('filePath');
    }),
    switchMap((blogPath) => {
      if (blogPath === null) {
        return of(null);
      } else {
        return from([null, blogPath]); // insert null to clear downstream data
      }
    }),
  );

  public breadcrumbs$: Observable<string[] | null> = this.blogPath$.pipe(
    map((path) => {
      if (path === null) {
        return null;
      }
      return path.split('/');
    }),
  );
  public breadcrumbs = toSignal(this.breadcrumbs$);

  /**
   * 当前blog的详细信息
   * @public
   */
  public blogInfo$: Observable<BlogInfo | null> = combineLatest([
    this.userName$,
    this.blogPath$,
  ]).pipe(
    switchMap(([userName, blogPath]) => {
      if (userName === null || blogPath === null) {
        return of(null);
      }
      return this.blogApiService.getBlogInfo$(userName, blogPath);
    }),
  );
  public blogInfo = toSignal(this.blogInfo$);
  /**
   * 当前blog支持的文件类型（filetype）列表
   * @private
   */
  private blogFiletypes$: Observable<FileTypes | null> = this.blogInfo$.pipe(
    map((blogInfo) => {
      if (blogInfo === null) {
        return null;
      }
      return blogInfo.blogFileInfos.map((fileInfo) => {
        return fileInfo.fileType;
      });
    }),
  );

  /**
   * 当前选中的文件类型（filetype）
   * @private
   */
  private blogFileType$ = this.blogFiletypes$.pipe(
    map((fileTypes) => {
      if (fileTypes === null) {
        return null;
      }
      const setFileTypes: Set<FileType> = new Set(fileTypes);
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
          return primary;
        }
      }
      return 'default';
    }),
  );
  public blogFileType = toSignal(this.blogFileType$);

  /**
   * 可选文件主题（themeType）列表，由当前选中的文件类型（filetype）决定（支持该文件类型的主题有哪些）。
   * @private
   */
  private blogThemeTypes$: Observable<ThemeTypes | null> = combineLatest([
    this.blogInfo$,
    this.blogFileType$,
  ]).pipe(
    map(([blogInfo, fileType]) => {
      if (blogInfo === null || fileType === null) {
        return null;
      }
      const themes: ThemeTypes = blogInfo.blogFileInfos
        .filter((fileInfo: BlogFileInfo) => {
          return fileInfo.fileType === fileType;
        })
        .map((fileInfo: BlogFileInfo) => {
          return fileInfo.themeType;
        });
      return themes;
    }),
  );

  /**
   * 当前选中的文件主题类型
   * @private
   */
  private blogThemeType$: Observable<ThemeType | null> = combineLatest([
    this.themeService.currentTheme$,
    this.blogThemeTypes$,
  ]).pipe(
    map(([theme, themeTypes]) => {
      if (theme === null || themeTypes === null) {
        return null;
      }
      const themes = new Set<ThemeType>(themeTypes);
      if (theme === SystemThemeType.default && themes.has('light')) {
        return 'light';
      }
      if (theme === SystemThemeType.dark && themes.has('dark')) {
        return 'dark';
      }
      if (themes.has('default')) {
        return 'default';
      }
      if (themes.size > 0) {
        return themes.values().next().value; // any
      }
      return 'error theme';
    }),
  );

  /**
   * 根据当前blog，文件主题（themeType），文件类型（fileType）确定文件url
   * @public
   */
  private docUrl$: Observable<string | null> = combineLatest([
    this.userName$,
    this.blogInfo$,
    this.blogFileType$,
    this.blogThemeType$,
  ]).pipe(
    map(([userName, blogInfo, fileType, themeType]) => {
      if (
        userName === null ||
        blogInfo === null ||
        fileType === null ||
        themeType === null
      ) {
        return null;
      }
      const res = blogInfo.blogFileInfos.find((fileInfo) => {
        return (
          fileInfo.fileType === fileType && fileInfo.themeType === themeType
        );
      });
      if (res) {
        return `${environment.api.baseUrl}public/blog/${userName}${res.urlPath}`;
      }
      return 'error';
    }),
  );
  public docUrl = toSignal(this.docUrl$);
}
