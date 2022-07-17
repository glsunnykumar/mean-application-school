import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {TopSlider} from './topslider.model';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

   // id : string;
  // heading:string;
  // subheading:string;
  // imagePath : string;

  private slides: TopSlider[] = [];
  private slidesUpdated = new Subject<TopSlider[]>();

  constructor(private http:HttpClient,private router:Router) { }

  addSlide(heading: string, subheading: string, image: File){
    const slideData = new FormData();
    slideData.append("heading", heading);
    slideData.append("subheading", subheading);
    slideData.append("image", image, heading);

    this.http.post<{message:string , slide:TopSlider}>('http://localhost:3000/api/slides/',slideData)
    .subscribe((responseData)=>{
      console.log(responseData);
      const slide: TopSlider = { id: responseData.slide.id, heading: heading,subheading:subheading, imagePath: responseData.slide.imagePath };

      window.alert('The slide has been added!');
      this.slides.push(slide);
      this.slidesUpdated.next([...this.slides]);
      this.router.navigate(["/admin/slide"]);
    })
  }

  getslides() {
    this.http.get<{ message: string, slides: any }>('http://localhost:3000/api/slides')
      .pipe(map((slideData) => {
        return slideData.slides.map(sli => {
          return {
            heading: sli.heading,
            subheading: sli.subheading,
            imagePath: sli.imagePath,
            id:sli._id
          };
        });
      }))
      .subscribe(TransformedslideData => {
        this.slides = TransformedslideData;
        this.slidesUpdated.next([...this.slides]);
      });

  }

  getslide(id: string) {
    return this.http.get<{ _id: string, heading: string, subheading: string, imagePath: string }>('http://localhost:3000/api/slides/' + id)
  }



  getslideUpdatedListner(){
    return this.slidesUpdated.asObservable();
  }
}
