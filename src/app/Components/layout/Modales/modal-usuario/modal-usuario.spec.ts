import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../Services/usuario.service';
import { of } from 'rxjs';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { RolService } from '../../../../Services/rol.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UsuarioComponent', () => {
    let component: ModalUsuarioComponent;
    let fixture: ComponentFixture<ModalUsuarioComponent>;

    let mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['guardar', 'editar']);
    let mockUtilidadService = jasmine.createSpyObj('UtilidadService', ['obtenerSesionUsuario','mostrarAlerta']);
    let mockRolService = jasmine.createSpyObj('RolService', ['list']);
    let mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    beforeEach(async () => {
        mockUtilidadService.obtenerSesionUsuario.and.returnValue({idUsuario: 1});
        mockRolService.list.and.returnValue(of({status:true, value:[]}));
        await TestBed.configureTestingModule({
          imports: [ReactiveFormsModule, ModalUsuarioComponent, BrowserAnimationsModule],
          providers: [
            { provide: MatDialogRef, useValue: mockDialogRef },
            { provide: UsuarioService, useValue: mockUsuarioService },
            { provide: UtilidadService, useValue: mockUtilidadService },
            { provide: RolService, useValue: mockRolService },
            { provide: MAT_DIALOG_DATA, useValue: null } // Simulamos que es creación de nuevo usuario
          ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalUsuarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debería crear el componente correctamente', () => {
        expect(component).toBeTruthy();
    });
    
    /* 
    // Clases de equivalencia para "Nombre Completo"
    it('CLASES EQUIVALENCIA: debería ser válido cuando el nombre tiene entre 1 y 100 caracteres', () => {
        component.formularioUsuario.controls['nombreCompleto'].setValue('Juan Lopez');
        expect(component.formularioUsuario.controls['nombreCompleto'].valid).toBeTrue();
    });
    
    it('CLASES EQUIVALENCIA: debería ser inválido cuando el nombre tiene menos de 1 caracter', () => {
        component.formularioUsuario.controls['nombreCompleto'].setValue('');
        expect(component.formularioUsuario.controls['nombreCompleto'].invalid).toBeTrue();
    });

    it('CLASES EQUIVALENCIA: debería ser inválido cuando el nombre tiene más de 100 caracteres', () => {
        component.formularioUsuario.controls['nombreCompleto'].setValue('a'.repeat(101));
        expect(component.formularioUsuario.controls['nombreCompleto'].invalid).toBeTrue();
    });

    // Clases de equivalencia para "Correo"
    it('CLASES EQUIVALENCIA: debería ser válido cuando el correo tiene un formato correcto', () => {
        component.formularioUsuario.controls['correo'].setValue('correo@gmail.com');
        expect(component.formularioUsuario.controls['correo'].valid).toBeTrue();
    });

    it('CLASES EQUIVALENCIA: debería ser inválido cuando el correo tiene menos de 6 caracteres antes del @', () => {
        component.formularioUsuario.controls['correo'].setValue('a@g.com');
        expect(component.formularioUsuario.controls['correo'].invalid).toBeTrue();
    });

    it('CLASES EQUIVALENCIA: debería ser inválido cuando el correo tiene más de 40 caracteres antes del @', () => {
        component.formularioUsuario.controls['correo'].setValue('a'.repeat(41) + '@gmail.com');
        expect(component.formularioUsuario.controls['correo'].invalid).toBeTrue();
    });
    
    it('CLASES EQUIVALENCIA: debería ser inválido cuando el correo tiene un formato incorrecto', () => {
        component.formularioUsuario.controls['correo'].setValue('correo_invalido');
        expect(component.formularioUsuario.controls['correo'].invalid).toBeTrue();
    });

    // Clases de equivalencia para "Rol"
    it('CLASES EQUIVALENCIA: debería ser válido cuando el rol es "Administrador"', () => {
        component.formularioUsuario.controls['idRol'].setValue(1);  // Asumiendo que 1 corresponde a Administrador
        expect(component.formularioUsuario.controls['idRol'].valid).toBeTrue();
    });
    
    it('CLASES EQUIVALENCIA: debería ser inválido cuando el rol es inválido', () => {
        component.formularioUsuario.controls['idRol'].setValue('Otro');
        expect(component.formularioUsuario.controls['idRol'].invalid).toBeTrue();
    });
    
    // Clases de equivalencia para "Contraseña"
    it('CLASES EQUIVALENCIA: debería ser válido cuando la contraseña tiene entre 8 y 16 caracteres', () => {
        component.formularioUsuario.controls['clave'].setValue('12345678');
        expect(component.formularioUsuario.controls['clave'].valid).toBeTrue();
    });
    
    it('CLASES EQUIVALENCIA: debería ser inválido cuando la contraseña tiene menos de 8 caracteres', () => {
        component.formularioUsuario.controls['clave'].setValue('12345');
        expect(component.formularioUsuario.controls['clave'].invalid).toBeTrue();
    });
    
    it('CLASES EQUIVALENCIA: debería ser inválido cuando la contraseña tiene más de 16 caracteres', () => {
        component.formularioUsuario.controls['clave'].setValue('12345678901234567');
        expect(component.formularioUsuario.controls['clave'].invalid).toBeTrue();
    });
 
    // Clases de equivalencia para "Estado"
    it('CLASES EQUIVALENCIA: debería ser válido cuando el estado es "Activo"', () => {
        component.formularioUsuario.controls['esActivo'].setValue('1'); // 1 es activo
        expect(component.formularioUsuario.controls['esActivo'].valid).toBeTrue();
    });
    
    it('CLASES EQUIVALENCIA: debería ser inválido cuando el estado es inválido', () => {
        component.formularioUsuario.controls['esActivo'].setValue('Otro');
        expect(component.formularioUsuario.controls['esActivo'].invalid).toBeTrue();
    });
    
    // Valores Limite
    // Nombre Completo
    it('VALORES LIMITE: debería ser válido cuando el nombre tiene 100 caracteres', () => {
        component.formularioUsuario.controls['nombreCompleto'].setValue('a'.repeat(100));
        expect(component.formularioUsuario.controls['nombreCompleto'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el nombre tiene más de 100 caracteres', () => {
        component.formularioUsuario.controls['nombreCompleto'].setValue('a'.repeat(101));
        expect(component.formularioUsuario.controls['nombreCompleto'].invalid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el nombre tiene 1 caracter', () => {
        component.formularioUsuario.controls['nombreCompleto'].setValue('J');
        expect(component.formularioUsuario.controls['nombreCompleto'].valid).toBeTrue();
    });
    
    // Correo
    it('VALORES LIMITE: debería ser válido cuando el correo tiene 40 caracteres antes del @', () => {
        component.formularioUsuario.controls['correo'].setValue('a'.repeat(40) + '@gmail.com');
        expect(component.formularioUsuario.controls['correo'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el correo tiene más de 40 caracteres antes del @', () => {
        component.formularioUsuario.controls['correo'].setValue('a'.repeat(41) + '@gmail.com');
        expect(component.formularioUsuario.controls['correo'].invalid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser válido cuando el correo tiene exactamente 6 caracteres antes del @', () => {
        component.formularioUsuario.controls['correo'].setValue('correo@gmail.com');
        expect(component.formularioUsuario.controls['correo'].valid).toBeTrue();
    });
    
    it('VALORE LIMITE: debería ser inválido cuando el correo tiene menos de 6 caracteres antes del @', () => {
        component.formularioUsuario.controls['correo'].setValue('c@g.com');
        expect(component.formularioUsuario.controls['correo'].invalid).toBeTrue();
    });
    
    // Contraseña
    it('VALORES LIMITE: debería ser válido cuando la contraseña tiene 16 caracteres', () => {
        component.formularioUsuario.controls['clave'].setValue('1234567890123456');
        expect(component.formularioUsuario.controls['clave'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando la contraseña tiene más de 16 caracteres', () => {
        component.formularioUsuario.controls['clave'].setValue('12345678901234567');
        expect(component.formularioUsuario.controls['clave'].invalid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser válido cuando la contraseña tiene exactamente 8 caracteres', () => {
        component.formularioUsuario.controls['clave'].setValue('12345678');
        expect(component.formularioUsuario.controls['clave'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando la contraseña tiene menos de 8 caracteres', () => {
        component.formularioUsuario.controls['clave'].setValue('1234567');
        expect(component.formularioUsuario.controls['clave'].invalid).toBeTrue();
    });
    */
});