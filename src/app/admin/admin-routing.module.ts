import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardmainComponent } from './dashboardmain/dashboardmain.component';
import { NavigationDemoComponent } from './navigation-demo/navigation-demo.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { StudentListComponent } from './students/student-list/student-list.component';


const routes :Routes =[
  {
     path:'',
     component :NavigationDemoComponent,
  children :[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path:'dashboard' , component:DashboardmainComponent},
  {path:'navigation', component:DashboardmainComponent},
  {path:'student-create', component:StudentCreateComponent},
  {path:'students', component:StudentListComponent}
  ]
}
]


@NgModule({

  imports :[
    RouterModule.forChild(routes)
  ],
  exports :[RouterModule]

})
export class AdminRoutingModule {

}
