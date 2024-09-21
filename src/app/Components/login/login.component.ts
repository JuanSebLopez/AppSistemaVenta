import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Interfaces/login';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'; 
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formularioLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private _usuarioServicio: UsuarioService, 
    private _utilidadServicio: UtilidadService
  ) 
  {
    this.formularioLogin = this.fb.group({
      email: [
        '', 
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6)
        ]
      ],
      password: [
        '', 
        [
          Validators.required
        ]
      ]
    });
  }

  ngOnInit(): void {
      if (this._utilidadServicio.estaAutenticado()) {
        this.router.navigate(['pages']);
      }

      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
  }

  iniciarSesion() {
    this.mostrarLoading = true;

    const request: Login = {
      correo: this.formularioLogin.value.email,
      clave: this.formularioLogin.value.password
    }

    this._usuarioServicio.iniciarSesion(request).subscribe({
      next: (data) => {
        if(data.status){
          this._utilidadServicio.guardarSesion(data.value);
          this.router.navigate(["pages"])
        }
        else {
          this._utilidadServicio.mostrarAlerta("No se encontraron coincidencias", "Oops!");
        }
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error : () => {
        this._utilidadServicio.mostrarAlerta("Hubo un error", "Oops!");
      }
    })
  }
}
