import { Component, OnInit } from '@angular/core';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-import-maps',
  templateUrl: './import-maps.component.html',
  styleUrls: ['./import-maps.component.css']
})
export class ImportMapsComponent implements OnInit {

  public sampleData: any[]=[];
  public headers: any[]=[];
  constructor(private leadsService: LeadsService) { }

  ngOnInit(): void {
    this.headers=this.leadsService.csvHeaders;
    this.leadsService.csvRecords.forEach(element => {
      this.sampleData.push(element);
    });
    console.log(this.sampleData);
    
  }

}
