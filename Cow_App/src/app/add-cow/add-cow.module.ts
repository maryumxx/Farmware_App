import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCowPageRoutingModule } from './add-cow-routing.module';

import { AddCowPage } from './add-cow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCowPageRoutingModule
  ],
  declarations: [AddCowPage]
})
export class AddCowPageModule {}
