import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCowPage } from './add-cow.page';

const routes: Routes = [
  {
    path: '',
    component: AddCowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCowPageRoutingModule {}
