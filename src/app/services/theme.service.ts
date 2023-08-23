import { Injectable } from '@angular/core';
import { NzThemeService, NzThemeType } from './nz-theme.service';
import { BehaviorSubject } from 'rxjs';
import { CacheService } from './cache.service';

export enum ThemeType {
  dark = 'dark',
  default = 'default',
}

interface Preference {
  defaultTheme: ThemeType;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private defaultPreference: Preference = {
    defaultTheme: ThemeType.default,
  };
  private prefCacheKey = 'themeServicePreferences';
  private preference: Preference = this.cacheService.has(this.prefCacheKey)
    ? this.cacheService.get<Preference>(this.prefCacheKey)
    : this.defaultPreference;

  public currentTheme$ = new BehaviorSubject<ThemeType>(
    this.preference.defaultTheme
  );
  constructor(
    private nzThemeService: NzThemeService,
    private cacheService: CacheService
  ) {
    this.currentTheme$.subscribe((theme: ThemeType) => {
      this.preference.defaultTheme = theme;
      this.cacheService.set(this.prefCacheKey, this.preference);
      this.nzThemeService.loadTheme(<NzThemeType>(<string>theme)).then();
    });
  }

  private reverseTheme(theme: string): ThemeType {
    return theme === ThemeType.dark ? ThemeType.default : ThemeType.dark;
  }
  public toggleTheme(): void {
    this.currentTheme$.next(this.reverseTheme(this.currentTheme$.value));
  }
}
