import { Component } from '@angular/core';
import { ImportsModule } from '../app/imports';
import { ProfileService, Roasts } from '../app/profile.service';

@Component({
  selector: 'app-roastings',
  imports: [ImportsModule],
  providers:[ProfileService],
  templateUrl: './roastings.component.html',
  styleUrl: './roastings.component.scss'
})
export class RoastingsComponent {
  items: { label?: string; icon?: string; separator?: boolean }[] = [];
  roastings:Roasts[] |null = null ;
  constructor(private profileService: ProfileService){}
    ngOnInit() {
        this.items = [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh'
            }
        ];
        this.profileService.getUserRoasts().subscribe(
          (response)=> {   
            this.roastings = response ;
          }
          ,(error)=>{
          
            console.log(error) ;
          }
        )
    }
}
