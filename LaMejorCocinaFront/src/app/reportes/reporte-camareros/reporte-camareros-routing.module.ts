import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteCamarerosPage } from './reporte-camareros.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteCamarerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteCamarerosPageRoutingModule {}
