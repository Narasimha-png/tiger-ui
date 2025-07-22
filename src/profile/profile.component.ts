import { Component, Input } from '@angular/core';
import { User } from '../app/profile.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input()
  user :User|undefined ;
}
