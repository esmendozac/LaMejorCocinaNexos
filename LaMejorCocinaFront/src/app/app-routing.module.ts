import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'facturas',
    pathMatch: 'full'
  },  
  {
    path: 'clientes',
    children:[
      {
        path: '',
        loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./clientes/detalle/detalle.module').then( m => m.DetallePageModule)
      }
    ]    
  },
  {
    path: 'camareros',
    children:[
      {
        path: '',
        loadChildren: () => import('./camareros/camareros.module').then( m => m.CamarerosPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./camareros/detalle/detalle.module').then( m => m.DetallePageModule)
      }
    ]    
  },
  {
    path: 'cocineros',
    children:[
      {
        path: '',
        loadChildren: () => import('./cocineros/cocineros.module').then( m => m.CocinerosPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./cocineros/detalle/detalle.module').then( m => m.DetallePageModule)
      }
    ]    
  },  
  {
    path: 'facturas',
    children:[
      {
        path: '',
        loadChildren: () => import('./facturas/facturas.module').then( m => m.FacturasPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./facturas/detalle/detalle.module').then( m => m.DetallePageModule)
      }
    ]    
  }, 
  {
    path: 'mesas',
    children:[
      {
        path: '',
        loadChildren: () => import('./mesas/mesas.module').then( m => m.MesasPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./mesas/detalle/detalle.module').then( m => m.DetallePageModule)
      }
    ]    
  },   {
    path: 'reporte-camareros',
    loadChildren: () => import('./reportes/reporte-camareros/reporte-camareros.module').then( m => m.ReporteCamarerosPageModule)
  },
  {
    path: 'reporte-clientes',
    loadChildren: () => import('./reportes/reporte-clientes/reporte-clientes.module').then( m => m.ReporteClientesPageModule)
  }
      
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
