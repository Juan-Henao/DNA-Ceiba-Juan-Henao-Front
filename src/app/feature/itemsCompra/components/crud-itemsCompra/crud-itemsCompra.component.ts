import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from '@compra/shared/model/compra';
import { CompraService } from '@compra/shared/service/compra.service';
import { ItemsCompra } from '@itemsCompra/shared/model/itemsCompra';
import { ItemsCompraService } from '@itemsCompra/shared/service/itemsCompra.service';
import { Parametro } from '@parametro/model/parametro';
import { ParametroService } from '@parametro/service/parametro.service';
import Swal from 'sweetalert2';



const FORMAT_DATE = 'yyyy-MM-dd HH:mm:ss';

@Component({
  selector: 'app-crud-itemscompra',
  templateUrl: './crud-itemsCompra.component.html',
  styleUrls: ['./crud-itemsCompra.component.css']
})
export class GestionarItemsCompraComponent implements OnInit {

  public clienteForm: FormGroup;

  public titulo: string;
  public itemsCompra: ItemsCompra;
  private crearClicked: boolean;
  public fechaCreacionDate: Date;



  // Atributos de autocomplete
  public parametros: Parametro[];
  public compras: Compra[];
  public atributoAutocomplete = 'fechaCompra';
  public atributoAutocompleteParams = 'valor';
  public itemsPermitidos = ['MONOLITICOS', 'DOBLE_ACRISTALAMIENTO', 'LAMINADOS'];
  public precio: number;

  constructor(protected itemsCompraService: ItemsCompraService,
              protected compraService: CompraService,
              protected parametroService: ParametroService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe) {
    this.crearClicked = false;
  }

  ngOnInit(): void {
    this.itemsCompra = new ItemsCompra();
    this.compraService.consultar().subscribe(compras => this.compras = compras);

    this.parametroService.consultar().subscribe(parametros =>

      this.parametros = parametros.filter(parametro => this.itemsPermitidos.includes(parametro.enumParametro)));

    this.cargarCliente();
    this.construirFormularioProducto();

  }

  private cargarCliente(): void {
    this.activateRoute.params.subscribe(params => {
      const key = 'id';
      const id = params[key];
      if (id) {
        this.titulo = 'Actualizar ItemsCompra';
        this.itemsCompraService.consultarPorId(id).subscribe(itemsCompra => {
          this.itemsCompra = itemsCompra;
          this.setValue();
        });
      } else {
        this.titulo = 'Crear ItemsCompra';
      }
    });
  }

  private setValue(): void {
    this.fechaCreacionDate = new Date(this.itemsCompra.fechaCreacion);
    const fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.clienteForm.setValue({
      ancho: this.itemsCompra.ancho,
      largo: this.itemsCompra.largo,
      fechaCreacion: fechaCitaFormateada,
      cantidad: this.itemsCompra.cantidad,
      valor: this.itemsCompra.valor,
      compra: this.itemsCompra.idCompra
    });
  }

  private construirFormularioProducto() {
    if (!this.fechaCreacionDate) {
      this.fechaCreacionDate = new Date();
    }
    const fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.clienteForm = new FormGroup({
      ancho: new FormControl('', [Validators.required]),
      largo: new FormControl('', [Validators.required]),
      fechaCreacion: new FormControl({ value: fechaCitaFormateada, disabled: true }, [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      compra: new FormControl('', [Validators.required]),
      parametro: new FormControl('', [Validators.required]),
      valor: new FormControl({ value: '', disabled: true }),

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
    this.fabricarItemsCompra();
    this.itemsCompraService.guardar(this.itemsCompra).subscribe(response => {
      if (response) {
        this.router.navigate(['/itemsCompra']);
        this.itemsCompraService.notificar.emit(response);
        Swal.fire('Se ha creado el ItemsCompra', 'El ItemsCompra se ha creado con éxito en la base de datos', 'success');
      }
    }, err => {
      Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
    });
  }

  public actualizar(): void {
    this.fabricarItemsCompra();
    this.itemsCompraService.actualizar(this.itemsCompra).subscribe(response => {
      this.router.navigate(['/itemsCompra']);
      this.itemsCompraService.notificar.emit(response);
      Swal.fire('Se ha actualizado el ItemsCompra', 'El ItemsCompra se actualizó correctamente', 'success');
    }, err => {
      Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
    });
  }

  private fabricarItemsCompra(): void {

    this.itemsCompra.ancho = this.clienteForm.get('ancho').value;
    this.itemsCompra.largo = this.clienteForm.get('largo').value;
    this.itemsCompra.cantidad = this.clienteForm.get('cantidad').value;
    const fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.itemsCompra.fechaCreacion = fechaCitaFormateada;
    console.log(this.itemsCompra.cantidad);
    console.log(this.itemsCompra.ancho);
    console.log(this.itemsCompra.largo);
    console.log( this.precio);
    this.itemsCompra.valor = this.itemsCompra.cantidad
      * this.itemsCompra.ancho * this.itemsCompra.largo
      * this.precio;

  }

  public seleccionarCliente(item: Compra): void {
    this.itemsCompra.idCompra = item.id;
  }

  public seleccionarParam(item: Parametro): void {
    this.precio = +item.valor;
  }

  public onCrearClick(): void {
    this.crearClicked = true;
  }

  public onEditarClick(): void {
    this.crearClicked = false;
  }

}
