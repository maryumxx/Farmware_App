import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickReportGeneratePageRoutingModule } from './quick-report-generate-routing.module';

import { QuickReportGeneratePage } from './quick-report-generate.page';
import { IonicSelectableComponent } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickReportGeneratePageRoutingModule,
    IonicSelectableComponent
  ],
  declarations: [QuickReportGeneratePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuickReportGeneratePageModule {}
