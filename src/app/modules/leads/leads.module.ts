import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from './leads.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LeadsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LeadsComponent },
    ])
  ]
})
export class LeadsModule { }
