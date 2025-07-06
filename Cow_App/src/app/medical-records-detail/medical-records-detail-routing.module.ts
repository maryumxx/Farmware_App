import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalRecordsDetailPage } from './medical-records-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalRecordsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalRecordsDetailPageRoutingModule {}
