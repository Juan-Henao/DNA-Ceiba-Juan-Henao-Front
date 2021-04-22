import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '@home/home.component';
import { ItemsCompraModule } from 'src/app/feature/itemsCompra/itemsCompra.module';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteModule } from './feature/cliente/cliente.module';
import { CompraModule } from '@compra/compra.module';
import { AdministracionModule } from '@administracion/administracion.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ParametroModule } from '@parametro/parametro.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ItemsCompraModule,
    ClienteModule,
    CompraModule,
    AdministracionModule,
    CoreModule,
    NgbModule,
    AutocompleteLibModule,
    ParametroModule
  ],
  providers: [CookieService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
