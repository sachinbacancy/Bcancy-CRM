import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LeadsInterceptor } from './interceptors/auth.interceptor';
import { LeadsService } from '../services/leads.service';

@NgModule({
  providers: [
    LeadsService,
    [
      {provide: HTTP_INTERCEPTORS, useClass: LeadsInterceptor, multi: true},
    ]
  ]
})
export class CoreModule { }