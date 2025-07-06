import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CowDetailPage } from './cow-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CowDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CowDetailPageRoutingModule {}
