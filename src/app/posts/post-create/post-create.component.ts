import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Post} from '../post.model';
import {mimeType} from './mime-type.validator';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit ,OnDestroy {

  private mode ='create';
  private postId : string;
  post : Post;
  form:FormGroup;
  isLoading = false;
  imagePreview : string;
  private authStatusSub :Subscription

  constructor(public postService : PostService ,
    public route:ActivatedRoute ,
    private authService: AuthService
    ) { }

  ngOnInit(){
    this.authStatusSub = this.authService.getAuthListenerStatus().subscribe(authStatus =>{
      this.isLoading = false;
    })
    this.form =new FormGroup({
      'title' : new FormControl(null ,{validators: [Validators.required,Validators.minLength(3)]}),
      'content' :new FormControl(null,{validators :[Validators.required]}),
      'image': new FormControl(null ,{validators:[Validators.required] ,asyncValidators:mimeType})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading =true;
        this.postService.getPost(this.postId).subscribe(postdata =>{

          this.isLoading = false;
          this.post={id:postdata._id,title :postdata.title,content:postdata.content ,imagePath:postdata.imagePath,creator:postdata.creator};
          this.form.setValue({
            'title': this.post.title ,
            'content' : this.post.content,
            'image': this.post.imagePath
          });

        });
        //this.post = this.postService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
        this.isLoading = false;
      }
    });
  }

   enteredTitle ='';
   enteredContent = '';

  onFilePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({'image':file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
    this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

  onPostCreate(){
    if(this.form.invalid){
      return ;
    }
    this.isLoading= true;
    if(this.mode ==='create'){
      console.log('adding post');
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
        );
    }
    else{
      this.postService.updatePost(
        this.postId,this.form.value.title,
        this.form.value.content,
        this.form.value.image)
    };
    this.form.reset();
  }

}
