import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { LandingComponent } from './Components/landing/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full'},
    { path: 'login', component: LoginComponent, pathMatch: 'full'},
    {
        path: 'pages',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', loadComponent: () => import('./Components/layout/Pages/dash-board/dash-board.component').then(m => m.DashBoardComponent)},
            { path: 'usuarios', loadComponent: () => import('./Components/layout/Pages/usuario/usuario.component').then(m => m.UsuarioComponent)},
            { path: 'usuario', redirectTo: 'usuarios', pathMatch: 'full' },
            { path: 'roles', redirectTo: 'usuarios', pathMatch: 'full' },
            { path: 'rol', redirectTo: 'usuarios', pathMatch: 'full' },
            { path: 'productos', loadComponent: () => import('./Components/layout/Pages/producto/producto.component').then(m => m.ProductoComponent)},
            { path: 'producto', redirectTo: 'productos', pathMatch: 'full' },
            { path: 'categorias', redirectTo: 'productos', pathMatch: 'full' },
            { path: 'categoria', redirectTo: 'productos', pathMatch: 'full' },
            { path: 'venta', loadComponent: () => import('./Components/layout/Pages/venta/venta.component').then(m => m.VentaComponent)},
            { path: 'historial_venta', loadComponent: () => import('./Components/layout/Pages/historial-venta/historial-venta.component').then(m => m.HistorialVentaComponent)},
            { path: 'historialventa', redirectTo: 'historial_venta', pathMatch: 'full' },
            { path: 'historial-venta', redirectTo: 'historial_venta', pathMatch: 'full' },
            { path: 'historial_ventas', redirectTo: 'historial_venta', pathMatch: 'full' },
            { path: 'historialventas', redirectTo: 'historial_venta', pathMatch: 'full' },
            { path: 'reportes', loadComponent: () => import('./Components/layout/Pages/reporte/reporte.component').then(m => m.ReporteComponent)}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
