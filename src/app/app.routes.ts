import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent, pathMatch: 'full'},
    {
        path: 'pages',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', loadComponent: () => import('./Components/layout/Pages/dash-board/dash-board.component').then(m => m.DashBoardComponent)},
            { path: 'usuarios', loadComponent: () => import('./Components/layout/Pages/usuario/usuario.component').then(m => m.UsuarioComponent)},
            { path: 'productos', loadComponent: () => import('./Components/layout/Pages/producto/producto.component').then(m => m.ProductoComponent)},
            { path: 'venta', loadComponent: () => import('./Components/layout/Pages/venta/venta.component').then(m => m.VentaComponent)},
            { path: 'historial_venta', loadComponent: () => import('./Components/layout/Pages/historial-venta/historial-venta.component').then(m => m.HistorialVentaComponent)},
            { path: 'reportes', loadComponent: () => import('./Components/layout/Pages/reporte/reporte.component').then(m => m.ReporteComponent)}
        ]
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];
