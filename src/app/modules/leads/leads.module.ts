import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from './leads.component';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ReactiveFormsModule } from '@angular/forms';
import { PageService, FilterService, SortService, SelectionService, GridModule, PagerModule, EditService, ToolbarService, CommandColumnService, SearchService } from '@syncfusion/ej2-angular-grids';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [LeadsComponent],
  imports: [
    CommonModule,
    LayoutsModule,
    GridModule,
    PagerModule,
    ToolbarModule,
    DialogModule,
    CheckBoxModule,
    DateRangePickerModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: LeadsComponent },
    ])
  ],
  providers:[PageService, FilterService, SortService, SelectionService, EditService, ToolbarService, SearchService, CommandColumnService]
})
export class LeadsModule { }
