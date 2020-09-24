import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CocinerosPage } from './cocineros.page';

const routes: Routes = [
  {
    path: '',
    component: CocinerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocinerosPageRoutingModule {}
