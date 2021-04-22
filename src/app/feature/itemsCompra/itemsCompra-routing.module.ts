import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionarItemsCompraComponent } from './components/crud-itemsCompra/crud-itemsCompra.component';
import { ItemsCompraComponent } from './components/itemsCompra/itemsCompra.component';



const routes: Routes = [
  {
    path: '',
    component: ItemsCompraComponent,
    children: [
      {
        path: 'gestionar',
        component: GestionarItemsCompraComponent
      },
      {
        path: 'gestionar/:id',
        component: GestionarItemsCompraComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsCompraRoutingModule { }
