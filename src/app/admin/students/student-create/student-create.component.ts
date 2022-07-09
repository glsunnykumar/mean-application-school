import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {mimeType} from '../../mime-type.validator'
import { Student } from '../student.model';
import {StudentService} from '../student.service';
interface student {
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

  enteredTitle = '';

  enteredContent = '';
  student : Student;
  form:FormGroup;
  imagePreview: string;

  private stuId: string;

  categories: student[] = [
    {value: 'gen', viewValue: 'gen'},
    {value: 'obc', viewValue: 'obc'},
    {value: 'sc', viewValue: 'sc'},
    {value: 'st', viewValue: 'st'},
  ];



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
      'studentclass': new FormControl(null),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
       this.stuId = paramMap.get('id');
        this.isLoading =true;
      this.studentService.getStudent(this.stuId).subscribe(stuData =>{
       this.isLoading =false;
       this.student ={id : stuData._id,name :stuData.name,fathername:stuData.fathername,mothername:stuData.mothername,category:stuData.category ,studentclass :stuData.studentclass,address:stuData.address,imagePath :stuData.imagePath};
       console.log(this.student.imagePath);
       this.form.setValue({
            'name':this.student.name ,'fathername': this.student.fathername,
            'mothername':this.student.mothername,'category':this.student.category,'address':this.student.address,
            'studentclass':this.student.studentclass,
           'image':this.student.imagePath

          });
          this.imagePreview =this.student.imagePath;
          this.form.get('image').updateValueAndValidity();
       });
      }
       else {
        this.mode = 'create';
       this.stuId = null;
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

  saveStudent(){

    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
   // this.staffService.addStudent(this.form.value.name, this.form.value.fathername, this.form.value.mothername, this.form.value.address,this.form.value.student,this.form.value.class, this.form.value.image);
    }
    else {
      //this.studentService.updatestudent(this.catId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();

  }

  }


