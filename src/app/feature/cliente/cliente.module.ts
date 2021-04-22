import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ClienteComponent } from './components/cliente/cliente.component';
import { GestionarClienteComponent } from './components/crud/crud-cliente.component';
import { ClienteService } from './shared/service/cliente.service';
import { ClienteRoutingModule } from './cliente-routing.module';

@NgModule({
  declarations: [
    ClienteComponent,
    GestionarClienteComponent],
  imports: [
    ClienteRoutingModule,
    SharedModule,
    NgbModule,
    AutocompleteLibModule
  ],
  providers: [
    ClienteService,
    DatePipe
  ]
})
export class ClienteModule { }
