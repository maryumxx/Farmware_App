import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Questionnaire2Page } from './questionnaire2.page';

const routes: Routes = [
  {
    path: '',
    component: Questionnaire2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Questionnaire2PageRoutingModule {}
