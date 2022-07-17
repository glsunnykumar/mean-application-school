import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Notice } from '../notice.model';
import {NoticeService} from '../notice.service';


@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {

  isLoading = false;
   displayedColumns: string[] = ['title','pubdate','action'];
   //displayedColumns: string[] = ['imageUrl','Name' ,'FatherName','action'];
   private stuSubs: Subscription;
   dataSource =null;

   notices: Notice[] = [];

   @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
   @ViewChild(MatSort,{static: false}) sort: MatSort;
  constructor(public noticeService: NoticeService) { }


  ngOnInit(): void {
    this.isLoading = true;
    this.noticeService.getNotices();
    this.stuSubs = this.noticeService.getNoticeUpdatedListner().subscribe((notice: Notice[]) => {
      this.isLoading = false;
      this.notices = notice;
     this.dataSource = new MatTableDataSource<Notice>(this.notices);

     console.log(this.notices);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

}
