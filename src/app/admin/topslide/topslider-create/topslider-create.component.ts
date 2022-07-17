import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';

import {SliderService} from '../slider.service';
import{TopSlider} from '../topslider.model';


@Component({
  selector: 'app-topslider-create',
  templateUrl: './topslider-create.component.html',
  styleUrls: ['./topslider-create.component.css']
})
export class TopsliderCreateComponent implements OnInit {

  private mode = 'create';
  isLoading = false;

  enteredTitle = '';

  enteredContent = '';
  slide : TopSlider;
  form:FormGroup;
  imagePreview: string;

  private slideId: string;


  constructor(private slideService :SliderService , public route:ActivatedRoute) { }
  
  ngOnInit(): void {

    this.form = new FormGroup({
      'heading': new FormControl(null, {
        validators: [Validators.required]
      }),
      'subheading': new FormControl(null),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
       this.slideId = paramMap.get('id');
        this.isLoading =true;
      this.slideService.getslide(this.slideId).subscribe(slideId =>{
       this.isLoading =false;
       this.slide ={id : slideId._id,heading :slideId.heading,subheading:slideId.subheading,imagePath :slideId.imagePath};
       console.log(this.slide.imagePath);
       this.form.setValue({
            'heading':this.slide.heading ,'subheading': this.slide.subheading,
           'image':this.slide.imagePath

          });
          this.imagePreview =this.slide.imagePath;
          this.form.get('image').updateValueAndValidity();
       });
      }
       else {
        this.mode = 'create';
       this.slideId = null;
      }
    });

  }



  onImgePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveslide(){
    console.log('saving slide');
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    
    if (this.mode === 'create') {
     this.slideService.addSlide(this.form.value.heading, this.form.value.subheading, this.form.value.image);
    }
    else {
      //this.slideService.updateslide(this.catId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();

  }


}
