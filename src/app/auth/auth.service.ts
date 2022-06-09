import{Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';
import {AuthData} from '../auth/auth-data.model';
import { Subject } from 'rxjs';

import {environment} from '../../environments/environment';
const BACKEND_URL =environment.apiUrl + "/users/";

@Injectable({providedIn: "root"})
export class AuthService{
  private token : string ;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer :any ;
  private userID : string;
  constructor(private http :HttpClient ,private router:Router){

  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthListenerStatus(){
   return this.authStatusListener.asObservable();
  }

  getToken(){
    return this.token;
  }

  getUserId(){
    return this.userID;
  }
  CreateUser(email:string ,password:string){
       const authdata :AuthData ={
         email :email,
         password:password
       }
       console
       this.http.post(BACKEND_URL + "signup",authdata)
       .subscribe(result =>{
         this.router.navigate["/"];
       },error=>{
        this.authStatusListener.next(false);
       })
  }

  autoAuthUser(){
   const authInformation= this.getAuthData();
   if(!authInformation){
     return;
   }
   const now=  new Date;
   const expireIn= authInformation.expirationDate.getTime() - now.getTime() ;
   if(expireIn >0){
     this.token = authInformation.token;
     this.userID= authInformation.userId;
     this.isAuthenticated = true;
     this.authStatusListener.next(true);
     this.setAuthTimer(expireIn/1000);
   }
  }
  login(email :string ,password:string){
    const authdata :AuthData ={
      email :email,
      password:password
    }
    this.http.post<{token :string ,expireIn:number,userId:string}>( BACKEND_URL + "login",authdata)
    .subscribe(response=>{
      const token = response.token;
      this.token = token;
      if(token){
        const expireInDuration = response.expireIn;
      this.setAuthTimer(expireInDuration);
        this.isAuthenticated = true;
        this.userID = response.userId;
        this.authStatusListener.next(true);
        const now= new Date();
        const expirationDate = new Date(now.getTime()+expireInDuration*1000)
        this.saveAuthData(token,expirationDate,this.userID);
        this.router.navigate(['/admin/dashboard']);
      }

    },error =>{
      this.authStatusListener.next(false);
    })
  }

  private setAuthTimer(duration :number){
    this.tokenTimer=  setTimeout(() => {
      this.logout();
    }, duration* 1000);
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userID = null;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  private saveAuthData(token :string ,expirationDate:Date,userId:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
    localStorage.setItem('userId',userId);


  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");

  }

  private getAuthData(){
    const token =localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate){
      return;
    }
    return{
      token :token,
      expirationDate : new Date(expirationDate),
      userId: userId
    }
  }
}
