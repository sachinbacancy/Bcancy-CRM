import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from './leads.component';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageService, FilterService, SortService, SelectionService, GridModule, PagerModule, EditService, ToolbarService, CommandColumnService, SearchService, FreezeService, ExcelExportService } from '@syncfusion/ej2-angular-grids';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ImportLeadsComponent } from './import-leads/import-leads.component';
import { ImportMapsComponent } from './import-maps/import-maps.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';


@NgModule({
  declarations: [LeadsComponent, ImportLeadsComponent, ImportMapsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule,
    GridModule,
    PagerModule,
    ToolbarModule,
    DialogModule,
    CheckBoxModule,
    DateRangePickerModule,
    ReactiveFormsModule,
    NgxCsvParserModule,
    RouterModule.forChild([
      { path: '', component: LeadsComponent },
      { path: 'import-leads', component: ImportLeadsComponent },
      { path: 'import-maps', component: ImportMapsComponent },
    ])
  ],
  providers:[PageService, FilterService, SortService, SelectionService, EditService, ToolbarService, SearchService, CommandColumnService, ExcelExportService, FreezeService]
})
export class LeadsModule { }
