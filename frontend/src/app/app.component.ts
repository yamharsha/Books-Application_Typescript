import { Component } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front-end';

  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.themeService.getSystemTheme();
    this.themeService.getTheme().subscribe((value) => {
      document.body.setAttribute('data-bs-theme', value ? 'dark' : 'light');
    });
  }
}
