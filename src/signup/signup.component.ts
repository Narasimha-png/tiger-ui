import { Component, inject, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { ImportsModule } from '../app/imports';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { LeetCodeProfile, ProfileService, User } from '../app/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../app/auth.service';
import { LeetcodeComponent } from '../leetcode/leetcode.component';
import { GithubComponent } from '../github/github.component';

@Component({
  selector: 'app-signup',
  imports: [ImportsModule, ReactiveFormsModule, FormsModule, LeetcodeComponent, GithubComponent],
  providers: [MessageService, { provide: LOCALE_ID, useValue: 'en-IN' }, ProfileService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  loading: boolean | undefined;
  showProfileDiv: boolean |undefined;
  btnName: string ="" ;
  btnNames: string[] = [ 'yes, its me', 'no, its not me' ];
  activeStep: number = 1;
  profile?: LeetCodeProfile;
  name: string | undefined;
  value: number = 2;
  email: string | undefined;
  leetcodeUserName: string = '';
  password: string = '';
  visibleLeetCode: boolean = false;
  visibleGitHub: boolean = false;
   visible: boolean = false;

    showDialog() {
        this.visible = true;
    }


  showLeetcode() {
    this.visibleLeetCode = true;
    this.loading = false ;
    this.showProfileDiv = false ;
  }
  showGitHub() {
    this.visibleGitHub = true;
  }
  files = [];
  totalSize: number = 0;

  totalSizePercent: number = 0;
  index: number = 0;
  platformId = inject(PLATFORM_ID);
  user:User |undefined ;

  constructor(
    private config: PrimeNG,
    private messageService: MessageService,
    private profileService: ProfileService , 
    private route: ActivatedRoute , 
    public router:Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.refreshNav.subscribe(val => {
    this.user = undefined ;
    if (this.authService.loggedIn.value) {
      this.profileService.getUserProfile().subscribe(user => {
        this.user = user;
        console.log(user) ;
      });

    }
  });
    this.btnName = this.btnNames[0]; 
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('sessionId');
      if (token) {
        this.router.navigate(['/dashboard']);
      }
    }
    this.route.queryParams.subscribe((params) => {
      if (params['code']) { 
        this.authService.login(params['code']);
        this.activeStep = 2;
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'You have successfully logged in.',
          life: 3000,
        });
       
      }
    });
  }

  choose(event: any, callback: any) {
    callback();
  }

  onRemoveTemplatingFile(
    event: any,
    file: any,
    removeFileCallback: any,
    index: any
  ) {
    removeFileCallback(event, index);
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: any) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
      life: 3000,
    });
  }

  onSelectedFiles(event: any) {
    this.files = event.currentFiles;
    this.files.forEach((file) => {});
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: any) {
    callback();
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  }
  showLeetcodeProfile(): void {
    this.loading = true;
    this.showProfileDiv = true;
    if (this.leetcodeUserName.trim() === '') {
        this.loading = false;
    this.showProfileDiv = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please enter a valid username.',
      });
      return;
    }
    this.profileService.getLeetCodeProfile(this.leetcodeUserName).subscribe(
      (profile: LeetCodeProfile) => {
         if( profile.ranking ==null || profile.ranking == undefined) {   
        this.showProfileDiv = false ;
          this.messageService.add({
            severity: 'warn', summary:'No user found with this username',
            detail: 'Please check the username and try again.',})
        }
        console.log(profile);
        this.loading = false;
        this.profile = profile;
        this.visibleLeetCode = true;
       
      },
      (error) => {
        this.showProfileDiv = false ;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch profile.',
        });
      }
    );
  }

  loginWithLinkedIn() {
    window.location.href = 'http://localhost:8080/api/tiger/user/linkedin/login';
    }
}
