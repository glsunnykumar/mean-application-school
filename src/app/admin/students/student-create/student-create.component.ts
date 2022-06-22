import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {mimeType} from '../mime-type.validator'
import {StudentService} from '../student.service';
interface category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})


export class StudentCreateComponent implements OnInit {
  private mode = 'create';
  isLoading = false;

  categories: category[] = [
    {value: 'gen', viewValue: 'gen'},
    {value: 'obc', viewValue: 'obc'},
    {value: 'sc', viewValue: 'sc'},
    {value: 'st', viewValue: 'st'},
  ];

  form: FormGroup;
  imagePreview: string;

  constructor(public studentService: StudentService, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'name': new FormControl(null, {
        validators: [Validators.required]
      }),
      'fathername': new FormControl(null),
      'mothername': new FormControl(null),
      'address': new FormControl(null),
      'category': new FormControl(null),
      'class': new FormControl(null),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
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

  saveStudent(){

    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
     this.studentService.addStudent(this.form.value.name, this.form.value.fathername, this.form.value.mothername, this.form.value.address,this.form.value.category,this.form.value.class, this.form.value.image);
    }
    else {
      //this.categoryService.updateCategory(this.catId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();

  }

  }


