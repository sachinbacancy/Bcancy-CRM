import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-angular-buttons';
import { CommandModel, EditSettingsModel, FilterSettingsModel, GridComponent, PageSettingsModel, SaveEventArgs , SelectionSettingsModel, ToolbarItems, CellEditArgs } from '@syncfusion/ej2-angular-grids';
import { ToastrService } from 'ngx-toastr';
import { LeadModel } from 'src/app/interfaces/lead.model';
import { UserModel } from 'src/app/interfaces/user.model';
import { LeadsService } from 'src/app/services/leads.service';
declare var $: any;

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  public user:UserModel;
  public leads: LeadModel[]=[];
  public lead: LeadModel;
  public fieldOrder: string[]=[];
  public editableField: string[]=[];
  public selectedEditableField: string[]=[];
  public updatedData: object;
  public editable: any[]=[];
  public newLead:boolean=false;
  public users:any;
  public leadForm : FormGroup;
  public techOptions: string[]=[];
  public ageOptions: string[]=[];
  public genderOptions: string[]=[];
  public leadStatusOptions: string[]=[];
  public leadQualityOptions: string[]=[];
  public organicOptions: string[]=[];
  public paidOptions: string[]=[];
  public sourceOptions: string[]=[];
  public screenResolutionOptions: string[]=[];
  public supportDeskOptions: string[]=[];
  public chatHandleOptions: string[]=[];
  public osOptions: string[]=[];
  public domainOptions: string[]=[];
  public emailStatusOptions: string[]=[];
  public incomeOptions: string[]=[];
  public userIdOptions: string[]=[];
  public priorityOptions: string[]=[];
  public deviceOptions: string[]=[];
  public countries:string[]=[];
  public states: string[]=[];
  public cities: string[]=[];
  public selectedCountry: string;
  public ifPaid: boolean=false;
  public ifOrganic: boolean=false;
  public zopim: boolean=false;
  public medium: boolean=false;
  public isClosed: boolean=false;
  pipe = new DatePipe('en-US');

  @ViewChild('grid') grid: GridComponent;

  public month: number = new Date().getMonth();
    public fullYear: number = new Date().getFullYear();
    public start: Date = new Date(this.fullYear, this.month - 1 , 7);
    public end: Date = new Date(this.fullYear, this.month, 25);

  public filterOption: FilterSettingsModel = { type: 'Excel' };
  public selectionSettings: SelectionSettingsModel= {enableSimpleMultiRowSelection: true, type: "Multiple", checkboxOnly: true }; 
  public pageSettings: PageSettingsModel ={ pageSizes:true, pageSize:9};
  public toolbar: ToolbarItems[]= ['Delete','ExcelExport','Search'];
  public commands: CommandModel[] = 
    [
      { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
      { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
      { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
      { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
    ];
  public formatOptions = {type: 'date', format: 'dd.MM.yyyy'};
  public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };

  constructor(private leadService: LeadsService,
              private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.users=JSON.parse(localStorage.getItem('userData'));
    console.log(this.users);
    this.getLeads();
    this.initForm();
    this.setPicklistValues();
  }

  initForm() {
    let lead: LeadModel={};
    this.leadForm = new FormGroup({
      'sr_no': new FormControl(lead.sr_no),
      'date': new FormControl(lead.date),
      'source': new FormControl(lead.source),
      'if_paid': new FormControl(lead.if_paid),
      'if_organic': new FormControl(lead.if_organic),
      'support_desk': new FormControl(lead.support_desk),
      'zopim_id': new FormControl(lead.zopim_id),
      'corporate': new FormControl(lead.corporate),
      'phone_no': new FormControl(lead.phone_no),
      'skype': new FormControl(lead.skype),
      'chat_description': new FormControl(lead.chat_description),
      'technology': new FormControl(lead.technology),
      'domain': new FormControl(lead.domain),
      'landing_page_url': new FormControl(lead.landing_page_url),
      'city': new FormControl(lead.city),
      'state': new FormControl(lead.state),
      'country': new FormControl(lead.country),
      'lead_status': new FormControl(lead.lead_status),
      'closed_date': new FormControl(lead.closed_date),
      'household_income': new FormControl(lead.household_income),
      'ads_no': new FormControl(lead.ads_no),
      'hotjar_video_links': new FormControl(lead.hotjar_video_links),
      'live_chat_handle_name': new FormControl(lead.live_chat_handle_name),
      'chat_handle_email': new FormControl(lead.chat_handle_email,[Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      'lead_quality': new FormControl(lead.lead_quality),
      'keyword': new FormControl(lead.keyword),
      'search_query': new FormControl(lead.search_query),
      'medium_name': new FormControl(lead.medium_name),
      'client_name': new FormControl(lead.client_name),
      'client_email': new FormControl(lead.client_email,[Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      'campaign_name': new FormControl(lead.campaign_name),
      'ad_group': new FormControl(lead.ad_group),
      'gender': new FormControl(lead.gender),
      'age': new FormControl(lead.age),
      'operating_system': new FormControl(lead.operating_system),
      'screen_resolution': new FormControl(lead.screen_resolution),
      'is_closed': new FormControl(lead.is_closed),
      'email_status': new FormControl(lead.email_status),
      'time': new FormControl(lead.time),
      'blog_url': new FormControl(lead.blog_url),
      'user_id': new FormControl(lead.user_id),
      'priority': new FormControl(lead.priority),
      'device': new FormControl(lead.device),
      'company_name': new FormControl(lead.company_name)
    });    
  }

  public setPicklistValues(){
    this.leadService.getPicklistValues().subscribe((resData)=>{
      resData['data'].technology.forEach(value => {
        this.techOptions.push(value);
      });
      resData['data'].age.forEach(value => {
        this.ageOptions.push(value);
      });
      resData['data'].gender.forEach(value => {
        this.genderOptions.push(value);
      });
      resData['data'].lead_status.forEach(value => {
        this.leadStatusOptions.push(value);
      });
      resData['data'].lead_quality.forEach(value => {
        this.leadQualityOptions.push(value);
      });
      resData['data'].if_organic.forEach(value => {
        this.organicOptions.push(value);
      });
      resData['data'].if_paid.forEach(value => {
        this.paidOptions.push(value);
      });
      resData['data'].source.forEach(value => {
        this.sourceOptions.push(value);
      });
      resData['data'].screen_resolution.forEach(value => {
        this.screenResolutionOptions.push(value);
      });
      resData['data'].support_desk.forEach(value => {
        this.supportDeskOptions.push(value);
      });
      resData['data'].live_chat_handle_name.forEach(value => {
        this.chatHandleOptions.push(value);
      });
      resData['data'].operating_system.forEach(value => {
        this.osOptions.push(value);
      });
      resData['data'].domain.forEach(value => {
        this.domainOptions.push(value);
      });
      resData['data'].email_status.forEach(value => {
        this.emailStatusOptions.push(value);
      });
      resData['data'].household_income.forEach(value => {
        this.incomeOptions.push(value);
      });
      resData['data'].user_id.forEach(value => {
        this.userIdOptions.push(value);
      });
      resData['data'].priority.forEach(value => {
        this.priorityOptions.push(value);
      });
      resData['data'].device.forEach(value => {
        this.deviceOptions.push(value);
      });
      resData['data'].country.forEach(value => {
        this.countries.push(value);
      });
    });
  }

  public sourceSelected(source: string){
    if(source=="Paid"){
      this.ifPaid=true;
      this.ifOrganic=false;
    }else if(source=="Organic"){
      this.ifPaid=false;
      this.ifOrganic=true;
    }else{
      this.ifPaid=false;
      this.ifOrganic=false;
    }
  }

  public onSupportDeskSelect(supportDesk:string){
    if(supportDesk=="Zopim"){
      this.zopim=true;
    }else{
      this.zopim=false;
    }
  }

  public onMediumSelect(organic:string){
    if(organic=="Medium"){
      this.medium=true;
    }else{
      this.medium=false;
    }
  }

  public onIsClosed(isClosed:string){
    if(isClosed=="Yes"){
      this.isClosed=true;
    }else{
      this.isClosed=false;
    }
  }

  public onChangeCountry(country: string) {
    if (country) {
      this.selectedCountry=country;
      this.leadService.getStates(country).subscribe(resData=>{
        resData['data'].forEach(element => {
          this.states.push(element);
        });
      });
    } else {
      this.states = null;
      this.cities = null;
    }
  }

  public onChangeState(state: string) {
    if (state && this.selectedCountry) {
      this.leadService.getCities(this.selectedCountry,state).subscribe(resData=>{
        resData['data'].forEach(element => {
          this.cities.push(element);
        });
      }
      );
    } else {
      this.cities = null;
    }
  }

  onSubmitForm() {
    if (this.leadForm.valid) {
      this.leadService.updateUserData(this.leadForm.value).subscribe(
        (resData) => {
          console.log(resData);
          this.toasterService.success('Successfull');
        },
        (error) => {
          console.log(error);
          this.toasterService.error('Unsuccessfull')            
        });
    } 
  }

  public getLeads(){
    this.user=JSON.parse(localStorage.getItem('userData'));
    console.log(this.user);
    
    this.leadService.getLeads(this.user.data.id).subscribe(resData =>{
      console.log(resData);

      resData.leads.forEach(lead => {
        this.leads.push(lead);
      });
      console.log(this.leads);

      resData.editable_field.forEach(editableField =>{
        this.editableField.push(editableField);
      });
      console.log(this.editableField);

      resData.field_order.forEach(fieldOrder =>{
        this.fieldOrder.push(fieldOrder);
      });
      console.log(this.fieldOrder);

      resData.selected_editable_field.forEach(selectedEditableField =>{
        this.selectedEditableField.push(selectedEditableField);
      });
      console.log(this.selectedEditableField);
    },(error) =>{
      console.log(error);
    });
  }

  public getHeader(text: string){
    let str=text.replace(/[&\/\\#,+()$~%.'":*?<>{}_]/g, ' ');
    return str.toUpperCase();
  }

  public isDate(date: any): string{
    if(date === "created_at"){
      return 'date';
    }
  }

  actionBegin(args) { 
    if (args.requestType === "beginEdit") { 
      this.grid.columns.forEach(element => {
        element.visible=false;
      });
      this.selectedEditableField.forEach(editable => {
        this.grid.columns.forEach(cols => {
          if (cols.field === (editable)){
            this.editable.push(cols);
          }
        });
      }); 
      console.log(this.editable);
      this.editable.forEach(element=>{
        element.visible=true;
      });    
    }

    if(args.requestType === "delete" && args.data.length === 1){
      console.log(args);
      
      this.leadService.deleteLead(args.data[0].id).subscribe(resData=>{
        console.log(resData);
      });
    }
  } 

  actionComplete(args: SaveEventArgs) {
    if (args.requestType === 'save') {
      this.updatedData = Object.assign({}, args.data);
      console.log(this.updatedData);
      this.leadService.updateRowData(this.updatedData,this.updatedData['id']).subscribe(resData=>{
        console.log(resData);
      });
      this.grid.columns.forEach(element => {
        element.visible=true;
      });
    }
  } 

  toolbarClick(args: ClickEventArgs) {
    console.log(args);
    if(args['item'].id === 'Grid_delete'){
      let selectedRecords = this.grid.getSelectedRecords();
      console.log(selectedRecords);
      let selectedIds: number[]=[];
      selectedRecords.forEach(lead => {
        selectedIds.push(lead['id']);
      }); 
      console.log(selectedIds);
      this.leadService.deleteLeads(selectedIds).subscribe(resData=>{
        console.log(resData);
      });
      
    }
    if (args['item'].id === 'Grid_excelexport') {
        const selectedRecords = this.grid.getSelectedRecords();
        const exportProperties = {
            dataSource: selectedRecords
        };
        this.grid.excelExport(exportProperties);
    }
  }

}
