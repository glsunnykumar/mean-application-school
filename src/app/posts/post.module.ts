
import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialMOdule } from '../angular.material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';

@NgModule({
declarations:[
  PostListComponent,
  PostCreateComponent
],
imports :[
  CommonModule,
  ReactiveFormsModule,
  AngularMaterialMOdule,
  RouterModule

]

})
export class PostsModule {}