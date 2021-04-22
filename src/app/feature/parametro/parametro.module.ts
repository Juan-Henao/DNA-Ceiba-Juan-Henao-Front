import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ParametroService } from './service/parametro.service';


@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    NgbModule,
    AutocompleteLibModule
  ],
  providers: [
    ParametroService,
    DatePipe
  ]
})
export class ParametroModule { }
