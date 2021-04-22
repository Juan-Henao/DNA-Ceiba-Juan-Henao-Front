import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';

const FORMAT_DATE = 'yyyy-MM-dd HH:mm:ss';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class GestionarClienteComponent implements OnInit {

  public clienteForm: FormGroup;

  public titulo: string;
  public cliente: Cliente;
  private crearClicked: boolean;
  public fechaCreacionDate: Date;

  public atributoAutocomplete = 'nombre';

  constructor(protected clienteService: ClienteService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe) {
    this.crearClicked = false;
  }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.construirFormularioProducto();
    this.cargarCliente();
  }

  private cargarCliente(): void {
    this.activateRoute.params.subscribe(params => {
      const key = 'id';
      const id = params[key];
      if (id) {
        this.titulo = 'Actualizar Cliente';
        this.clienteService.consultarPorId(id).subscribe(cliente => {
          this.cliente = cliente;
          this.setValue();
        });
      } else {
        this.titulo = 'Crear Cliente';
      }
    });
  }

  private setValue(): void {
    this.fechaCreacionDate = new Date(this.cliente.fechaCreacion);
    const fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.clienteForm.setValue({
      nombres: this.cliente.nombres,
      apellidos: this.cliente.apellidos,
      fechaCreacion: fechaCitaFormateada,
      identificacion: this.cliente.identificacion,
      email: this.cliente.email,
    });
  }

  private construirFormularioProducto() {
    if (!this.fechaCreacionDate) {
      this.fechaCreacionDate = new Date();
    }
    const fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.clienteForm = new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      fechaCreacion: new FormControl({value: fechaCitaFormateada, disabled: true}, [Validators.required]),
      identificacion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
    this.fabricarCliente();
    this.clienteService.guardar(this.cliente).subscribe(response => {
      if (response) {
        this.router.navigate(['/cliente']);
        this.clienteService.notificar.emit(response);
        Swal.fire('Se ha creado el Cliente', 'El Cliente se ha creado con éxito en la base de datos', 'success');
      }
    }, err => {
      Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
    });
  }

  public actualizar(): void {
    this.fabricarCliente();
    this.clienteService.actualizar(this.cliente).subscribe(response => {
      this.router.navigate(['/cliente']);
      this.clienteService.notificar.emit(response);
      Swal.fire('Se ha actualizado el Cliente', 'El Cliente se actualizó correctamente', 'success');
    }, err => {
      Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
    });
  }

  private fabricarCliente(): void {
    this.cliente.nombres = this.clienteForm.get('nombres').value;
    this.cliente.apellidos = this.clienteForm.get('apellidos').value;
    this.cliente.identificacion = this.clienteForm.get('identificacion').value;
    this.cliente.email = this.clienteForm.get('email').value;
    const fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.cliente.fechaCreacion = fechaCitaFormateada;
  }


  public onCrearClick(): void {
    this.crearClicked = true;
  }

  public onEditarClick(): void {
    this.crearClicked = false;
  }

}
