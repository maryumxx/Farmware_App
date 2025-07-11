import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionnairePageRoutingModule } from './questionnaire-routing.module';

import { QuestionnairePage } from './questionnaire.page';
import { UnderscoreToTitlePipe } from '../underscore-to-title.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionnairePageRoutingModule,
    UnderscoreToTitlePipe
  ],
  declarations: [QuestionnairePage]
})
export class QuestionnairePageModule {}
