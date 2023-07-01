import { Injectable } from '@angular/core';
import { NzThemeService, NzThemeType } from './nz-theme.service';
import { BehaviorSubject } from 'rxjs';

export enum ThemeType {
  dark = 'dark',
  default = 'default',
}
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentTheme$ = new BehaviorSubject(ThemeType.default);
  constructor(nzThemeService: NzThemeService) {
    this.currentTheme$.subscribe((theme: ThemeType) => {
      nzThemeService.loadTheme(<NzThemeType>(<string>theme)).then();
    });
  }
  private reverseTheme(theme: string): ThemeType {
    return theme === ThemeType.dark ? ThemeType.default : ThemeType.dark;
  }
  public toggleTheme(): void {
    this.currentTheme$.next(this.reverseTheme(this.currentTheme$.value));
  }
}
