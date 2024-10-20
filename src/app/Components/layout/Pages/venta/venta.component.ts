import { Component } from '@angular/core';

import { ProductoService } from '../../../../Services/producto.service';
import { VentaService } from '../../../../Services/venta.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { Producto } from '../../../../Interfaces/producto';
import { Venta } from '../../../../Interfaces/venta';
import { DetalleVenta } from '../../../../Interfaces/detalle-venta';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Alertas personalizadas
import Swal from 'sweetalert2';

// Angular Material
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatAutocompleteModule,
    CommonModule,
    MatInputModule
  ],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent {
  listaProductos:Producto[] = [];
  listaProductosFiltro: Producto[] = [];

  listaProductosParaVenta: DetalleVenta[] = [];
  bloquearBotonRegistrar: boolean = false;

  productoSeleccionado!: Producto;
  tipodePagoPorDefecto: string = "Efectivo";
  totalPagar:  number = 0;

  formularioProductoVenta: FormGroup;
  columnasTabla: string[] = ['producto','cantidad','precio','total','accion'];
  datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);

  retornarProductosPorFiltro(busqueda:any):Producto[]{
    const valorBuscado = typeof busqueda === "string" ? busqueda.toLocaleLowerCase() : busqueda?.nombre?.toLocaleLowerCase() || '';

    return this.listaProductos.filter(item => item.nombre.toLocaleLowerCase().includes(valorBuscado));
  }

  constructor(
    private fb:FormBuilder,
    private _productoServicio: ProductoService,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) { 


    this.formularioProductoVenta = this.fb.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]]
    });

    
    this._productoServicio.list().subscribe({
      next: (data) => {
        if(data.status){
          const lista = data.value as Producto[];
          this.listaProductos = lista.filter(p => p.esActivo == 1 && p.stock > 0);
        }
      },
      error:(e) =>{}
    })

    this.formularioProductoVenta.get('producto')?.valueChanges.subscribe(value => {
      this.listaProductosFiltro = this.retornarProductosPorFiltro(value);
    })


  }

  mostrarProducto(producto: Producto): string{

    return producto.nombre;
  }

  productoParaVenta(event:any){
    this.productoSeleccionado = event.option.value;
  }

  agregarProductoParaVenta(){

    const _cantidad: number = this.formularioProductoVenta.value.cantidad;
    const _precio:number = parseFloat(this.productoSeleccionado.precio);
    const _total:number = _cantidad * _precio;
    this.totalPagar = this.totalPagar + _total;

    this.listaProductosParaVenta.push({
      idProducto : this.productoSeleccionado.idProducto,
      descripcionProducto : this.productoSeleccionado.nombre,
      cantidad : _cantidad,
      precioTexto: String(_precio.toFixed(2)),
      totalTexto : String(_total.toFixed(2))
    })

    this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);

    this.formularioProductoVenta.patchValue({
      producto:'',
      cantidad: ''
    })


  }


  eliminarProducto(detalle: DetalleVenta){
    this.totalPagar = this.totalPagar - parseFloat(detalle.totalTexto),
    this.listaProductosParaVenta = this.listaProductosParaVenta.filter(p => p.idProducto != detalle.idProducto);

    this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);
  }

  registrarVenta(){

    if(this.listaProductosParaVenta.length > 0){

      this.bloquearBotonRegistrar = true;

      const request: Venta = {
        tipoPago : this.tipodePagoPorDefecto,
        totalTexto : String(this.totalPagar.toFixed(2)),
        detalleVenta : this.listaProductosParaVenta
      }

      this._ventaServicio.registrar(request).subscribe({
        next: (response) =>{
          if(response.status){
            this.totalPagar = 0.00;
            this.listaProductosParaVenta = [];
            this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);

            Swal.fire({
              icon: 'success',
              title : 'Venta Registrada!',
              text: `Numero de venta: ${response.value.numeroDocumento}`
            })
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo registrar la venta","Oops");
        },
        complete:()=>{
          this.bloquearBotonRegistrar = false;
        },
        error:(e) => {}
      })

    }
  }
}
