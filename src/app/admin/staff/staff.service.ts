import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {Staff} from './staff.model';

// id : string;
// name:string;
// qualifistaffion:string;
// classteacher: string;
// imagePath : string;
// testimonial:string

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private staff : Staff[] = [];
  private staffUpdated = new Subject<Staff[]>();

  constructor(private http:HttpClient,private router :Router) { }


  addStaff(name: string,qualification:string,classteacher:string,testimonial:string, image: File){
    const staffData = new FormData();
    staffData.append("name", name);
    staffData.append("qualification", qualification);
    staffData.append("classteacher", classteacher);
    staffData.append("testimonial", testimonial);
    staffData.append("image", image, name);

    this.http.post<{message:string , staff:Staff}>('http://localhost:3000/api/staff/',staffData)
    .subscribe((responseData)=>{
      console.log(responseData);
      const staff: Staff = { id: responseData.staff.id, name: name,qualification :qualification,classteacher:classteacher,testimonial:testimonial, imagePath: responseData.staff.imagePath };

      window.alert('The staff has been added!');
      this.staff.push(staff);
      this.staffUpdated.next([...this.staff]);
      this.router.navigate(["/admin/staff"]);
    })
  }

  getAllStaff() {
    this.http.get<{ message: string, staff: any }>('http://localhost:3000/api/staff')
      .pipe(map((staffData) => {
        return staffData.staff.map(staff => {
          return {
            name: staff.name,
            qualification: staff.qualification,
            testimonial: staff.testimonial,
            classteacher: staff.classteacher,
            id: staff._id,
            imagePath: staff.imagePath
          };
        });
      }))
      .subscribe(TransformedstaffData => {
        this.staff = TransformedstaffData;
        this.staffUpdated.next([...this.staff]);
      });

  }




  getstaffUpdatedListner(){
    return this.staffUpdated.asObservable();
  }


  getStaff(id: string) {
    return this.http.get<{ _id: string, name: string, qualification: string,classteacher: string,testimonial:string, imagePath: string }>('http://localhost:3000/api/staff/' + id)
  }

} 
