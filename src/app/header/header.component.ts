import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{

  private authListnerSubs:Subscription;
  userIsAuthenticated = false;
  constructor(private authserice : AuthService) { }

  ngOnInit(){
    this.userIsAuthenticated= this.authserice.getIsAuth();
    this.authListnerSubs = this.authserice.getAuthListenerStatus().subscribe(isAuthenticated =>{
     this.userIsAuthenticated =isAuthenticated;
    });

  }

  ngOnDestroy(){
 this.authListnerSubs.unsubscribe();
  }

  onLogout(){
this.authserice.logout();
  }

}
