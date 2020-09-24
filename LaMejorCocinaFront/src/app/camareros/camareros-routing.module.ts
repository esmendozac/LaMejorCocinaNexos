import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CamarerosPage } from './camareros.page';

const routes: Routes = [
  {
    path: '',
    component: CamarerosPage
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamarerosPageRoutingModule {}
