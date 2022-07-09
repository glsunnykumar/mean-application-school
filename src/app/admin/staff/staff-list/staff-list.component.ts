import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { StaffService } from '../staff.service';
import { Staff } from '../staff.model';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['imageUrl','name','qualification','classteacher','action'];
  //displayedColumns: string[] = ['imageUrl','Name' ,'FatherName','action'];
  private stuSubs: Subscription;
  dataSource =null;

  
  staffs: Staff[] = [];

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(public staffService: StaffService) { }

  ngOnInit(): void {
    console.log("loading staff");
    this.isLoading = true;
    this.staffService.getAllStaff();
    this.stuSubs = this.staffService.getstaffUpdatedListner().subscribe((staff: Staff[]) => {
      this.isLoading = false;
      this.staffs = staff;
      this.dataSource = new MatTableDataSource<Staff>(this.staffs);
      console.log(this.staffs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
