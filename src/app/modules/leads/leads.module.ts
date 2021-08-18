import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from './leads.component';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';



@NgModule({
  declarations: [LeadsComponent],
  imports: [
    CommonModule,
    LayoutsModule,
    RouterModule.forChild([
      { path: '', component: LeadsComponent },
    ])
  ]
})
export class LeadsModule { }
