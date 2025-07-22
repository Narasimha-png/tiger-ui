import { Component, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ImportsModule } from '../app/imports';

@Component({
  selector: 'app-unauthorised',
  imports: [ImportsModule],
  templateUrl: './unauthorised.component.html',
  styleUrl: './unauthorised.component.scss'
})
export class UnauthorisedComponent {
  public router = inject(Router) ;
}
