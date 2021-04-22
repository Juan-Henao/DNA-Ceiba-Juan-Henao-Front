import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '@cliente/shared/model/cliente';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { Compra } from '@compra/shared/model/compra';
import { CompraService } from '@compra/shared/service/compra.service';
import { Parametro } from '@parametro/model/parametro';
import { ParametroService } from '@parametro/service/parametro.service';
import Swal from 'sweetalert2';

const FORMAT_DATE = 'yyyy-MM-dd HH:mm:ss';

@Component({
  selector: 'app-crud-compra',
  templateUrl: './crud-compra.component.html',
  styleUrls: ['./crud-compra.component.css']
})
export class GestionarCompraComponent implements OnInit {

  public compraForm: FormGroup;

  public titulo: string;
  public compra: Compra;
  private crearClicked: boolean;
  public fechaCreacionDate: Date;
  public fechaEntregaDate: Date;

  public parametros: Parametro[];
  public cliente: Cliente[];
  public atributoAutocomplete = 'identificacion';
  public atributoAutocompleteParams = 'valor';
  public itemsPermitidos = ['EN_PROCESO', 'PAGADO', 'CANCELADO'];

  constructor(protected compraService: CompraService,
              protected clienteService: ClienteService,
              protected parametroService: ParametroService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe) {
    this.crearClicked = false;
  }

  ngOnInit(): void {
    this.compra = new Compra();

    this.clienteService.consultar().subscribe(cliente => this.cliente = cliente);
    this.parametroService.consultar().subscribe(parametros =>

      this.parametros = parametros.filter(parametro => this.itemsPermitidos.includes(parametro.enumParametro)));

    this.CargarCliente();
    this.construirFormularioProducto();
  }

  private CargarCliente(): void {
    this.activateRoute.params.subscribe(params => {
      const key = 'id';
      const id = params[key];
      if (id) {
        this.titulo = 'Actualizar Compra';
        this.compraService.consultarPorId(id).subscribe(compra => {
          this.compra = compra;
          this.setValue();
        });
      } else {
        this.titulo = 'Crear Compra';
      }
    });
  }

  private setValue(): void {
    this.fechaCreacionDate = new Date(this.compra.fechaCompra);
    const fechaCompraFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.fechaEntregaDate = new Date(this.compra.fechaEntrega);
    const fechaCompraEntregaFormateada = this.datePipe.transform(this.fechaEntregaDate, FORMAT_DATE);
    this.compraForm.setValue({
      cliente: this.compra.idCliente,
      total: this.compra.total,
      fechaEntrega: fechaCompraEntregaFormateada,
      fechaCompra: fechaCompraFormateada,
      estadoCompra: this.compra.estadoCompra,
    });

  }

  private construirFormularioProducto() {
    if (!this.fechaCreacionDate) {
      this.fechaCreacionDate = new Date();
    }
    if (!this.fechaEntregaDate) {
      this.fechaEntregaDate = new Date();
    }
    const fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    const fechaEntregaFormateada = this.datePipe.transform(this.fechaEntregaDate, FORMAT_DATE);

    this.compraForm = new FormGroup({
      total: new FormControl({ value: 0, disabled: true }, [Validators.required]),
      estadoCompra: new FormControl('', [Validators.required]),
      fechaEntrega: new FormControl({ value: fechaEntregaFormateada, disabled: true }, [Validators.required]),
      fechaCreacion: new FormControl({ value: fechaCitaFormateada, disabled: true }, [Validators.required]),
      cliente: new FormControl('', [Validators.required])

    });
  }

  public crud(): void {
    if (this.crearClicked) {
      this.crear();
    } else {
      this.actualizar();
    }
  }

  public crear(): void {
    this.fabricarCompra();
    this.compraService.guardar(this.compra).subscribe(response => {
      if (response) {
        this.router.navigate(['/compra']);
        this.compraService.notificar.emit(response);
        Swal.fire('Se ha creado el compra', 'El compra se guardó correctamente', 'success');
      }
    }, err => {
      Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
    });

  }

  public actualizar(): void {
    this.fabricarCompra();
    this.compraService.actualizar(this.compra).subscribe(response => {
      this.router.navigate(['/compra']);
      this.compraService.notificar.emit(response);
      Swal.fire('Se ha actualizado el compra', 'El compra se actualizó correctamente', 'success');
    }, err => {
      Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
    });
  }

  private fabricarCompra(): void {
    this.compra.total = this.compraForm.get('total').value;
    const fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.compra.fechaCompra = fechaCitaFormateada;
    this.compra.fechaEntrega = fechaCitaFormateada;

  }

  public seleccionarCliente(item: Cliente): void {
    this.compra.idCliente = item.id;
  }

  public seleccionarEstadoCompra(item: Parametro): void {
    this.compra.estadoCompra = item.valor;
  }

  public onCrearClick(): void {
    this.crearClicked = true;
  }

  public onEditarClick(): void {
    this.crearClicked = false;
  }

}
