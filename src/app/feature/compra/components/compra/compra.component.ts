import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Compra } from '../../shared/model/compra';
import { CompraService } from '../../shared/service/compra.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  public compras: Compra[];
  public page: number;
  public pageSize: number;

  constructor(protected compraService: CompraService) {
    this.page = 1;
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.compraService.consultar().subscribe(paientes => this.compras = paientes);

    this.compraService.notificar.subscribe(indicador => {
      console.log('Subscribiendo los nuevos datos de los compras: ' + indicador);
      this.compraService.consultar().subscribe(paientes => this.compras = paientes);
    });
  }

  public delete(compra: Compra): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Cuidado!',
      text: `Está seguro de eliminar el compra ${compra.id} por un total de ${compra.total}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.compraService.eliminar(compra).subscribe(
          response => {
            if (!response) {
              this.compras = this.compras.filter(pac => pac !== compra);
              swalWithBootstrapButtons.fire(
                'Compra eliminada',
                `El compra se ha eliminado con éxito de la base de datos`,
                'success'
              );
            }
          }, err => {
            Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
          });
      }
    });
  }

}
