import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  isLoading = false;
  private authStatusSub :Subscription;
  constructor(public authService : AuthService) {

   }

   ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

 ngOnInit(){
  this.authStatusSub = this.authService.getAuthListenerStatus().subscribe(authStatus =>{
    this.isLoading = false;
  });
 }

  onLogin(form :NgForm){
    this.isLoading =true;
  this.authService.login(form.value.email ,form.value.password);
  }

}
