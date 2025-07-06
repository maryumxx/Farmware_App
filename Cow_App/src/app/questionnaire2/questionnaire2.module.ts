import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Questionnaire2PageRoutingModule } from './questionnaire2-routing.module';

import { Questionnaire2Page } from './questionnaire2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Questionnaire2PageRoutingModule
  ],
  declarations: [Questionnaire2Page]
})
export class Questionnaire2PageModule {}
