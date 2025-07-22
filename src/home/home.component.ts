import { Component } from '@angular/core';
import { ImportsModule } from '../app/imports';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ImportsModule ],
  providers: [MessageService],
  templateUrl: './home.component.html',
   styleUrl:  './home.component.scss'
})
export class HomeComponent {
   items: any[] =[];

    constructor(private messageService: MessageService, public router:Router) {}

    ngOnInit() {
       
       
    }
}
