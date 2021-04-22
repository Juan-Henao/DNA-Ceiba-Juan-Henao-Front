import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { CompraService } from '@compra/shared/service/compra.service';
import { HttpService } from '@core/services/http.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParametroService } from '@parametro/service/parametro.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GestionarCompraComponent } from './crud-compra.component';


describe('GestionarCompraComponent', () => {
  let component: GestionarCompraComponent;
  let fixture: ComponentFixture<GestionarCompraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCompraComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        AutocompleteLibModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ClienteService, CompraService, ParametroService, HttpService, DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
