import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialMOdule } from '../angular.material.module';
import { AdminRoutingModule } from './admin-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationDemoComponent } from '../admin/navigation-demo/navigation-demo.component';
import { DashboardmainComponent } from './dashboardmain/dashboardmain.component';
import { AdminComponent } from './admin.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { StudentListComponent } from './students/student-list/student-list.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { StaffCreateComponent } from './staff/staff-create/staff-create.component';
import { StaffListComponent } from './staff/staff-list/staff-list.component';
import { NoticeCreateComponent } from './notice/notice-create/notice-create.component';
import { NoticeListComponent } from './notice/notice-list/notice-list.component';
import { TopsliderCreateComponent } from './topslide/topslider-create/topslider-create.component';
import { TopsliderListComponent } from './topslide/topslider-list/topslider-list.component';
@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NavigationDemoComponent,
    DashboardmainComponent,
    StudentCreateComponent,
    StudentListComponent,
    StaffCreateComponent,
    StaffListComponent,
    NoticeCreateComponent,
    NoticeListComponent,
    TopsliderCreateComponent,
    TopsliderListComponent,
  ],
  imports: [
   
    AngularMaterialMOdule,
    FormsModule,
    AdminRoutingModule,
    CommonModule,
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
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatTabsModule
  ],
})
export class AdminModule {}
