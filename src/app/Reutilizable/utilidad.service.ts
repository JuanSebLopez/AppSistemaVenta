import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../Interfaces/sesion';
import { Menu } from '../Interfaces/menu';
import { environment } from '../../environments/environment';
import { Usuario } from '../Interfaces/usuario';
import { Producto } from '../Interfaces/producto';
import { Categoria } from '../Interfaces/categoria';
import { Venta } from '../Interfaces/venta';
import { Reporte } from '../Interfaces/reporte';
import { Rol } from '../Interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {
  private readonly demoSession: Sesion = {
    idUsuario: 999,
    nombreCompleto: 'Usuario Demo',
    correo: 'demo@sistemaventa.local',
    rolDescripcion: 'Administrador Demo',
    token: 'demo-token'
  };

  private readonly demoMenus: Menu[] = [
    { idMenu: 1, nombre: 'Dashboard', icono: 'dashboard', url: '/pages/dashboard' },
    { idMenu: 2, nombre: 'Usuarios', icono: 'group', url: '/pages/usuarios' },
    { idMenu: 3, nombre: 'Productos', icono: 'inventory_2', url: '/pages/productos' },
    { idMenu: 4, nombre: 'Venta', icono: 'point_of_sale', url: '/pages/venta' },
    { idMenu: 5, nombre: 'Historial', icono: 'history', url: '/pages/historial_venta' },
    { idMenu: 6, nombre: 'Reportes', icono: 'feed', url: '/pages/reportes' }
  ];

  private readonly demoRoles: Rol[] = [
    { idRol: 1, nombre: 'Administrador' },
    { idRol: 2, nombre: 'Supervisor' },
    { idRol: 3, nombre: 'Vendedor' }
  ];

  private readonly demoCategorias: Categoria[] = [
    { idCategoria: 1, nombre: 'Perifericos', esActivo: 1 },
    { idCategoria: 2, nombre: 'Audio', esActivo: 1 },
    { idCategoria: 3, nombre: 'Accesorios', esActivo: 1 },
    { idCategoria: 4, nombre: 'Archivo', esActivo: 0 }
  ];

  private readonly demoProductos: Producto[] = [
    { idProducto: 1, nombre: 'Teclado mecanico K2', idCategoria: 1, descripcionCategoria: 'Perifericos', stock: 18, precio: '239.00', esActivo: 1 },
    { idProducto: 2, nombre: 'Mouse ergonomico MX Lite', idCategoria: 1, descripcionCategoria: 'Perifericos', stock: 12, precio: '189.00', esActivo: 1 },
    { idProducto: 3, nombre: 'Audifonos Studio One', idCategoria: 2, descripcionCategoria: 'Audio', stock: 9, precio: '329.00', esActivo: 1 },
    { idProducto: 4, nombre: 'Hub USB-C 6 puertos', idCategoria: 3, descripcionCategoria: 'Accesorios', stock: 24, precio: '149.00', esActivo: 1 },
    { idProducto: 5, nombre: 'Soporte vertical aluminio', idCategoria: 3, descripcionCategoria: 'Accesorios', stock: 0, precio: '89.00', esActivo: 0 }
  ];

  private readonly demoUsuarios: Usuario[] = [
    { idUsuario: 1, nombreCompleto: 'Laura Mendoza', correo: 'laura.mendoza@demo.local', idRol: 1, rolDescripcion: 'Administrador', clave: 'Demo1234', esActivo: 1 },
    { idUsuario: 2, nombreCompleto: 'Andres Pardo', correo: 'andres.pardo@demo.local', idRol: 2, rolDescripcion: 'Supervisor', clave: 'Demo1234', esActivo: 1 },
    { idUsuario: 3, nombreCompleto: 'Nicolas Rey', correo: 'nicolas.rey@demo.local', idRol: 3, rolDescripcion: 'Vendedor', clave: 'Demo1234', esActivo: 0 }
  ];

  private readonly demoVentas: Venta[] = [
    {
      idVenta: 1,
      numeroDocumento: 'V-2026-0018',
      tipoPago: 'Tarjeta',
      fechaRegistro: '17/04/2026',
      totalTexto: '478.00',
      detalleVenta: [
        { idProducto: 1, descripcionProducto: 'Teclado mecanico K2', cantidad: 1, precioTexto: '239.00', totalTexto: '239.00', productoDescripcion: 'Teclado mecanico K2' } as any,
        { idProducto: 2, descripcionProducto: 'Mouse ergonomico MX Lite', cantidad: 1, precioTexto: '239.00', totalTexto: '239.00', productoDescripcion: 'Mouse ergonomico MX Lite' } as any
      ]
    },
    {
      idVenta: 2,
      numeroDocumento: 'V-2026-0019',
      tipoPago: 'Efectivo',
      fechaRegistro: '18/04/2026',
      totalTexto: '329.00',
      detalleVenta: [
        { idProducto: 3, descripcionProducto: 'Audifonos Studio One', cantidad: 1, precioTexto: '329.00', totalTexto: '329.00', productoDescripcion: 'Audifonos Studio One' } as any
      ]
    },
    {
      idVenta: 3,
      numeroDocumento: 'V-2026-0020',
      tipoPago: 'Tarjeta',
      fechaRegistro: '19/04/2026',
      totalTexto: '298.00',
      detalleVenta: [
        { idProducto: 4, descripcionProducto: 'Hub USB-C 6 puertos', cantidad: 2, precioTexto: '149.00', totalTexto: '298.00', productoDescripcion: 'Hub USB-C 6 puertos' } as any
      ]
    }
  ];

  constructor(private _snackBar:MatSnackBar) { }

  mostrarAlerta(mensaje:string, tipo:string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition:"top",
      duration:3000
    });
  }

  guardarSesion(usuarioSesion: Sesion) {
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

  permitirAccesoDemo(): boolean {
    return !!environment.enableDemoAccess;
  }

  crearSesionDemo() {
    this.guardarSesion(this.demoSession);
  }

  obtenerMenusDemo(): Menu[] {
    return this.demoMenus;
  }

  obtenerRolesDemo(): Rol[] {
    return this.demoRoles;
  }

  obtenerCategoriasDemo(): Categoria[] {
    return this.demoCategorias;
  }

  obtenerProductosDemo(): Producto[] {
    return this.demoProductos;
  }

  obtenerUsuariosDemo(): Usuario[] {
    return this.demoUsuarios;
  }

  obtenerVentasDemo(): Venta[] {
    return this.demoVentas;
  }

  obtenerReporteDemo(): Reporte[] {
    return this.demoVentas.flatMap((venta) =>
      venta.detalleVenta.map((detalle) => ({
        numeroDocumento: venta.numeroDocumento || '',
        tipoPago: venta.tipoPago,
        fechaRegistro: venta.fechaRegistro || '',
        totalVenta: venta.totalTexto,
        producto: detalle.descripcionProducto,
        cantidad: detalle.cantidad,
        precio: detalle.precioTexto,
        total: detalle.totalTexto
      }))
    );
  }

  obtenerResumenDashboardDemo() {
    return {
      totalIngresos: '1,105.00',
      totalVentas: '3',
      totalProductos: '5',
      ventasUltimaSemana: [
        { fecha: 'Lun', total: 1 },
        { fecha: 'Mar', total: 0 },
        { fecha: 'Mie', total: 1 },
        { fecha: 'Jue', total: 0 },
        { fecha: 'Vie', total: 2 },
        { fecha: 'Sab', total: 1 },
        { fecha: 'Dom', total: 0 }
      ]
    };
  }
}
