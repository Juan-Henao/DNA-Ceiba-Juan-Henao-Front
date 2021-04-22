import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ClienteService } from './cliente.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Cliente } from '../model/cliente';
import { HttpResponse } from '@angular/common/http';

describe('ClienteService', () => {
  let httpMock: HttpTestingController;
  let service: ClienteService;

  const apiEndpointCliente = `${environment.endpoint}/cliente`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    const productService: ClienteService = TestBed.inject(ClienteService);
    expect(productService).toBeTruthy();
  });

  it('deberia crear un cliente', () => {
    const dummyCliente = new Cliente();
    service.guardar(dummyCliente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointCliente);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));

  });

  it('deberia actualizar un cliente', () => {
    const dummyCliente = new Cliente();
    dummyCliente.id = 1;
    service.actualizar(dummyCliente).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyCliente);
    });
    const req = httpMock.expectOne(`${apiEndpointCliente}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyCliente);
  });

  it('deberia eliminar un cliente', () => {
    const dummyCliente = new Cliente();
    dummyCliente.id = 1;
    service.eliminar(dummyCliente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointCliente}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia listar clientes', () => {
    const dummyClientes = [
      new Cliente(), new Cliente()
    ];
    service.consultar().subscribe(clientes => {
      expect(clientes.length).toBe(2);
      expect(clientes).toEqual(dummyClientes);
    });
    const req = httpMock.expectOne(apiEndpointCliente);
    expect(req.request.method).toBe('GET');
    req.flush(dummyClientes);
  });

  it('deberia obtener un cliente por id', () => {
    const dummyClientes = new Cliente();
    dummyClientes.id = 1;
    service.consultarPorId(dummyClientes.id).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyClientes);
    });
    const req = httpMock.expectOne(`${apiEndpointCliente}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyClientes);
  });
});
