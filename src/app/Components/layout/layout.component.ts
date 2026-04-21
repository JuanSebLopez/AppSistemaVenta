import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';

import { Menu } from '../../Interfaces/menu';
import { MenuService } from '../../Services/menu.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule} from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatListModule } from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule
],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  listaMenus:Menu[] = [];
  correoUsuario:string = '';
  rolUsuario:string = '';

  constructor(
    private router:Router,
    private _menuServicio : MenuService,
    private _utilidadServicio: UtilidadService
  ) { }

  ngOnInit(): void {
    const usuario = this._utilidadServicio.obtenerSesionUsuario();

    if(usuario != null){
      this.correoUsuario = usuario.correo;
      this.rolUsuario = usuario.rolDescripcion;

      this._menuServicio.list(usuario.idUsuario).subscribe({
        next: (data) =>{
          if(data.status) this.listaMenus = data.value;
        },
        error:(e)=>{}
      });
    }
  }

  cerrarSesion() {
    this._utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }
}
