import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  public clientes: Cliente[];
  public page: number;
  public pageSize: number;

  constructor(protected clienteService: ClienteService) {
    this.page = 1;
    this.pageSize = 5;
  }

  ngOnInit() {
    this.clienteService.consultar().subscribe(clientes => this.clientes = clientes);

    this.clienteService.notificar.subscribe(indicador => {
      console.log('Subscribiendo los nuevos datos de los Clientes: ' + indicador);
      this.clienteService.consultar().subscribe(clientes => this.clientes = clientes);
    });
  }

  public delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Cuidado!',
      text: `Está seguro de eliminar el cliente ${cliente.nombres} ${cliente.apellidos} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.eliminar(cliente).subscribe(
          response => {
            if (!response) {
              this.clientes = this.clientes.filter(cli => cli !== cliente);
              swalWithBootstrapButtons.fire(
                'Cliente eliminado',
                `El cliente se ha eliminado con éxito de la base de datos`,
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
