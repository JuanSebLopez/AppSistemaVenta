import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  readonly featureList = [
    {
      title: 'Modulo de autenticacion',
      description: 'Entrada al sistema con sesion persistida y envio de token para consumir la API.'
    },
    {
      title: 'Operacion de catalogo',
      description: 'Gestion de categorias, productos, stock y estados activos dentro del panel.'
    },
    {
      title: 'Cierre y consulta',
      description: 'Registro de ventas, historial por filtros, dashboard semanal y exportacion de reportes.'
    }
  ];

  readonly highlights = [
    'Angular 18 con componentes standalone y Angular Material',
    'Consumo de API REST externa con interceptor de autorizacion',
    'Flujo academico completo: login, menu, CRUD, venta e historial',
    'Proyecto util para migracion, despliegue y mejora de interfaz'
  ];
}
