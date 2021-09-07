import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router: Router,
    public socialAuthServive: SocialAuthService) {
  }

  logout(): void {
    this.socialAuthServive.signOut().then(() => this.router.navigate(['auth']));
  }

}
