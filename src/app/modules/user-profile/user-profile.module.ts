import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth.guard';
import { UserProfileComponent } from './user-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    UserProfileComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', canActivate:[AuthGuardService], component: UserProfileComponent },
      { path: 'user-profile', component: ProfileComponent },
    ])
  ]
})
export class UserProfileModule { }
