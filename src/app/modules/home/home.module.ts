import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth.guard';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    RouterModule.forChild([
      { path: '', canActivate:[AuthGuardService], component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
    ])
  ]
})
export class HomeModule { }
