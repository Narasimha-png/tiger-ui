import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImportsModule } from '../app/imports';
import { ProfileService } from '../app/profile.service';
import { error } from 'console';
import { AuthService } from '../app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [ImportsModule],
  providers:[MessageService,ConfirmationService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  isLoading:boolean = false ;
   checked: boolean = false;
  constructor(private messageService:MessageService, private profileService:ProfileService
    ,
    private confirmationService: ConfirmationService, private authService:AuthService, private router:Router
  ){

  }
  ngOnInit(){
    this.checked = this.authService.getUser.value?.linkedinPostService || false;
  }
  

  onToggle(event: any) {
    this.checked = event.checked; 
    this.isLoading = true ;
   this.profileService.toggleLinkedinService(this.checked).subscribe(
    (res)=>{
      this.isLoading = false ;
      this.authService.refresh() ;
         this.messageService.add({
              severity: this.checked?'success':'error',
              summary: this.checked?'Linkedin post service activated.':'Linkedin post service has been deactivated.',
              
            });
    },
    (error)=>{
      this.isLoading = false ;
         this.messageService.add({
              severity: 'error',
              summary: 'Somthing went wrong',
              detail: 'Sorry for inconvinience. ',
            });
    }
   )
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
            this.messageService.add({
              severity: 'success',
              summary: 'Logout',
              detail: 'You have logged out. ',
            });
            this.router.navigate(['/']) ;
          },
          (error) => {
            console.log(error);

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
  
}
