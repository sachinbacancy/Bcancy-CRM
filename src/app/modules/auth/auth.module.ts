import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InvalidEmailComponent } from './invalid-email/invalid-email.component';



@NgModule({
  declarations: [LoginComponent, InvalidEmailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '',component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'invalid-email', component: InvalidEmailComponent },
    ])
  ],
  exports: [InvalidEmailComponent]
})
export class AuthModule { }
