import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})


export class StudentListComponent implements OnInit {
   isLoading = false;
   displayedColumns: string[] = ['imageUrl','Name','fathername','studentclass','action'];
   //displayedColumns: string[] = ['imageUrl','Name' ,'FatherName','action'];
   private stuSubs: Subscription;
   dataSource =null;

   students: Student[] = [];

   @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
   @ViewChild(MatSort,{static: false}) sort: MatSort;
  constructor(public studentService: StudentService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.studentService.getStudents();
    this.stuSubs = this.studentService.getStudentUpdatedListner().subscribe((student: Student[]) => {
      this.isLoading = false;
      this.students = student;
     this.dataSource = new MatTableDataSource<Student>(this.students);

     console.log(this.students);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
