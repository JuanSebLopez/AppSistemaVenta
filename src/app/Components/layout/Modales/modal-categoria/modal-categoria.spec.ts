import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModalCategoriaComponent } from "./modal-categoria.component"
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoriaService } from "../../../../Services/categoria.service";
import { UtilidadService } from "../../../../Reutilizable/utilidad.service";

describe('ModalCategoriaComponent', () => {
    let component: ModalCategoriaComponent;
    let fixture: ComponentFixture<ModalCategoriaComponent>;

    let mockCategoriaService = jasmine.createSpyObj('CategoriaService', ['crear']);
    let mockUtilidadService = jasmine.createSpyObj('UtilidadService', ['mostrarAlerta']);
    let mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ModalCategoriaComponent, ReactiveFormsModule, BrowserAnimationsModule],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: CategoriaService, useValue: mockCategoriaService },
                { provide: UtilidadService, useValue: mockUtilidadService },
                { provide: MAT_DIALOG_DATA, useValue: null }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ModalCategoriaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debería crear el componente correctamente', () => {
        expect(component).toBeTruthy();
    });
    /* 
    // Clases de equivalencia
    // Nombre
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando el nombre tiene entre 1 y 100 caracteres', () => {
        component.formularioCategoria.controls['nombre'].setValue('Tecnología');
        expect(component.formularioCategoria.controls['nombre'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando el nombre tiene menos de 1 carácter', () => {
        component.formularioCategoria.controls['nombre'].setValue('');
        expect(component.formularioCategoria.controls['nombre'].invalid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando el nombre tiene más de 100 caracteres', () => {
        component.formularioCategoria.controls['nombre'].setValue('a'.repeat(101));
        expect(component.formularioCategoria.controls['nombre'].invalid).toBeTrue();
    });
    
    // Estado
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando el estado es "Activo"', () => {
        component.formularioCategoria.controls['esActivo'].setValue('1');  // Estado Activo
        expect(component.formularioCategoria.controls['esActivo'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando el estado es "Inactivo"', () => {
        component.formularioCategoria.controls['esActivo'].setValue('0');  // Estado Inactivo
        expect(component.formularioCategoria.controls['esActivo'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando el estado es inválido', () => {
        component.formularioCategoria.controls['esActivo'].setValue('Otro');  // Estado inválido
        expect(component.formularioCategoria.controls['esActivo'].invalid).toBeTrue();
    });
    
    // Valores Limite
    // Nombre
    it('VALORES LIMITE: debería ser válido cuando el nombre tiene exactamente 100 caracteres', () => {
        component.formularioCategoria.controls['nombre'].setValue('a'.repeat(100));
        expect(component.formularioCategoria.controls['nombre'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el nombre tiene más de 100 caracteres', () => {
        component.formularioCategoria.controls['nombre'].setValue('a'.repeat(101));
        expect(component.formularioCategoria.controls['nombre'].invalid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser válido cuando el nombre tiene exactamente 1 carácter', () => {
        component.formularioCategoria.controls['nombre'].setValue('a');
        expect(component.formularioCategoria.controls['nombre'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el nombre está vacío', () => {
        component.formularioCategoria.controls['nombre'].setValue('');
        expect(component.formularioCategoria.controls['nombre'].invalid).toBeTrue();
    });
    */
})