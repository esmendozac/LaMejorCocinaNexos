import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteCamarerosPageRoutingModule } from './reporte-camareros-routing.module';

import { ReporteCamarerosPage } from './reporte-camareros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteCamarerosPageRoutingModule
  ],
  declarations: [ReporteCamarerosPage]
})
export class ReporteCamarerosPageModule {}
