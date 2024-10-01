import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../Interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackBar:MatSnackBar) { }

  mostrarAlerta(mensaje:string, tipo:string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition:"top",
      duration:3000
    });
  }

  guardarSesion(usuarioSesion: Sesion) {
    console.log('Sesión guardada:', usuarioSesion);
    localStorage.setItem("usuario", JSON.stringify(usuarioSesion));
  }

  obtenerSesionUsuario() {
    const dataCadena = localStorage.getItem("usuario");
    const usuario = JSON.parse(dataCadena!);
    return usuario;
  }
  
  eliminarSesionUsuario() {
    localStorage.removeItem("usuario");
  }

  estaAutenticado(): boolean {
    return this.obtenerSesionUsuario() !== null;
  }
}
