import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { PacienteRoutingModule } from './compra-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GestionarCompraComponent } from './components/crud-compra/crud-compra.component';
import { CompraComponent } from './components/compra/compra.component';
import { CompraService } from './shared/service/compra.service';

@NgModule({
  declarations: [
    GestionarCompraComponent,
    CompraComponent],
  imports: [
    PacienteRoutingModule,
    SharedModule,
    NgbModule,
    AutocompleteLibModule
  ],
  providers: [
    DatePipe,
    CompraService
  ]
})
export class CompraModule { }
