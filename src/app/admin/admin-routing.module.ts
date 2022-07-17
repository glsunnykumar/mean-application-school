import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardmainComponent } from './dashboardmain/dashboardmain.component';
import { NavigationDemoComponent } from './navigation-demo/navigation-demo.component';
import { StaffCreateComponent } from './staff/staff-create/staff-create.component';
import { StaffListComponent } from './staff/staff-list/staff-list.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import {NoticeCreateComponent} from './notice/notice-create/notice-create.component';
import {NoticeListComponent} from './notice/notice-list/notice-list.component';
import {TopsliderCreateComponent} from './topslide/topslider-create/topslider-create.component';
import { TopsliderListComponent} from './topslide/topslider-list/topslider-list.component';
const routes: Routes = [
  {
    path: '',
    component: NavigationDemoComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardmainComponent },
      { path: 'navigation', component: DashboardmainComponent },
      { path: 'student-create', component: StudentCreateComponent },
      { path: 'students', component: StudentListComponent },
      { path: 'students/edit/:id', component: StudentCreateComponent },
      { path: 'staff-create', component: StaffCreateComponent },
      { path: 'staff', component: StaffListComponent },
      { path: 'staff/edit/:id', component: StaffCreateComponent },
      { path: 'notice-create', component: NoticeCreateComponent },
      { path: 'notice', component: NoticeListComponent },
      { path: 'slide-create', component: TopsliderCreateComponent },
      { path: 'slide', component: TopsliderListComponent },
      { path: 'slide/edit/:id', component: TopsliderCreateComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
