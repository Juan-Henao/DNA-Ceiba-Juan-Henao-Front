import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';


@Injectable()
export class ClienteService {

  private notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) { }

  get notificar(): EventEmitter<any> {
    return this.notificarGestion;
  }

  public consultar() {
    return this.http.doGet<Cliente[]>(`${environment.endpoint}/cliente`, this.http.optsName('consultar clientes'));
  }

  public guardar(cliente: Cliente) {
    return this.http.doPost<Cliente, boolean>(`${environment.endpoint}/cliente`, cliente,
      this.http.optsName('crear cliente'));
  }

  public actualizar(cliente: Cliente) {
    return this.http.doPut<Cliente>(`${environment.endpoint}/cliente/${cliente.id}`, cliente, this.http.optsName('actualizar cliente'));
  }

  public eliminar(cliente: Cliente) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/cliente/${cliente.id}`,
      this.http.optsName('eliminar cliente'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Cliente>(`${environment.endpoint}/cliente/${id}`, this.http.optsName('consultar cliente por id'));
  }
}
