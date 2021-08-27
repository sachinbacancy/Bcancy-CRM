import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LeadAPIResponse } from '../interfaces/lead-api-response.model';
import { LeadModel } from '../interfaces/lead.model';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  public user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, 
    private router: Router) {}

    public getLeads(id:number): Observable<LeadAPIResponse>{
      return this.http.get<LeadAPIResponse>(environment.baseURL+'api/v1/angular_lead_apis/'+id);
    }

    public updateRowData(rowData: LeadModel, leadId: number){
      return this.http.put(environment.baseURL+'api/v1/angular_lead_apis/'+leadId,rowData);
    }
}
