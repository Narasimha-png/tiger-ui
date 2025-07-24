import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LeetCodeProfile, ProfileService, User } from '../app/profile.service';
import { ImportsModule } from '../app/imports';
import { MessageService } from 'primeng/api';
import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-leetcode',
  imports: [ImportsModule],
  providers: [MessageService, ProfileService],
  templateUrl: './leetcode.component.html',
  styleUrl: './leetcode.component.scss',
})
export class LeetcodeComponent {
  @Output() 
   userNameEmitter = new EventEmitter<string>();
  @Input()
  leetcode: User | null | undefined = null;
  userName: string | null | undefined = this.leetcode?.leetcodeProfile;
  progress: number = 2;
  leetcodeUserName: string = '';
  profile: LeetCodeProfile | null = null;
  loading: boolean = false;
  showProfileDiv: boolean = false;
  visibleLeetCode: boolean = false;
  isUpdatingLeetCodeProfile = false;

  constructor(
    private messageService: MessageService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.leetcode != null && this.leetcode.leetcodeProfile != null) {
      this.userNameEmitter.emit(this.leetcode.leetcodeProfile);
    }
  }
  showLeetcodeProfile(): void {
    
    this.loading = true;
    this.showProfileDiv = true;
    if (this.leetcodeUserName.trim() === '') {
      this.loading = false;
      this.showProfileDiv = false;
      this.messageService.add({
        severity: 'warn',
        summary: 'Username is required',
        detail: 'Please enter a valid LeetCode username.',
      });
      return;
    }

    this.profileService.getLeetCodeProfile(this.leetcodeUserName).subscribe(
      (profile: LeetCodeProfile) => {
        this.loading = false;
        if (
          profile.ranking == null ||
          profile.ranking === undefined ||
          profile.ranking == 0
        ) {
          this.showProfileDiv = false;
          this.messageService.add({
            severity: 'warn',
            summary: 'No user found with this username',
            detail: 'Please check the username and try again.',
          });
          return;
        }

        this.profile = profile;
        this.visibleLeetCode = true;
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.loading = false;
        this.showProfileDiv = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch profile.',
        });
      }
    );
  }

  showLeetcode(): void {
    
    this.authService.refresh();
    this.visibleLeetCode = true;
    this.loading = false;
    this.showProfileDiv = false;
     if (this.leetcode != null && this.leetcode.leetcodeProfile != null) {
      this.leetcodeUserName = this.leetcode.leetcodeProfile;
      this.progress = this.leetcode?.targetSubmissions ?? 2;
      this.showLeetcodeProfile() ;
    }
   
  }

  updateLeetCodeProfile() {
    this.isUpdatingLeetCodeProfile = true;

    this.profileService
      .updateLeetCodeProfile(this.leetcodeUserName, this.progress)
      .subscribe({
        next: (response) => {
          this.isUpdatingLeetCodeProfile = false;
          if (response.status === 200) {
            this.userNameEmitter.emit(this.leetcodeUserName);
            this.messageService.add({
              severity: 'success',
              summary: 'Profile Updated',
              detail: 'LeetCode profile updated successfully.',
            });
            this.visibleLeetCode = false;
            this.showProfileDiv = false;
            this.authService.refresh();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: 'Failed to update LeetCode profile.',
            });
          }
        },
        error: (error) => {
          this.isUpdatingLeetCodeProfile = false;
          console.error('Error updating profile:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update LeetCode profile.',
          });
        },
      });
  }

  resetLeetCode() {
    this.profile = null;
    this.leetcodeUserName = '';
    this.visibleLeetCode = true;
    this.showProfileDiv = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Profile not updated',
      detail: 'LeetCode profile has not been updated.',
    });
  }
}
