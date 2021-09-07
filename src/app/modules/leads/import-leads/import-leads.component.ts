import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { LeadModel } from 'src/app/interfaces/lead.model';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-import-leads',
  templateUrl: './import-leads.component.html',
  styleUrls: ['./import-leads.component.css']
})
export class ImportLeadsComponent implements OnInit {

  public header = false;
  @ViewChild('csvReader', { static: false }) csvReader: any;  
  
  constructor(private ngxCsvParser: NgxCsvParser,
              private router: Router,
              private leadsService: LeadsService) { }

  ngOnInit(): void {
  }

  uploadListener($event: any): void {  

    const files = $event.srcElement.files;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => 
      {
        console.log('Result', result);
        this.leadsService.csvRecords = result;
        for (let index = 0; index < 1; index++) {
          this.leadsService.csvRecords[index].forEach(element => {
            this.leadsService.csvHeaders.push(element);
          });
        }
        console.log(this.leadsService.csvHeaders);
        
      }, 
      (error: NgxCSVParserError) => 
      {
        console.log('Error', error);
      });
  }

  public onUploadCSV(){
    this.router.navigateByUrl('leads/import-maps');
  }
    
  /* fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  } */

}
