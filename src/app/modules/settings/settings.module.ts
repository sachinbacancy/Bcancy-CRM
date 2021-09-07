import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    LayoutsModule,
    RouterModule.forChild([
      { path: '', component: SettingsComponent },
    ])
  ]
})
export class SettingsModule { }
