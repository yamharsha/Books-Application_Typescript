import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private appTheme: any = localStorage.getItem('dark-theme');

  private themeVaule: BehaviorSubject<boolean>;

  constructor() {
    this.themeVaule = new BehaviorSubject<boolean>(false);
  }

  getSystemTheme(): void {
    let systemTheme: boolean = false;
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      systemTheme = true;
    }
    this.themeVaule.next(
      JSON.parse(this.appTheme) ? JSON.parse(this.appTheme) : systemTheme
    );
  }

  getTheme(): Observable<boolean> {
    return this.themeVaule.asObservable();
  }

  setTheme(theme: boolean) {
    if (theme === true) {
      this.themeVaule.next(true);
      localStorage.setItem('dark-theme', JSON.stringify(theme));
    } else {
      this.themeVaule.next(false);
      localStorage.setItem('dark-theme', JSON.stringify(theme));
    }
  }
}
