import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalRecordsDetailPageRoutingModule } from './medical-records-detail-routing.module';

import { MedicalRecordsDetailPage } from './medical-records-detail.page';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalRecordsDetailPageRoutingModule,
    MarkdownModule.forChild()
  ],
  declarations: [MedicalRecordsDetailPage]
})
export class MedicalRecordsDetailPageModule {}
