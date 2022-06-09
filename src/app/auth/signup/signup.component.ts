import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  isLoading = false;
  private authStatusSub : Subscription;
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

  onSignup(form :NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.CreateUser(form.value.email,form.value.password);
  }

}
