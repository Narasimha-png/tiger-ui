import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RoastingsComponent } from '../roastings/roastings.component';
import { SpycamComponent } from '../spycam/spycam.component';
import path from 'path';
import { LeetcodeComponent } from '../leetcode/leetcode.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { UnauthorisedComponent } from '../unauthorised/unauthorised.component';
import { ProfileComponent } from '../profile/profile.component';
import { ActivityComponent } from '../activity/activity.component';
import { SettingsComponent } from '../settings/settings.component';
import { GithubComponent } from '../github/github.component';
import { StreakComponent } from '../streak/streak.component';

export const routes: Routes = [
     {path: '', component:HomeComponent},
    {path: 'signup', component:SignupComponent}, 
    {path:'dashboard', component:DashboardComponent},
    {path:'roastings', component:RoastingsComponent},
    {path:'spycam' , component:SpycamComponent},
    {path: 'leetcode', component:LeetcodeComponent},
    {path:'unauthorised' , component:UnauthorisedComponent },
    {path:'activity', component:ActivityComponent },
    {path:'settings', component:SettingsComponent },
    {path:'streak' , component:StreakComponent },
    {path:'**' , component:PagenotfoundComponent}
   
];
