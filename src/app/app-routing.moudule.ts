import { NgModule } from "@angular/core";
import {RouterModule ,Routes} from "@angular/router";

import {HomeComponent} from './home/home.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {AuthGuard} from "./auth/auth-guard";
import { AuthService } from "./auth/auth.service";
import { ActivityComponent } from "./activity/activity.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { ContactComponent } from "./contact/contact.component";

const routes: Routes =[
  {path: '' , component :HomeComponent },
  {path:'activity', component:ActivityComponent},
  {path:'gallery', component:GalleryComponent},
  {path:'contact', component:ContactComponent},
  {path :'create' ,component :PostCreateComponent ,canActivate :[AuthGuard]},
  {path :'edit/:postId' ,component :PostCreateComponent ,canActivate :[AuthGuard]},
  {path :'auth' ,loadChildren: () => import('./auth/auth.module').then(m =>m.AuthModule)},
  {path :'admin' ,loadChildren: () => import('./admin/admin.module').then(m =>m.AdminModule)}
]

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports : [RouterModule],
providers :[AuthGuard]
})
export class AppRoutingModule{ }
