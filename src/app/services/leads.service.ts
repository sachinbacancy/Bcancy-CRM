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
  public csvHeaders:string[]=[];
  public csvRecords: any[] = [];

  constructor(private http: HttpClient, 
    private router: Router) {}

    public getLeads(id:number): Observable<LeadAPIResponse>{
      return this.http.get<LeadAPIResponse>(environment.baseURL+'api/v1/angular_lead_apis/'+id);
    }

    public updateRowData(rowData: LeadModel, leadId: number): Observable<LeadModel>{
      return this.http.put<LeadModel>(environment.baseURL+'api/v1/angular_lead_apis/'+leadId,rowData);
    }

    public updateUserData(leadData: LeadModel): Observable<LeadModel>{
      console.log(leadData);
      return this.http.post<LeadModel>(environment.baseURL+'api/v1/angular_lead_apis',{leads:[leadData]});
    }

    public getPicklistValues(){
      return this.http.get(environment.baseURL+'api/v1/picklistvalues');
    }

    public getStates(country: string) {
      return this.http.post(environment.baseURL+'api/v1/get_states_cities',{country:country});
    }
  
    public getCities(country:string,state: string) {
      return this.http.post(environment.baseURL+'api/v1/get_states_cities',{country:country,state:state});
    }

    public deleteLead(id:number){
      return this.http.delete(environment.baseURL+'api/v1/angular_lead_apis/'+id);
    }

    public deleteLeads(Lead_ids:number[]){
      return this.http.delete(environment.baseURL+'api/v1/angular_lead_apis/'+Lead_ids);
    }
}
