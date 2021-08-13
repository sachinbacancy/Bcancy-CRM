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

  public user =new BehaviorSubject<SocialUser>(null);

  constructor(private http: HttpClient, 
              private router: Router) {}

  /* public addUser(user:UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(environment.baseURL+'register1',user);
  } */
  
  public loginUser(email: string) {
    console.log(email);

    return this.http.post(environment.baseURL+"api/v1/sessions",{email:email});
    //return this.http.post(environment.baseURL+"api/v1/sessions?email="+email,{abc:"abc"});
  }

  public autoLogin() {
    const userData: SocialUser = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (userData) {
      this.user.next(userData);
      this.router.navigate(['']);                
      this.autoLogout(+userData.response['expires_in']);
    }
  }

  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
    sessionStorage.removeItem('userData');
  }

  public autoLogout(expirationDuration: number):void{
    setTimeout(()=> {
      sessionStorage.removeItem('userData');
      this.user.next(null);
      this.router.navigate(['/auth']);
    },expirationDuration);
  }
}
