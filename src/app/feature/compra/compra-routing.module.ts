import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraComponent } from './components/compra/compra.component';
import { GestionarCompraComponent } from './components/crud-compra/crud-compra.component';

const routes: Routes = [
  {
    path: '',
    component: CompraComponent,
    children: [
      {
        path: 'gestionar',
        component: GestionarCompraComponent
      },
      {
        path: 'gestionar/:id',
        component: GestionarCompraComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
