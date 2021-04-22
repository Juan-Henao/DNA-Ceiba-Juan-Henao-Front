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

  const apiEndpointPaciente = `${environment.endpoint}/compra`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompraService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CompraService);
  });

  it('should be created', () => {
    const pacienteService: CompraService = TestBed.inject(CompraService);
    expect(pacienteService).toBeTruthy();
  });

  it('deberia crear un compra', () => {
    const dummyPaciente = new Compra();
    service.guardar(dummyPaciente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointPaciente);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia actualizar un compra', () => {
    const dummyPaciente = new Compra();
    dummyPaciente.id = 1;
    service.actualizar(dummyPaciente).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyPaciente);
    });
    const req = httpMock.expectOne(`${apiEndpointPaciente}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyPaciente);
  });

  it('deberia eliminar un compra', () => {
    const dummyPaciente = new Compra();
    dummyPaciente.id = 1;
    service.eliminar(dummyPaciente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointPaciente}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia listar pacientes', () => {
    const dummyCompras = [
      new Compra(), new Compra()
    ];
    service.consultar().subscribe(pacientes => {
      expect(pacientes.length).toBe(2);
      expect(pacientes).toEqual(dummyCompras);
    });
    const req = httpMock.expectOne(apiEndpointPaciente);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompras);
  });

  it('deberia obtener un compra por id', () => {
    const dummyCompras = new Compra();
    dummyCompras.id = 1;
    service.consultarPorId(dummyCompras.id).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyCompras);
    });
    const req = httpMock.expectOne(`${apiEndpointPaciente}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompras);
  });

});
