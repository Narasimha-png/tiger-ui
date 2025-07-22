import { Component } from '@angular/core';
import { Activity, ProfileService } from '../app/profile.service';
import { DatePipe } from '@angular/common';
import { ImportsModule } from '../app/imports';

@Component({
  selector: 'app-activity',
  imports: [DatePipe, ImportsModule],
  providers:[ProfileService],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  activities: any[] =[];
  constructor(private profileService :ProfileService ){
    profileService.userActivity().subscribe(
      (response)=>{ this.activities = response;
       } )
      ,(error:any)=> {
        console.log(error) ;
      }
  }
}
