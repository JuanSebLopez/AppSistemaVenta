import { AfterViewInit, Component, OnInit, viewChild, ViewChild } from '@angular/core';

import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';
import { Producto } from '../../../../Interfaces/producto';
import { ProductoService } from '../../../../Services/producto.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import { CategoriaService } from '../../../../Services/categoria.service';
import { Categoria } from '../../../../Interfaces/categoria';

// Alertas personalizadas
import Swal from 'sweetalert2';

// Angular Material
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalCategoriaComponent } from '../../Modales/modal-categoria/modal-categoria.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginator,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit, AfterViewInit{

  // Productos
  columnasTabla: string[] = ['nombre','categoria','stock','precio','estado','acciones'];
  dataInicio:Producto[] = [];
  dataListaProductos = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;

  // Categorias
  columnasTablaCategorias: string[] = ['nombre', 'estado', 'acciones'];
  dataListaCategorias = new MatTableDataSource<Categoria>([]);
  @ViewChild(MatPaginator) paginacionTablaCategorias!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _productoServicio:ProductoService,
    private _categoriaServicio: CategoriaService,
    private _utilidadServicio: UtilidadService
  ) { }

  obtenerProductos(){
    this._productoServicio.list().subscribe({
      next: (data) => {
        if(data.status){
          this.dataListaProductos.data = data.value;
        }
        else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops!")
      },
      error:(e) =>{}
    })
  }

  obtenerCategorias() {
    this._categoriaServicio.list().subscribe({
      next: (data) => {
        if (data.status)
          this.dataListaCategorias.data = data.value;
        else
          this._utilidadServicio.mostrarAlerta("No se encontraron categorías", "Oops!")
      },
      error: (e) => { }
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginacionTabla;
    this.dataListaCategorias.paginator = this.paginacionTablaCategorias;
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();
  }
  
  aplicarFiltroTablaCategoria(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaCategorias.filter = filterValue.trim().toLocaleLowerCase();
  }

  // Metodos para Producto
  nuevoProducto(){
    this.dialog.open(ModalProductoComponent, {
      disableClose:true
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "true") this.obtenerProductos();
    });
  }

  editarProducto(producto:Producto){
    this.dialog.open(ModalProductoComponent, {
      disableClose:true,
      data: producto
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "true") this.obtenerProductos();
    });
  }

  eliminarProducto(producto:Producto){
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: producto.nombre,
      icon:"warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) =>{
      if(resultado.isConfirmed){
        this._productoServicio.eliminar(producto.idProducto).subscribe({
          next:(data) =>{
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El producto fue eliminado","Listo!");
              this.obtenerProductos();
            }else
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar el producto","Error");
          },
          error:(e) =>{}
        });
      }
    });
  }

  nuevaCategoria() {
    this.dialog.open(ModalCategoriaComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerCategorias();
      }
    });
  }

  editarCategoria(categoria: Categoria) {
    this.dialog.open(ModalCategoriaComponent, {
      disableClose: true,
      data: categoria  
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerCategorias();
      }
    });
  }

  eliminarCategoria(categoria: Categoria) {
    Swal.fire({
      title: '¿Desea eliminar la categoría?',
      text: categoria.nombre,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {

      if (resultado.isConfirmed) {
        this._categoriaServicio.eliminar(categoria.idCategoria).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta("La categoría fue eliminada", "Listo!");
              this.obtenerCategorias();
            } else
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar la categoría", "Error");
          },
          error: (e) => { }
        });
      }
    });
  }
}
