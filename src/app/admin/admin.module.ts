import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularMaterialMOdule} from '../angular.material.module';
import {AdminRoutingModule} from './admin-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';


import {DashboardComponent} from './dashboard/dashboard.component';
@NgModule({

  declarations :[
    DashboardComponent
  ],
  imports :[
    CommonModule,
    AngularMaterialMOdule,
    FormsModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,

  ]

})
export class AdminModule {}
