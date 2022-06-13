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
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavigationDemoComponent } from '../admin/navigation-demo/navigation-demo.component';
import { DashboardmainComponent } from './dashboardmain/dashboardmain.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({

  declarations :[
    DashboardComponent,
    NavigationDemoComponent,
    DashboardmainComponent,
  ],
  imports :[
    CommonModule,
    AngularMaterialMOdule,
    FormsModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,

  ]

})
export class AdminModule {}
