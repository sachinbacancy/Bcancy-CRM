import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, 
              public socialAuthServive: SocialAuthService) { }

  ngOnInit(): void {
  }

  public onSelectProfile(){
    this.router.navigateByUrl(`/user-profile`);
  }

  logout(): void {
    this.socialAuthServive.signOut().then(() => this.router.navigate(['/auth']));
  }

}
