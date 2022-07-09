import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../mime-type.validator';

import {Staff} from '../staff.model';
import{StaffService} from '../staff.service';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit {

  private mode = 'create';
  isLoading = false;

  enteredTitle = '';

  enteredContent = '';
  staff : Staff;
  form:FormGroup;
  imagePreview: string;

  private staffId: string;


  constructor(public staffService: StaffService, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'name': new FormControl(null, {
        validators: [Validators.required]
      }),
      'fathername': new FormControl(null),
      'qualification': new FormControl(null),
      'classteacher': new FormControl(null),
      'testimonial': new FormControl(null),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
       this.staffId = paramMap.get('id');
        this.isLoading =true;
      this.staffService.getStaff(this.staffId).subscribe(staffId =>{
       this.isLoading =false;
       this.staff ={id : staffId._id,name :staffId.name,qualification:staffId.qualification,classteacher:staffId.classteacher,testimonial:staffId.testimonial,imagePath :staffId.imagePath};
       console.log(this.staff.imagePath);
       this.form.setValue({
            'name':this.staff.name ,'qualification': this.staff.qualification,
            'testimonial':this.staff.testimonial,
            'classteacher':this.staff.classteacher,
           'image':this.staff.imagePath

          });
          this.imagePreview =this.staff.imagePath;
          this.form.get('image').updateValueAndValidity();
       });
      }
       else {
        this.mode = 'create';
       this.staffId = null;
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

  savestaff(){

    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
     this.staffService.addStaff(this.form.value.name, this.form.value.qualification, this.form.value.classteacher, this.form.value.testimonial, this.form.value.image);
    }
    else {
      //this.staffService.updatestaff(this.catId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();

  }

}
