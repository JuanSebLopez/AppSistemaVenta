import { Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from '../../../../Interfaces/categoria';
import { Producto } from '../../../../Interfaces/producto';
import { CategoriaService } from '../../../../Services/categoria.service';
import { ProductoService } from '../../../../Services/producto.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import { MatDialogModule } from '@angular/material/dialog'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const validStatus = ['0', '1']; 

@Component({
  selector: 'app-modal-producto',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './modal-producto.component.html',
  styleUrl: './modal-producto.component.css'
})
export class ModalProductoComponent implements OnInit{
  formularioProducto: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaCategorias: Categoria[] = [];

  constructor(
    private modalActual: MatDialogRef <ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioProducto = this.fb.group({
      nombre: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      idCategoria: ['',[Validators.required]],
      stock: ['',[Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
      precio: ['',[Validators.required, Validators.min(50), Validators.pattern("^[0-9]*$")]],
      esActivo: ['1', [Validators.required, validStatusValidator]]
    });

    if(this.datosProducto != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this._categoriaServicio.list().subscribe({
      next: (data) => {
        if(data.status) this.listaCategorias = data.value
      },
      error: (e) => {
        console.log(e)
      }
    });
  }

  ngOnInit(): void {
    if(this.datosProducto != null){
      this.formularioProducto.patchValue({

        nombre: this.datosProducto.nombre,
        idCategoria: this.datosProducto.idCategoria,
        stock: this.datosProducto.stock,
        precio: this.datosProducto.precio,
        esActivo : this.datosProducto.esActivo.toString()
      });
    }
  }

  guardarEditar_Producto(){
    const _producto: Producto = {
      idProducto : this.datosProducto == null ? 0 : this.datosProducto.idProducto,
      nombre : this.formularioProducto.value.nombre,
      idCategoria: this.formularioProducto.value.idCategoria,
      descripcionCategoria: "",
      precio  : this.formularioProducto.value.precio,
      stock: this.formularioProducto.value.stock,
      esActivo: parseInt(this.formularioProducto.value.esActivo),
    }

    if(this.datosProducto == null){
      this._productoServicio.guardar(_producto).subscribe({
        next: (data) =>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El producto fue registrado","Exito");
            this.modalActual.close("true")
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el producto","Error")
        },
        error:(e) => {}
      })
    } else {

      this._productoServicio.editar(_producto).subscribe({
        next: (data) =>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El producto fue editado","Exito");
            this.modalActual.close("true")
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo editar el producto","Error")
        },
        error:(e) => {}
      })
    }

  }
}

export function validStatusValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if(validStatus.includes(value)){
    return null;
  }

  return { invalidStatus: true};
}