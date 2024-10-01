import { HttpInterceptorFn } from '@angular/common/http';
import { inject} from '@angular/core';
import { UtilidadService } from '../Reutilizable/utilidad.service'; // O donde estés manejando la sesión

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const utilidadService = inject(UtilidadService);
  const token = utilidadService.obtenerSesionUsuario()?.token;
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }
  return next(req);
}
