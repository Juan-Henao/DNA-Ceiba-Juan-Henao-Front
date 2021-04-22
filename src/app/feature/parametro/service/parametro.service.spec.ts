import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Parametro } from '../model/parametro';
import { ParametroService } from './parametro.service';

describe('ParametroService', () => {
  let httpMock: HttpTestingController;
  let service: ParametroService;

  const apiEndpointCliente = `${environment.endpoint}/parametro`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParametroService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ParametroService);
  });

  it('should be created', () => {
    const productService: ParametroService = TestBed.inject(ParametroService);
    expect(productService).toBeTruthy();
  });

  it('deberia listar parametros', () => {
    const dummyParametros = [
      new Parametro(), new Parametro()
    ];
    service.consultar().subscribe(parametros => {
      expect(parametros.length).toBe(2);
      expect(parametros).toEqual(dummyParametros);
    });
    const req = httpMock.expectOne(apiEndpointCliente);
    expect(req.request.method).toBe('GET');
    req.flush(dummyParametros);
  });

  it('deberia obtener un parametro por id', () => {
    const dummyParametros = new Parametro();
    dummyParametros.id = 1;
    service.consultarPorId(dummyParametros.id).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyParametros);
    });
    const req = httpMock.expectOne(`${apiEndpointCliente}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyParametros);
  });
});
