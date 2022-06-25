import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {Student} from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private studentUpdated = new Subject<Student[]>();

  constructor(private http:HttpClient,private router:Router) { }

  addStudent(name: string, fathername: string,mothername:string,address:string,category:string,studentclass:string, image: File){
    const studentData = new FormData();
    studentData.append("name", name);
    studentData.append("fathername", fathername);
    studentData.append("mothername", mothername);
    studentData.append("address", address);
    studentData.append("category", category);
    studentData.append("studentclass", studentclass);
    studentData.append("image", image, name);

    this.http.post<{message:string , student:Student}>('http://localhost:3000/api/students/',studentData)
    .subscribe((responseData)=>{
      console.log(responseData);
      const student: Student = { id: responseData.student.id, name: name,fathername :fathername,mothername:mothername,address:address,category:category,studentclass:studentclass, imagePath: responseData.student.imagePath };

      window.alert('The student has been added!');
      this.students.push(student);
      this.studentUpdated.next([...this.students]);
      this.router.navigate(["/admin/students"]);
    })
  }

  getStudents() {
    this.http.get<{ message: string, students: any }>('http://localhost:3000/api/students')
      .pipe(map((catData) => {
        return catData.students.map(stu => {
          return {
            name: stu.name,
            fathername: stu.fathername,
            mothername: stu.mothername,
            address: stu.address,
            category: stu.category,
            studentclass :stu.studentclass,
            id: stu._id,
            imagePath: stu.imagePath
          };
        });
      }))
      .subscribe(TransformedcatData => {
        this.students = TransformedcatData;
        this.studentUpdated.next([...this.students]);
      });

  }

  getStudent(id: string) {
    return this.http.get<{ _id: string, name: string, fathername: string,mothername: string,category:string,address: string,studentclass: string, imagePath: string }>('http://localhost:3000/api/students/' + id)
  }



  getStudentUpdatedListner(){
    return this.studentUpdated.asObservable();
  }
}
