import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { ItemsCompra } from '../model/itemsCompra';


@Injectable()
export class ItemsCompraService {
  private notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) { }

  get notificar(): EventEmitter<any> {
    return this.notificarGestion;
  }
  public consultar() {
    return this.http.doGet<ItemsCompra[]>(`${environment.endpoint}/itemsCompra`, this.http.optsName('consultar itemsCompra'));
  }

  public guardar(itemsCompra: ItemsCompra) {
    return this.http.doPost<ItemsCompra, boolean>(`${environment.endpoint}/itemsCompra`, itemsCompra,
      this.http.optsName('crear itemsCompra'));
  }
  public actualizar(itemsCompra: ItemsCompra) {
    return this.http.doPut<ItemsCompra>(`${environment.endpoint}/itemsCompra/${itemsCompra.id}`, itemsCompra, this.http.optsName('actualizar itemsCompra'));
  }

  public eliminar(itemsCompra: ItemsCompra) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/itemsCompra/${itemsCompra.id}`,
      this.http.optsName('eliminar itemsCompra'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<ItemsCompra>(`${environment.endpoint}/itemsCompra/${id}`, this.http.optsName('consultar itemsCompra por id'));
  }
}
