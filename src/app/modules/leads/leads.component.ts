import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandModel, DialogEditEventArgs, EditEventArgs, EditSettingsModel, FilterSettingsModel, GridComponent, PageSettingsModel, SaveEventArgs, SelectionSettingsModel, ToolbarItems, CellEditArgs } from '@syncfusion/ej2-angular-grids';
import { LeadModel } from 'src/app/interfaces/lead.model';
import { UserModel } from 'src/app/interfaces/user.model';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  public user:UserModel;
  public leads: LeadModel[]=[];
  public fieldOrder: string[]=[];
  public editableField: string[]=[];
  public selectedEditableField: string[]=[];
  public updatedData: object;
  public editable: any[]=[];

  @ViewChild('grid') grid: GridComponent;

  public month: number = new Date().getMonth();
    public fullYear: number = new Date().getFullYear();
    public start: Date = new Date(this.fullYear, this.month - 1 , 7);
    public end: Date = new Date(this.fullYear, this.month, 25);

  public filterOption: FilterSettingsModel = { type: 'Excel' };
  public selectionSettings: SelectionSettingsModel= {persistSelection: true, type: "Multiple", checkboxOnly: true }; 
  public pageSettings: PageSettingsModel ={ pageSizes:true, pageSize:10};
  public toolbar: ToolbarItems[]= ['Search'];
  public commands: CommandModel[] = 
    [
      { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
      { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
      { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
      { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
    ];
  public formatOptions: object = {type: 'date', format: 'dd/MM/yyyy'};
  public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };

  constructor(private leadService: LeadsService) { }

  ngOnInit(): void {
    this.getLeads();
  }

  public getLeads(){
    this.user=JSON.parse(localStorage.getItem('userData'));
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

  public isDate(date: any): boolean{
    if(date === "created_at"){
      return true;
    }else{
      return false;
    }
  }

  actionBegin(args) { 
    if (args.requestType === "beginEdit" || args.requestType === "add") { 
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

  cellEdit(args: CellEditArgs) {
    if (args.value === 'France') {
        args.cancel = true;
    }
  }

}
