import { Component, Input } from '@angular/core';
import { ImportsModule } from '../app/imports';
import { MessageService } from 'primeng/api';
import { GithubProfile, ProfileService, User } from '../app/profile.service';
import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-github',
  
    imports: [ImportsModule],
    providers: [MessageService, ProfileService],
  templateUrl: './github.component.html',
  styleUrl: './github.component.scss'
})
export class GithubComponent {
   @Input()
  github: User | null | undefined = null;
   gitUserName: string | null | undefined = this.github?.githubProfile;
  progress:number = 2 ;
   GithubUserName: string = '';
   profile: GithubProfile | null = null;
   loading: boolean = false;
   showProfileDiv: boolean = false;
   visibleGithub: boolean = false;
   isUpdatingGithubProfile = false;
 
 
 
   constructor(
     private messageService: MessageService,
     private profileService: ProfileService, 
     private authService:AuthService
   ) {}
 
   ngOnInit(){

   }
   showGithubProfile(): void {
     this.loading = true;
     this.showProfileDiv = true;
     if (this.GithubUserName.trim() === '') {
       this.loading = false;
       this.showProfileDiv = false;
       this.messageService.add({
         severity: 'warn',
         summary: 'Username is required',
         detail: 'Please enter a valid Github username.',
       });
       return;
     }
 
     this.profileService.getGithubProfile(this.GithubUserName).subscribe(
       (profile: GithubProfile) => {
         this.loading = false;
         if (profile.login == null || profile.login === undefined || profile.login.length == 0) {
           this.showProfileDiv = false;
           this.messageService.add({
             severity: 'warn',
             summary: 'No user found with this username',
             detail: 'Please check the username and try again.',
           });
           return;
         }
 
         this.profile = profile;
         this.visibleGithub = true;
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
 
   showGithub(): void {
     this.authService.refresh() ;
     this.visibleGithub = true;
     this.loading = false;
     this.showProfileDiv = false;
      if (this.github != null && this.github.githubProfile != null) {
      this.GithubUserName = this.github.githubProfile ;
      this.progress = this.github?.targetCommits ?? 2;
      this.showGithubProfile() ;
    }
   }
   
   updateGithubProfile() {
   this.isUpdatingGithubProfile = true;  
 
   this.profileService.updateGitHubProfile(this.GithubUserName, this.progress).subscribe({
     next: (response) => {
       this.isUpdatingGithubProfile = false;  
       if (response.status === 200) {
         this.messageService.add({
           severity: 'success',
           summary: 'Profile Updated',
           detail: 'Github profile updated successfully.',
         });
         this.visibleGithub = false;
         this.showProfileDiv = false;
         this.authService.refresh() ;
       } else {
         this.messageService.add({
           severity: 'error',
           summary: 'Update Failed',
           detail: 'Failed to update Github profile.',
         });
       }
     },
     error: (error) => {
       this.isUpdatingGithubProfile = false;  
       console.error('Error updating profile:', error);
       this.messageService.add({
         severity: 'error',
         summary: 'Error',
         detail: 'Failed to update Github profile.',
       });
     },
   });
 }
 
   resetGithub() {
     this.profile = null;
     this.GithubUserName = '';
     this.visibleGithub = true;
     this.showProfileDiv = false;
     this.messageService.add({
       severity: 'info',
       summary: 'Profile not updated',
       detail: 'Github profile has not been updated.',
     });
   }
}
