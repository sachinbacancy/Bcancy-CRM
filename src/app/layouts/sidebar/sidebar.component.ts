import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadsService } from 'src/app/services/leads.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router,
              public leadsService: LeadsService,
              public settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  public onSelectingDashboard(){
    this.router.navigateByUrl(`/home`);
  }

  public onSelectingLead(){
    console.log(sessionStorage.getItem('userData'));
    this.router.navigateByUrl('/leads');
  }

  public onSelectingSettings(){
    this.router.navigateByUrl('/settings');
  }

}
