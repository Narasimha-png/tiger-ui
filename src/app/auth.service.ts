import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   public loggedIn = new BehaviorSubject<boolean>(false);
   public refreshNav = new BehaviorSubject<boolean>(true);
   public getUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private static instanceCount = 0;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
   
    if (this.hasSession()) {
      this.loggedIn.next(true);
    }
  }

  refresh() {
    this.refreshNav.next(!this.refreshNav.value) ;
}

  private hasSession(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('sessionId');
    }
    return false;
  }

  login(sessionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sessionId', sessionId);
    }
    this.loggedIn.next(true);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('sessionId');
    }
    this.loggedIn.next(false);
  }
}
