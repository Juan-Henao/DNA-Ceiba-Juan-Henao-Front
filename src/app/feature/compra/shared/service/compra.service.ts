import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Compra } from '../model/compra';

@Injectable()
export class CompraService {

  private notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) {
  }

  get notificar(): EventEmitter<any> {
    return this.notificarGestion;
  }

  public guardar(compra: Compra) {
    return this.http.doPost<Compra, boolean>(`${environment.endpoint}/compra`, compra, this.http.optsName('crear compra'));
  }

  public actualizar(compra: Compra) {
    return this.http.doPut<Compra>(`${environment.endpoint}/compra/${compra.id}`, compra,
      this.http.optsName('actualizar compra'));
  }

  public consultar() {
    return this.http.doGet<Compra[]>(`${environment.endpoint}/compra`, this.http.optsName('consultar compra'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Compra>(`${environment.endpoint}/compra/${id}`, this.http.optsName('consultar compra por id'));
  }

  public eliminar(compra: Compra) {
    return this.http.doDelete(`${environment.endpoint}/compra/${compra.id}`, this.http.optsName('elimina compra'));
  }
}
