import { Component } from '@angular/core';
import { ImportsModule } from '../app/imports';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProfileService } from '../app/profile.service';

@Component({
  selector: 'app-home',
  imports: [ImportsModule ],
  providers: [MessageService],
  templateUrl: './home.component.html',
   styleUrl:  './home.component.scss'
})
export class HomeComponent {
   
   items: any[] =[];

    constructor(private messageService: MessageService, public router:Router, private profileService :ProfileService) {}

    ngOnInit() {
    }
    paymentCheckout() { 
     
      this.profileService.paymentCheckout().subscribe({
        next: (response) => {
          console.log('Payment checkout response:', response);
          window.location.href = response.url; 
        },
         error: (error) => {
            console.error('Payment checkout :', error);
            this.messageService.add({ severity: 'success', summary: 'Premium', detail: 'You already have subscription.' });
         }
    }) ;
   }

}
