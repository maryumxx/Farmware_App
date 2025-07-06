import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCowPageRoutingModule } from './update-cow-routing.module';

import { UpdateCowPage } from './update-cow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCowPageRoutingModule
  ],
  declarations: [UpdateCowPage]
})
export class UpdateCowPageModule {}
