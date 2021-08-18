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

  /* public addUser(user:UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(environment.baseURL+'register1',user);
  } */
  
  public loginUser(email: string) {
    return this.http.post(environment.baseURL+"api/v1/sessions",{email:email});
  }

  public autoLogin() {
    const socialUserData: SocialUser = JSON.parse(sessionStorage.getItem('socialUserData'));
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
    sessionStorage.removeItem('socialUserData');
  }

  public autoLogout(expirationDuration: number):void{
    setTimeout(()=> {
      sessionStorage.removeItem('socialUserData');
      this.socialUser.next(null);
      this.router.navigate(['/auth']);
    },expirationDuration);
  }
}
