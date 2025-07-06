import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CowDetailPageRoutingModule } from './cow-detail-routing.module';

import { CowDetailPage } from './cow-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CowDetailPageRoutingModule
  ],
  declarations: [CowDetailPage]
})
export class CowDetailPageModule {}
