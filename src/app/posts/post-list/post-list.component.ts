import { Component, OnInit ,Input, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import{Subscription} from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import {Post} from '../post.model';
import{PostService} from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit ,OnDestroy{
  constructor(public postService : PostService ,private authService : AuthService ) {}

  ngOnDestroy(){
    this.postSubs.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  posts :Post[] = [];
  isLoading= false;
  totalPost =0;
  pageSize =3;
  currentPageIndex =1
  isAuthenticated = false;
  userId : string;
  private postSubs : Subscription;
  private authStatusSub : Subscription;
  ngOnInit(){
    this.isLoading = true;
   this.postService.getPosts(this.pageSize,this.currentPageIndex);
   this.userId = this.authService.getUserId();
   this.postSubs = this.postService.getPostUpdateListner().
   subscribe((postData :{post:Post[] ,postCount :number}) =>{
     this.isLoading = false;
     this.totalPost = postData.postCount;
     this.posts =postData.post;
    });
    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSub= this.authService.getAuthListenerStatus().subscribe(isAuthenticated =>{
      this.isAuthenticated= isAuthenticated;
      this.userId =this.authService.getUserId();
    })
  }

  onDelete( id :string){
    this.isLoading = true;
    this.postService.deletePost(id).subscribe(()=>{
      this.postService.getPosts(this.pageSize,this.currentPageIndex);
    });
  }

  onPageChanged(pageData:PageEvent){
    this.isLoading = true;
   this.currentPageIndex = pageData.pageIndex +1;
   this.pageSize =pageData.pageSize;
   this.postService.getPosts(this.pageSize,this.currentPageIndex);
  }


}
