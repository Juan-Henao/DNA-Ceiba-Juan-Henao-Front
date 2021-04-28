import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Compra } from '../model/compra';
import { CompraService } from './compra.service';


describe('CompraService', () => {
  let httpMock: HttpTestingController;
  let service: CompraService;

  const apiEndpointCompra = `${environment.endpoint}/compra`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompraService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CompraService);
  });

  it('should be created', () => {
    const clienteService: CompraService = TestBed.inject(CompraService);
    expect(clienteService).toBeTruthy();
  });

  it('deberia crear un compra', () => {
    const dummyCompra = new Compra();
    service.guardar(dummyCompra).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointCompra);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia actualizar un compra', () => {
    const dummyCompra = new Compra();
    dummyCompra.id = 1;
    service.actualizar(dummyCompra).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyCompra);
    });
    const req = httpMock.expectOne(`${apiEndpointCompra}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyCompra);
  });

  it('deberia eliminar un compra', () => {
    const dummyCompra = new Compra();
    dummyCompra.id = 1;
    service.eliminar(dummyCompra).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointCompra}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia listar compras', () => {
    const dummyCompras = [
      new Compra(), new Compra()
    ];
    service.consultar().subscribe(compras => {
      expect(compras.length).toBe(2);
      expect(compras).toEqual(dummyCompras);
    });
    const req = httpMock.expectOne(apiEndpointCompra);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompras);
  });

  it('deberia obtener un compra por id', () => {
    const dummyCompras = new Compra();
    dummyCompras.id = 1;
    service.consultarPorId(dummyCompras.id).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyCompras);
    });
    const req = httpMock.expectOne(`${apiEndpointCompra}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompras);
  });

});
