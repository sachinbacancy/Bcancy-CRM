import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public socialUser: SocialUser;
  public isLoggedin : boolean = false;

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
  }

  constructor(private router: Router,
              private socialAuthService: SocialAuthService,
              private authService: AuthService,
              private leadsService: LeadsService) {
  }

  public signInWithGoogle(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(() => 
      {
        this.validateUser();
      });
  }

  private validateUser(){
    if(this.socialUser){
      this.authService.loginUser(this.socialUser.email).subscribe(resData =>{
        console.log(resData);
        this.leadsService.user.next(resData);
        sessionStorage.setItem('userData', JSON.stringify(resData));
        this.router.navigate(['home']);
      },
      (error)=>{
        switch(error.status){
        case 400:
          this.router.navigateByUrl('/auth/invalid-email');
        }
      });
    }
  }
}

