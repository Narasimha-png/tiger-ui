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
    return this.http.get<LeetCodeProfile>(`http://localhost:8080/api/tiger/leetcode/profile/${userName}`);
  }

  updateLeetCodeProfile(userName: string ,  progress:number): Observable<Response> {
    
    return this.http.patch<Response>(`http://localhost:8080/api/tiger/user/leetcode`, {
      "leetcodeProfile":userName,
      "targetSubmissions":progress
    });
  }
  updateGitHubProfile(userName: string, progress:number): Observable<any> {
    return this.http.patch<any>(`http://localhost:8080/api/tiger/user/github`, {
      "githubProfile": userName,
      "targetCommits":progress
    });
  }
  getUserProfile():Observable<User>{
    return this.http.get<User>('http://localhost:8080/api/tiger/user/profile') ;
  }
  logoutUser():Observable<Response>{
    return this.http.post<Response>('http://localhost:8080/api/tiger/user/logout', {}) ;
  }
  userActivity():Observable<Activity[]>{
    return this.http.get<Activity[]>('http://localhost:8080/api/tiger/user/activity') ;
  }
  getUserRoasts():Observable<Roasts[]>{
    return this.http.get<Roasts[]>('http://localhost:8080/api/tiger/user/roasts') ;
  }
  getGithubProfile(userName:string):Observable<GithubProfile>{
    return this.http.get<GithubProfile>(`http://localhost:8080/api/tiger/github/profile/${userName}`) ;
  }
  getStreak():Observable<StreakData>{
    return this.http.get<StreakData>('http://localhost:8080/api/tiger/user/streak') ;
  }
  todayLeetcodeStreak():Observable<Submission[]>{
    return this.http.get<Submission[]>("http://localhost:8080/api/tiger/leetcode/todaystreak") ;
  }
  todayGitStreak():Observable<GitStreak[]>{
    return this.http.get<GitStreak[]>("http://localhost:8080/api/tiger/github/todaystreak") ;
  }
  totalLinkedinPosts():Observable<LinkedinTotalPosts>{
    return this.http.get<LinkedinTotalPosts>('http://localhost:8080/api/tiger/user/totalposts') ;

  }
  toggleLinkedinService(linkedinService:boolean):Observable<Response>{
    return this.http.post<Response>('http://localhost:8080/api/tiger/user/linkedinservice', {
       "linkedinPostService":linkedinService
    })
  }
  postFcmToken(fcmToken:string):Observable<Response>{
    return this.http.post<Response>('http://localhost:8080/api/tiger/user/addnotificationdevice', {
       "fcmToken":fcmToken
    })
  }
}
