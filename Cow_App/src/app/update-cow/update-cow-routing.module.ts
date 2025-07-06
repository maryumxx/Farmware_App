import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCowPage } from './update-cow.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCowPageRoutingModule {}
