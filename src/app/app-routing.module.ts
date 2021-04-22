import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'itemsCompra', loadChildren: () => import('@itemsCompra/itemsCompra.module').then(mod => mod.ItemsCompraModule) },
  { path: 'cliente', loadChildren: () => import('@cliente/cliente.module').then(mod => mod.ClienteModule) },
  { path: 'compra', loadChildren: () => import('@compra/compra.module').then(mod => mod.CompraModule) },
  {
    path: 'administracion', loadChildren: () => import('@administracion/administracion.module').then(mod => mod.AdministracionModule)
  },
  { path: 'parametro', loadChildren: () => import('@parametro/parametro.module').then(mod => mod.ParametroModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
