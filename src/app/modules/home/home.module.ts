import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth.guard';
import { HomeComponent } from './home.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    LayoutsModule ,
    RouterModule.forChild([
      { path: '', canActivate:[AuthGuardService], component: HomeComponent }
    ])
  ]
})
export class HomeModule { }
