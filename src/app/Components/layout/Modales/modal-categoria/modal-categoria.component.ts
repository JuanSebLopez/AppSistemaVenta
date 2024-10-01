import { Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from '../../../../Interfaces/categoria';
import { CategoriaService } from '../../../../Services/categoria.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import { MatDialogModule } from '@angular/material/dialog'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-categoria',
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
  templateUrl: './modal-categoria.component.html',
  styleUrl: './modal-categoria.component.css'
})
export class ModalCategoriaComponent implements OnInit{
  formularioCategoria: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";

  constructor(
    private modalActual: MatDialogRef <ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCategoria: Categoria,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService,
    private _utilidadServicio: UtilidadService
  )
  {
    this.formularioCategoria = this.fb.group({
      nombre: ['', Validators.required],
      esActivo: ['1', Validators.required]
    });

    if(datosCategoria != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }

  ngOnInit(): void {
      if(this.datosCategoria != null) {
        this.formularioCategoria.patchValue({
          nombre: this.datosCategoria.nombre,
          esActivo: this.datosCategoria.esActivo.toString()
        });
      }
  }

  guardarEditar_Categoria() {
    const _categoria: Categoria = {
      idCategoria: this.datosCategoria == null ? 0 : this.datosCategoria.idCategoria,
      nombre: this.formularioCategoria.value.nombre,
      esActivo: parseInt(this.formularioCategoria.value.esActivo)
    }

    if (this.datosCategoria == null) {
      this._categoriaServicio.guardar(_categoria).subscribe({
        next: (data) => {
          if (data.status){
            this._utilidadServicio.mostrarAlerta("La categoria fue registrada", "Exito");
            this.modalActual.close("true");
          }
          else {
            this._utilidadServicio.mostrarAlerta("No se pudo registrar la categoría", "Error");
          }
        },
        error: (e) => {}
      });
    }
    else {
      this._categoriaServicio.editar(_categoria).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("La categoría fue editada", "Éxito");
            this.modalActual.close("true");
          } else {
            this._utilidadServicio.mostrarAlerta("No se pudo editar la categoría", "Error");
          }
        },
        error: (e) => {}
      });
    }
  }
}
