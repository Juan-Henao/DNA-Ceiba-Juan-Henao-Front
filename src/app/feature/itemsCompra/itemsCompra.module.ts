import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GestionarItemsCompraComponent } from './components/crud-itemsCompra/crud-itemsCompra.component';
import { ItemsCompraComponent } from './components/itemsCompra/itemsCompra.component';
import { ItemsCompraRoutingModule } from './itemsCompra-routing.module';
import { ItemsCompraService } from './shared/service/itemsCompra.service';


@NgModule({
  declarations: [
    ItemsCompraComponent,
    GestionarItemsCompraComponent],
  imports: [
    ItemsCompraRoutingModule,
    SharedModule,
    NgbModule,
    AutocompleteLibModule
  ],
  providers: [
    ItemsCompraService,
    DatePipe
  ]
})
export class ItemsCompraModule { }
