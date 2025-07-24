import { Component } from '@angular/core';
import { ImportsModule } from '../app/imports';
import { MessageService } from 'primeng/api';
import {
  GitStreak,
  LinkedinTotalPosts,
  ProfileService,
  Submission,
  User,
} from '../app/profile.service';
import { AuthService } from '../app/auth.service';
import { Router } from '@angular/router';
import { MessagingService } from '../app/messaging.service';
import { DropdownModule } from 'primeng/dropdown';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [ImportsModule, DropdownModule],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  leetcodeStreaks: Submission[] | null = null;
  gitStreak: GitStreak[] | null = null;
  user: User | null = null;
  linkedin: LinkedinTotalPosts | null = null;
  visible: boolean = false;
  notificationsBlocked: boolean = false;
  selectedHelpOption: any = null;
  messageNotify: any;
  options = [
    {
      label: 'Chrome',
      value: 'chrome',
      description:
        'Go to Settings > Privacy and security > Site Settings > Notifications. Find Tiger and allow notifications.',
    },
    {
      label: 'Firefox',
      value: 'firefox',
      description:
        'Go to Preferences > Privacy & Security > Permissions > Notifications > Settings. Find Tiger and allow notifications.',
    },
    {
      label: 'Edge',
      value: 'edge',
      description:
        'Go to Settings > Cookies and site permissions > Notifications. Find Tiger and allow notifications.',
    },
  ];
  constructor(
    private profileService: ProfileService,
    private messageService: MessageService,
    private authService: AuthService,
    public router: Router,
    public messagingService: MessagingService
  ) {}
  async ngOnInit() {
    setTimeout(() => {
      if (Notification.permission == 'default') {
        this.visible = true;
      } else if (Notification.permission == 'denied') {
        this.notificationsBlocked = true;
        this.messageService.add({
          severity: 'warn',
          summary: 'Notification Permission Blocked',
          detail: 'Please enable notifications in your browser settings.',
        });
      }
    }, 2000);
    this.user = this.authService.getUser.value;
    try {
      const response = await lastValueFrom(
        this.profileService.todayLeetcodeStreak()
      );
      this.leetcodeStreaks = response;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Occurred',
        detail: 'Failed to fetch leetcode profile',
      });
    }
    this.profileService.totalLinkedinPosts().subscribe(
      (response) => {
        this.linkedin = response;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Occured',
          detail: 'Failed to fetch linkedin posts',
        });
      }
    );
    this.profileService.todayGitStreak().subscribe(
      (response) => {
        this.gitStreak = response;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Occured',
          detail: 'Failed to fetch github profile',
        });
      }
    );
  }
  value = [
    {
      label: 'Leetcode',
      color1: '#34d399',
      color2: '#fbbf24',
      value: 10,
      icon: 'pi pi-code',
    },
    {
      label: 'Github',
      color1: '#fbbf24',
      color2: '#60a5fa',
      value: 10,
      icon: 'pi pi-github',
    },
    {
      label: 'Media',
      color1: '#60a5fa',
      color2: '#c084fc',
      value: 20,
      icon: 'pi pi-linkedin',
    },
    {
      label: 'System',
      color1: '#c084fc',
      color2: '#c084fc',
      value: 10,
      icon: 'pi pi-cog',
    },
  ];

  async requestNotificationPermission() {
    this.visible = false;
    const res: any = await this.messagingService.requestPermission();
    if (res) {
      this.messageService.add({
        severity: 'success',
        summary: 'Notification Permission Granted',
        detail: 'You will now receive notifications from Tiger.',
      });
    }

    this.messagingService.listen();
    this.messageNotify = this.messagingService.currentMessage;
    this.visible = false;
  }
}
