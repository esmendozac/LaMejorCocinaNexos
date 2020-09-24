import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamarerosPageRoutingModule } from './camareros-routing.module';

import { CamarerosPage } from './camareros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamarerosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CamarerosPage]
})
export class CamarerosPageModule {}
