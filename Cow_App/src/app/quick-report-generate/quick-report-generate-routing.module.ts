import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickReportGeneratePage } from './quick-report-generate.page';

const routes: Routes = [
  {
    path: '',
    component: QuickReportGeneratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickReportGeneratePageRoutingModule {}
