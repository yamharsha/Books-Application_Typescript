import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  @Input() authInfo!: User | null;

  @Output() signOutNav = new EventEmitter();

  isCollapsed: boolean = true;

  toggleTheme: boolean = false;

  currentUrl: string = this.router.url;
  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getTheme().subscribe((value) => {
      this.toggleTheme = value;
    });
  }

  changeTheme(): void {
    this.themeService.setTheme(!this.toggleTheme);
  }

  onSignOut(): void {
    this.signOutNav.emit();
  }
}
