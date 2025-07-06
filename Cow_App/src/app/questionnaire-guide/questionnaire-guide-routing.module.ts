import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionnaireGuidePage } from './questionnaire-guide.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionnaireGuidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionnaireGuidePageRoutingModule {}
