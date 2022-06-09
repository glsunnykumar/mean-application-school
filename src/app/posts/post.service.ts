import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Post } from '../posts/post.model';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';

const BACKEND_URL =environment.apiUrl + "/posts/";

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];

  private postUpdated = new Subject<{post: Post[] ,postCount :number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postPerPage :number , currentPage:number) {
    const queryParams =`?pagesize=${postPerPage} &page= ${currentPage}`;
    this.http
      .get<{ message: string; posts: any ,maxPost :number }>(BACKEND_URL + queryParams)
      .pipe(
        map((postData) => {
          return  {post :postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath:post.imagePath,
              creator :post.creator
            };
          }),
        maxPosts : postData.posts
      };
        })
      )
      .subscribe((transformPostData) => {
        console.log(transformPostData);
        this.posts = transformPostData.post;
        this.postUpdated.next({
          post :[...this.posts],
          postCount :transformPostData.maxPosts
        });
      });
  }

  getPostUpdateListner() {
    return this.postUpdated.asObservable();
  }

  getPost(postId: string) {
    return this.http.get<{ _id: string; title: string; content: string ,imagePath:string,creator:string}>(
      BACKEND_URL + postId
    );
    // return {...this.posts.find( p => p.id === postId)};
  }

  addPost(title: string, content: string,image:File) {
    const postData =new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image,title);
    console.log(postData);
    //const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
      )
      .subscribe((reponseData) => {

        this.router.navigate(['/']);
      });
  }

  updatePost(postId: string, title: string, content: string ,image:File | string) {
    let postData : Post | FormData;
    if(typeof(image) === 'object'){
      postData = new FormData();
     postData.append("id" , postId);
     postData.append("title",title);
     postData.append("content" ,content);
     postData.append("image",image ,title);
    }else{
       postData  = {
        id :postId ,
        title:title,
        content :content ,
        imagePath:image,
        creator:null
      };
    }
    //const post: Post = { id: postId, title: title, content: content ,imagePath:null };
    this.http
      .put(BACKEND_URL + postId, postData)
      .subscribe(response =>{
        // const updatedPost  = [...this.posts];
        // const oldPostIndex =  updatedPost.findIndex( p => p.id ===postId);
        // updatedPost[oldPostIndex] = post;
        // this.posts= updatedPost;
        // this.postUpdated.next({post :[...this.posts], postCount :ma});
        this.router.navigate(["/"]);
      });
  }

  deletePost(id: string) {
    return this.http.delete(BACKEND_URL + id);
    // .subscribe(() => {
    //   const updatedPost = this.posts.filter((post) => post.id !== id);
    //   this.posts = updatedPost;
    //   this.postUpdated.next([...this.posts]);
    // });
  }
}
