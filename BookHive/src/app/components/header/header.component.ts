import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <nav class="navbar">
          <div class="navbar-brand">
            <a routerLink="/" class="logo">
              <span class="logo-text">BookHive</span>
            </a>
          </div>
          <div class="navbar-menu">
            <ul class="nav-links">
              <li>
                <a
                  routerLink="/"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                >
                  <i class="fas fa-book-open"></i> Books
                </a>
              </li>
              <li>
                <a routerLink="/books/new" routerLinkActive="active">
                  <i class="fas fa-plus"></i> Add Book
                </a>
              </li>
            </ul>
            <div class="theme-toggle">
              <button
                (click)="toggleTheme()"
                class="theme-btn"
                [attr.aria-label]="
                  (isDarkMode$ | async)
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                "
              >
                <i
                  class="fas"
                  [class.fa-sun]="isDarkMode$ | async"
                  [class.fa-moon]="!(isDarkMode$ | async)"
                ></i>
              </button>
            </div>
          </div>
          <button
            class="mobile-menu-toggle"
            (click)="toggleMobileMenu()"
            aria-label="Toggle menu"
          >
            <i
              class="fas"
              [class.fa-bars]="!isMobileMenuOpen"
              [class.fa-times]="isMobileMenuOpen"
            ></i>
          </button>
        </nav>
        <div class="mobile-menu" [class.open]="isMobileMenuOpen">
          <ul class="mobile-nav-links">
            <li>
              <a
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="toggleMobileMenu()"
              >
                <i class="fas fa-book-open"></i> Books
              </a>
            </li>
            <li>
              <a
                routerLink="/books/new"
                routerLinkActive="active"
                (click)="toggleMobileMenu()"
              >
                <i class="fas fa-plus"></i> Add Book
              </a>
            </li>
            <li>
              <button
                (click)="toggleTheme(); toggleMobileMenu()"
                class="theme-btn-mobile"
              >
                <i
                  class="fas"
                  [class.fa-sun]="isDarkMode$ | async"
                  [class.fa-moon]="!(isDarkMode$ | async)"
                ></i>
                {{ (isDarkMode$ | async) ? 'Light Mode' : 'Dark Mode' }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  isDarkMode$: typeof this.themeService.isDarkMode$;

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}