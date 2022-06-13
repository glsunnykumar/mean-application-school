import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularMaterialMOdule } from './angular.material.module';
import {PostsModule} from './posts/post.module';
import {HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {ErrorComponent} from './error/error.component'
import {AppRoutingModule} from './app-routing.moudule';
import {AuthInterceptor} from './auth/auth-interceptor';
import {ErrorInterceptor} from './error-interceptor';
import { FooterComponent } from './footer/footer.component';
import { CarsouelComponent } from './carsouel/carsouel.component';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import {GalleryService} from './gallery/gallery.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,

    FooterComponent,

    CarsouelComponent,

    HomeComponent,

    ActivityComponent,

    ContactComponent,

    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialMOdule,
    PostsModule

  ],
  providers: [
    {provide : HTTP_INTERCEPTORS , useClass:AuthInterceptor ,multi:true},
    {provide : HTTP_INTERCEPTORS , useClass:ErrorInterceptor ,multi:true},
    GalleryService
  ],

  bootstrap: [AppComponent],
  entryComponents :[ErrorComponent]
})
export class AppModule { }
