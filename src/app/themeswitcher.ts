import { Component, inject, PLATFORM_ID, signal, computed, effect } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
      <button
        type="button"
        class="inline-flex w-9 h-9 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded"
        (click)="onThemeToggler()"
      >
        <i [ngClass]="'pi ' + iconClass()" class="dark:text-white"></i>
      </button>
  
  `
})
export class ThemeSwitcher {
  private readonly STORAGE_KEY = 'themeSwitcherState';

  document = inject(DOCUMENT);
  platformId = inject(PLATFORM_ID);

  themeState = signal<{ darkTheme: boolean }>({ darkTheme: false });

  iconClass = computed(() =>
    this.themeState().darkTheme ? 'pi-sun' : 'pi-moon'
  );

  transitionComplete = signal<boolean>(false);

  constructor() {
    const state = this.loadThemeState();
    this.themeState.set(state);

    effect(() => {
      const state = this.themeState();
      this.saveThemeState(state);
      this.handleDarkModeTransition(state);
    });
  }

  onThemeToggler() {
    this.themeState.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }

  toggleDarkMode(state: { darkTheme: boolean }) {
    if (state.darkTheme) {
      this.document.documentElement.classList.add('p-dark');
    } else {
      this.document.documentElement.classList.remove('p-dark');
    }
  }

  startViewTransition(state: { darkTheme: boolean }) {
    const transition = (document as any).startViewTransition(() => {
      this.toggleDarkMode(state);
    });

    transition.ready.then(() => this.onTransitionEnd());
  }

  handleDarkModeTransition(state: { darkTheme: boolean }) {
    if (isPlatformBrowser(this.platformId)) {
      if ((document as any).startViewTransition) {
        this.startViewTransition(state);
      } else {
        this.toggleDarkMode(state);
        this.onTransitionEnd();
      }
    }
  }

  onTransitionEnd() {
    this.transitionComplete.set(true);
    setTimeout(() => this.transitionComplete.set(false));
  }

  loadThemeState(): { darkTheme: boolean } {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    }
    return { darkTheme: false };
  }

  saveThemeState(state: { darkTheme: boolean }) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }
  }

  getTheme(): 'light' | 'dark' {
    return this.themeState().darkTheme ? 'dark' : 'light';
  }
}
