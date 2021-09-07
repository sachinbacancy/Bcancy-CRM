import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public socialUser = new BehaviorSubject<SocialUser>(null);

  constructor(private http: HttpClient, 
              private router: Router) {}
  
  public loginUser(email: string) {
    return this.http.post(environment.baseURL+"api/v1/sessions",{email:email});
  }

  public updateUserData(userDetails, userId: number) {
    return this.http.put(environment.baseURL+"api/v1/angular_user_apis/"+userId,userDetails);
  }

  public autoLogin() {
    const socialUserData: SocialUser = JSON.parse(localStorage.getItem('socialUserData'));
    if (!socialUserData) {
      return;
    }
    if (socialUserData) {
      this.socialUser.next(socialUserData);
      this.router.navigate(['']);                
      this.autoLogout(+socialUserData.response['expires_in']);
    }
  }

  public logout(): void {
    this.socialUser.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('socialUserData');
  }

  public autoLogout(expirationDuration: number):void{
    setTimeout(()=> {
      localStorage.removeItem('socialUserData');
      this.socialUser.next(null);
      this.router.navigate(['/auth']);
    },expirationDuration);
  }
}
