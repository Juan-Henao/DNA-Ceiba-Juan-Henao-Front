import { Component, OnInit } from '@angular/core';
import { ItemsCompra } from '@itemsCompra/shared/model/itemsCompra';
import { ItemsCompraService } from '@itemsCompra/shared/service/itemsCompra.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-itemscompra',
  templateUrl: './itemsCompra.component.html'
})

export class ItemsCompraComponent implements OnInit {
  public itemsCompras: ItemsCompra[];
  public page: number;
  public pageSize: number;

  constructor(protected itemsCompraService: ItemsCompraService) {
    this.page = 1;
    this.pageSize = 5;
  }

  ngOnInit() {
    this.itemsCompraService.consultar().subscribe(itemsCompras => this.itemsCompras = itemsCompras);

    this.itemsCompraService.notificar.subscribe(indicador => {
      console.log('Subscribiendo los nuevos datos de los Items Compra: ' + indicador);
      this.itemsCompraService.consultar().subscribe(itemsCompras => this.itemsCompras = itemsCompras);
    });
  }

  public delete(itemsCompras: ItemsCompra): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Cuidado!',
      text: `Está seguro de eliminar el itemsCompras ${itemsCompras.id} de la compra ${itemsCompras.idCompra} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.itemsCompraService.eliminar(itemsCompras).subscribe(
          response => {
            if (!response) {
              this.itemsCompras = this.itemsCompras.filter(cli => cli !== itemsCompras);
              swalWithBootstrapButtons.fire(
                'ItemsCompra eliminado',
                `El itemsCompras se ha eliminado con éxito de la base de datos`,
                'success'
              );
            }
          }, err => {
            Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
          });
      }
    });
}}
