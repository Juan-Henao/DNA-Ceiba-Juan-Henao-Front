import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Parametro } from '../model/parametro';


@Injectable()
export class ParametroService {

  private notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) { }

  get notificar(): EventEmitter<any> {
    return this.notificarGestion;
  }

  public consultar() {
    return this.http.doGet<Parametro[]>(`${environment.endpoint}/parametro`, this.http.optsName('consultar parametros'));
  }

  public guardar(parametro: Parametro) {
    return this.http.doPost<Parametro, boolean>(`${environment.endpoint}/parametro`, parametro,
      this.http.optsName('crear parametro'));
  }

  public actualizar(parametro: Parametro) {
    return this.http.doPut<Parametro>(`${environment.endpoint}/parametro/${parametro.id}`, parametro, this.http.optsName('actualizar parametro'));
  }

  public eliminar(parametro: Parametro) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/parametro/${parametro.id}`,
      this.http.optsName('eliminar parametro'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Parametro>(`${environment.endpoint}/parametro/${id}`, this.http.optsName('consultar parametro por id'));
  }
}
