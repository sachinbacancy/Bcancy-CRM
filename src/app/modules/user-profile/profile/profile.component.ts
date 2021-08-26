import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user:any;
  public editMode: boolean = false;
  editForm : FormGroup;
  userData: any;
  constructor(private authService: AuthService, private fb: FormBuilder,private toastr: ToastrService) {
    
   }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem('userData'));
    console.log(this.user);
    this.createForm();
   
  }

  createForm() {
    this.editForm = this.fb.group({
      first_name: [this.user.data.first_name, 
        Validators.compose([
        Validators.required,
        Validators.maxLength(150),
      ])],
      last_name: [this.user.data.last_name, 
        Validators.compose([
          Validators.required,
          Validators.maxLength(150),
        ])],
      full_name: [this.user.data.full_name, 
        Validators.compose([
          Validators.required,
          Validators.maxLength(150),
        ])],
      email: [this.user.data.email, 
        Validators.compose([
          Validators.required,
          Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/),
          Validators.maxLength(100)
      ])],

    });    
    // this.editForm.patchValue({
    //   full_name:'test123'

    // });
  }

  
  onSubmit() {
    this.toastr.success('Hello world!', 'Toastr fun!');
    if (this.editForm.valid) {
        const formVal = this.editForm.value;
        const formData = new FormData();
        formData.append('first_name', formVal.first_name);
        formData.append('last_name', formVal.last_name);
        formData.append('full_name', formVal.full_name);
        formData.append('email', formVal.email);
        this.authService.updateUserData(formData, this.user.data.id).subscribe({
          next: (result: any) => {
            console.log(result);
          },
          error: err => {
            if (err.error && err.error.error) {
            } else {
            }
          },
          complete: () => { }
        });
     
    } else {
      // if form is not valid
      Object.keys(this.editForm.controls).forEach(field => {
        const control = this.editForm.get(field);
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      });
    }
  }
  

}
