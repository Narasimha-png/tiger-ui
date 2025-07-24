import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


export interface LeetCodeProfile {
  name: string;
  avatar: string;
  ranking: number;
  school: string;
  about: string;
}
export interface Roasts{
  name:string ;
  message:string[] ;
  timestamp:string ;

}
export interface Activity{
  status: string|null ;
  timestamp:string|null ;

}
export interface User {
  userId: number;
  name: string;
  gmail: string;
  password: string | null;
  githubProfile: string | null;
  targetCommits: number | null;
  leetcodeProfile: string | null;
  targetSubmissions: number | null;
  joinedAt:string ;
}

export interface Response{
  message: string;
  status: number;
}
export interface authToken {
  access_token: string;
}
export interface LinkedinTotalPosts{
  totalPosts:string ;
}

export interface GithubProfile{
    login:string ;
    avatar_url: string,
    bio:string,
    public_repos:string,
    name: string,
    followers: Number,
    following: Number

}
export interface GitStreak {
  todayCommits: number;
  recordedAt: string | null;
  user:User ;
 
}

export interface LeetcodeStreak {
  leetcodeId: number;
  todaySubmissions: number;
  recordedAt: string;
  user:User ;
 
}

export interface StreakData {
  targetCommits: number;
  targetSubmssions: number;
  gitStreak: GitStreak[];
  leetcodeStreak: LeetcodeStreak[];
  
  joinedAt:string ;
}
export interface Submission{
  title:string ;
  titleSlug:string ;
  timestamp:string ;
  lang:string ;
}
export interface GitStreak {
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private http: HttpClient) { }
  getLeetCodeProfile(userName:String ):Observable<LeetCodeProfile> {
    return this.http.get<LeetCodeProfile>(`https://tiger-backend-production.up.railway.app/api/tiger/leetcode/profile/${userName}`);
  }

  updateLeetCodeProfile(userName: string ,  progress:number): Observable<Response> {
    
    return this.http.patch<Response>(`https://tiger-backend-production.up.railway.app/api/tiger/user/leetcode`, {
      "leetcodeProfile":userName,
      "targetSubmissions":progress
    });
  }
  updateGitHubProfile(userName: string, progress:number): Observable<any> {
    return this.http.patch<any>(`https://tiger-backend-production.up.railway.app/api/tiger/user/github`, {
      "githubProfile": userName,
      "targetCommits":progress
    });
  }
  getUserProfile():Observable<User>{
    return this.http.get<User>('https://tiger-backend-production.up.railway.app/api/tiger/user/profile') ;
  }
  logoutUser():Observable<Response>{
    return this.http.post<Response>('https://tiger-backend-production.up.railway.app/api/tiger/user/logout', {}) ;
  }
  userActivity():Observable<Activity[]>{
    return this.http.get<Activity[]>('https://tiger-backend-production.up.railway.app/api/tiger/user/activity') ;
  }
  getUserRoasts():Observable<Roasts[]>{
    return this.http.get<Roasts[]>('https://tiger-backend-production.up.railway.app/api/tiger/user/roasts') ;
  }
  getGithubProfile(userName:string):Observable<GithubProfile>{
    return this.http.get<GithubProfile>(`https://tiger-backend-production.up.railway.app/api/tiger/github/profile/${userName}`) ;
  }
  getStreak():Observable<StreakData>{
    return this.http.get<StreakData>('https://tiger-backend-production.up.railway.app/api/tiger/user/streak') ;
  }
  todayLeetcodeStreak():Observable<Submission[]>{
    return this.http.get<Submission[]>("https://tiger-backend-production.up.railway.app/api/tiger/leetcode/todaystreak") ;
  }
  todayGitStreak():Observable<GitStreak[]>{
    return this.http.get<GitStreak[]>("https://tiger-backend-production.up.railway.app/api/tiger/github/todaystreak") ;
  }
  totalLinkedinPosts():Observable<LinkedinTotalPosts>{
    return this.http.get<LinkedinTotalPosts>('https://tiger-backend-production.up.railway.app/api/tiger/user/totalposts') ;

  }
  toggleLinkedinService(linkedinService:boolean):Observable<Response>{
    return this.http.post<Response>('https://tiger-backend-production.up.railway.app/api/tiger/user/linkedinservice', {
       "linkedinPostService":linkedinService
    })
  }
  postFcmToken(fcmToken:string):Observable<Response>{
    return this.http.post<Response>('https://tiger-backend-production.up.railway.app/api/tiger/user/addnotificationdevice', {
       "fcmToken":fcmToken
    })
  }
}
