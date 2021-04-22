import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { ItemsCompraService } from './itemsCompra.service';
import { ItemsCompra } from '../model/itemsCompra';

describe('ItemsCompraService', () => {
  let httpMock: HttpTestingController;
  let service: ItemsCompraService;
  const apiEndpointProductos = `${environment.endpoint}/itemsCompra`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsCompraService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ItemsCompraService);
  });

  it('should be created', () => {
    const productService: ItemsCompraService = TestBed.inject(ItemsCompraService);
    expect(productService).toBeTruthy();
  });

  it('deberia listar itemsCompra', () => {
    const dummyItemsCompra = [
      new ItemsCompra(), new ItemsCompra()
    ];
    service.consultar().subscribe(itemsCompra => {
      expect(itemsCompra.length).toBe(2);
      expect(itemsCompra).toEqual(dummyItemsCompra);
    });
  });

  it('deberia crear un itemCompra', () => {
    const dummyProducto = new ItemsCompra();
    service.guardar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointProductos);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un itemCompra', () => {
    const dummyProducto = new ItemsCompra();
    dummyProducto.id = 1;
    service.eliminar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointProductos}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
