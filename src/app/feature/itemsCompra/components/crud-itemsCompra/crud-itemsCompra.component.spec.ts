import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CompraService } from '@compra/shared/service/compra.service';
import { HttpService } from '@core/services/http.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParametroService } from '@parametro/service/parametro.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ItemsCompraService } from '../../shared/service/itemsCompra.service';
import { GestionarItemsCompraComponent } from './crud-itemsCompra.component';


describe('GestionarItemsCompraComponent', () => {
  let component: GestionarItemsCompraComponent;
  let fixture: ComponentFixture<GestionarItemsCompraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarItemsCompraComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        AutocompleteLibModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ItemsCompraService, CompraService, ParametroService, DatePipe, HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarItemsCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
