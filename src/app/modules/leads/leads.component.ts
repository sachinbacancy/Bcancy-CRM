import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadModel } from 'src/app/interfaces/lead.model';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  public user:any;
  public leads: LeadModel[]=[];

  constructor(private router: Router,
              private leadService: LeadsService) { }

  ngOnInit(): void {
    this.getLeads();
  }

  public getLeads(){
    console.log(sessionStorage.getItem('userData'));
    
    this.user=JSON.parse(sessionStorage.getItem('userData'));
    console.log(this.user);
    
    this.leadService.getLeads(this.user.data.id).subscribe(resData =>{
      console.log(resData);
      resData.leads.forEach(lead => {
        this.leads.push(lead);
      });
      console.log(this.leads);
      
    });
  }

}
