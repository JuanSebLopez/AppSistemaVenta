import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['iniciarSesion']);
    let mockUtilidadService = jasmine.createSpyObj('UtilidadService', ['guardarSesion', 'mostrarAlerta', 'estaAutenticado']);
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
            LoginComponent,
            ReactiveFormsModule,
            MatCardModule,
            BrowserAnimationsModule,
        ],
        providers: [
          { provide: UsuarioService, useValue: mockUsuarioService },
          { provide: UtilidadService, useValue: mockUtilidadService }
        ]
      }).compileComponents();
  
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    // Prueba de crear el componente
    it('debería crear el componente de login', () => {
      expect(component).toBeTruthy();
    });
    /*
    // Clases de equivalencia
    it('CLASES EQUIVALENCIA: debería ser inválido cuando el email tiene un formato incorrecto (invalidEmail.com)', () => {
      component.formularioLogin.controls['email'].setValue('invalidEmail.com');
      expect(component.formularioLogin.controls['email'].invalid).toBeTruthy();
    });
    
    it('CLASES EQUIVALENCIA: debería ser inválido cuando el email tiene menos de 6 caracteres antes del @', () => {
      component.formularioLogin.controls['email'].setValue('corr@com');
      expect(component.formularioLogin.controls['email'].invalid).toBeTruthy();
    });
    
    it('CLASES EQUIVALENCIA: debería ser inválido cuando el email está vacío', () => {
      component.formularioLogin.controls['email'].setValue('');
      expect(component.formularioLogin.controls['email'].invalid).toBeTruthy();
    });
    
    it('CLASES EQUIVALENCIA: debería ser válido cuando el email tiene un formato correcto (validEmail@gmail.com)', () => {
      component.formularioLogin.controls['email'].setValue('validEmail@gmail.com');
      expect(component.formularioLogin.controls['email'].valid).toBeTruthy();
    });
    
    it('CLASES EQUIVALENCIA: debería ser inválido cuando la contraseña está vacía', () => {
      component.formularioLogin.controls['password'].setValue('');
      expect(component.formularioLogin.controls['password'].invalid).toBeTruthy();
    });
    
    it('CLASES EQUIVALENCIA: debería ser válido cuando la contraseña no está vacía', () => {
      component.formularioLogin.controls['password'].setValue('12341252342123');
      expect(component.formularioLogin.controls['password'].valid).toBeTruthy();
    });
    
    // Valores Limite
    it('VALORES LIMITE: debería ser válido cuando el email tiene exactamente 6 caracteres antes del @', () => {
      component.formularioLogin.controls['email'].setValue('correo@gmail.com');
      expect(component.formularioLogin.controls['email'].valid).toBeTruthy();
    });
    
    it('VALORES LIMITE: debería ser válido cuando el email tiene más de 6 caracteres antes del @', () => {
      component.formularioLogin.controls['email'].setValue('correo1@gmail.com');
      expect(component.formularioLogin.controls['email'].valid).toBeTruthy();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el email tiene menos de 6 caracteres antes del @', () => {
      component.formularioLogin.controls['email'].setValue('corre@gmail.com');
      expect(component.formularioLogin.controls['email'].invalid).toBeTruthy();
    });
    */
});