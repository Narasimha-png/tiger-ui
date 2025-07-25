import {
  Component,
  Inject,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ImportsModule } from './imports';
import { ThemeSwitcher } from './themeswitcher';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';
import { LeetcodeComponent } from '../leetcode/leetcode.component';
import { ProfileService, User } from './profile.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { GithubComponent } from '../github/github.component';
import { Popover } from 'primeng/popover';
import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  imports: [
    ImportsModule,
    ThemeSwitcher,
    CommonModule,
    RouterOutlet,
    LeetcodeComponent,
    GithubComponent,
  ],
  providers: [
    RouterModule,
    AuthService,
    ProfileService,
    MessageService,
    ConfirmationService 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'elevator';
  items: any[] | undefined;
  itemsSignUp: any[] | undefined;

  theme: ThemeSwitcher | undefined;
  isLoggedIn: boolean | undefined;
  user: User | undefined;

  @ViewChild('op') op!: Popover;

  messageNotify :any;
  checked: boolean = true;
  constructor(
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private profileService: ProfileService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private messagingService: MessagingService
  ) {}
  ngOnInit() {
   
    this.authService.refreshNav.subscribe((val) => {
      this.user = undefined;
      if (this.isLoggedIn) {
        this.profileService.getUserProfile().subscribe((user) => {
          this.user = user;
          this.authService.getUser.next(user);
        },
        (error)=>alert("Error while connecting to backend") 
      );
      }
    });

    this.authService.loggedIn.subscribe((status) => {
      this.isLoggedIn = status;
      this.user = undefined;
      if (this.isLoggedIn) {
        this.authService.refresh();
        this.profileService.getUserProfile().subscribe((user) => {
          this.user = user;
          this.authService.getUser.next(user);
        });
      }
    });

    this.items = [
    

      {
        label: 'Dashboard',
        root: true,
        path: 'dashboard',
      },
      {
        label: 'Roastings',
        root: true,
        path: 'roastings',
      },
      {
        label: 'Streak',
        root: true,
        path: 'streak',
      },
    ];
  }

  onThemeToggler() {
    this.theme?.onThemeToggler();
  }
  iconClass() {
    return this.theme?.iconClass();
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  showPopover = false;

  popoverTop = 0;
  popoverLeft = 0;
  popoverWidth = 256;
  toggle(event: any) {
    this.op.toggle(event);
  }
  togglePopover(event: MouseEvent) {
    this.showPopover = !this.showPopover;

    if (this.showPopover) {
      const button = event.target as HTMLElement;
      const rect = button.getBoundingClientRect();

      this.popoverTop = rect.bottom + window.scrollY + 2;
      this.popoverLeft = rect.right - this.popoverWidth + window.scrollX + 70;
    }
  }
  getAvatarName(): string {
    if (!this.user?.name) return 'U';

    const words = this.user.name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (words[0][0] + words[1][0]).toUpperCase();
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:
        'You may miss auto linkedin posts,consistency and your soulmate tiger. Are you sure? ',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        severity: 'danger',
        label: 'logout',
      },
      accept: () => {
        this.profileService.logoutUser().subscribe(
          (response) => {
            this.authService.logout();
            this.showPopover = !this.showPopover;
            this.messageService.add({
              severity: 'success',
              summary: 'Logout',
              detail: 'You have logged out. ',
            });
          },
          (error) => {
            console.error(error);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error occured while logout',
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Thank you',
          detail: 'For considering tiger as your soulmate.',
          life: 3000,
        });
      },
    });
  }
  openGithub() {
  window.open('https://github.com/Narasimha-png', '_blank');
}

}
