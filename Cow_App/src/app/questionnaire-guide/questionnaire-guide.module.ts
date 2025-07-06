import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionnaireGuidePageRoutingModule } from './questionnaire-guide-routing.module';

import { QuestionnaireGuidePage } from './questionnaire-guide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionnaireGuidePageRoutingModule
  ],
  declarations: [QuestionnaireGuidePage]
})
export class QuestionnaireGuidePageModule {}
