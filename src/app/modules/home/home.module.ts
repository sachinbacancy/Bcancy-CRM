import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth.guard';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', canActivate:[AuthGuardService], component: HomeComponent }
    ])
  ]
})
export class HomeModule { }
