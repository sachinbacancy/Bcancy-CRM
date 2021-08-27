import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user:any;
  editForm : FormGroup;

  constructor(private leadService: AuthService, 
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('userData'));
    console.log(this.user);
    this.initForm();
  }

  initForm() {
    let first_name: string;
    let last_name: string;
    let fullname: string;
    let email: string;

    setTimeout(() =>{
      this.editForm.setValue({
        first_name: this.user.data.first_name,
        last_name: this.user.data.last_name,
        fullname: this.user.data.first_name+' '+this.user.data.last_name,
        email: this.user.data.email
      })
    });

    this.editForm = new FormGroup({
      'first_name': new FormControl(first_name,[
                                      Validators.required,
                                      Validators.maxLength(150),
                                    ]),
      'last_name': new FormControl(last_name,[
                                      Validators.required,
                                      Validators.maxLength(150),
                                    ]),
      'fullname': new FormControl(fullname,[
                                      Validators.required,
                                      Validators.maxLength(150),
                                    ]),
      'email': new FormControl(email,[
                                      Validators.required,
                                      Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/),
                                      Validators.maxLength(100)
                                  ]),

    });    
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.leadService.updateUserData(this.editForm.value, this.user.data.id).subscribe(
        (resData) => {
          console.log(resData);
          this.toastr.success('Successfull');
        },
        (error) => {
          console.log(error);
          this.toastr.error('Unsuccessfull')            
        });
    } 
  }
}