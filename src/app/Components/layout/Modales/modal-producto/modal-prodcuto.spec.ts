import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModalProductoComponent } from "./modal-producto.component"
import { of } from "rxjs";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoriaService } from "../../../../Services/categoria.service";
import { ProductoService } from "../../../../Services/producto.service";
import { UtilidadService } from "../../../../Reutilizable/utilidad.service";

describe('ModalProductoComponent', () => {
    let component: ModalProductoComponent;
    let fixture: ComponentFixture<ModalProductoComponent>;

    let mockCategoriaService = jasmine.createSpyObj('CategoriaService', ['list']);
    let mockProductoService = jasmine.createSpyObj('ProductoService', ['guardar', 'editar']);
    let mockUtilidadService = jasmine.createSpyObj('UtilidadService', ['mostrarAlerta']);
    let mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    beforeEach(async () => {
        mockCategoriaService.list.and.returnValue(of({status: true, value: []}));

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, BrowserAnimationsModule, ModalProductoComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: CategoriaService, useValue: mockCategoriaService },
                { provide: ProductoService,  useValue: mockProductoService },
                { provide: UtilidadService,  useValue: mockUtilidadService },
                { provide: MAT_DIALOG_DATA,  useValue: null }
            ]
        }).compileComponents();
    
        fixture = TestBed.createComponent(ModalProductoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debería crear el componente correctamente', () => {
        expect(component).toBeTruthy();
    });
    /*
    // Clases de equivalencia
    // Validación del nombre
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando el nombre tiene entre 1 y 100 caracteres', () => {
        component.formularioProducto.controls['nombre'].setValue('Laptop');
        expect(component.formularioProducto.controls['nombre'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando el nombre tiene menos de 1 carácter', () => {
        component.formularioProducto.controls['nombre'].setValue('');
        expect(component.formularioProducto.controls['nombre'].invalid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando el nombre tiene más de 100 caracteres', () => {
        component.formularioProducto.controls['nombre'].setValue('a'.repeat(101));
        expect(component.formularioProducto.controls['nombre'].invalid).toBeTrue();
    });
    
    // Validación de la categoría
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando se selecciona una categoría válida', () => {
        component.listaCategorias = [{
            idCategoria: 1, 
            nombre: 'Tecnología',
            esActivo: 1
        }];
        component.formularioProducto.controls['idCategoria'].setValue(1);
        expect(component.formularioProducto.controls['idCategoria'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando no se selecciona una categoría', () => {
        component.formularioProducto.controls['idCategoria'].setValue('');
        expect(component.formularioProducto.controls['idCategoria'].invalid).toBeTrue();
    });
    
    // Validación del stock
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando el stock es mayor o igual a 1', () => {
        component.formularioProducto.controls['stock'].setValue(50);
        expect(component.formularioProducto.controls['stock'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando el stock es menor a 1', () => {
        component.formularioProducto.controls['stock'].setValue(0);
        expect(component.formularioProducto.controls['stock'].invalid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando el stock no es un número', () => {
        component.formularioProducto.controls['stock'].setValue('dos');
        expect(component.formularioProducto.controls['stock'].invalid).toBeTrue();
    });
    
    // Validación del estado
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando el estado es "Activo"', () => {
        component.formularioProducto.controls['esActivo'].setValue('1');
        expect(component.formularioProducto.controls['esActivo'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando el estado es "Inactivo"', () => {
        component.formularioProducto.controls['esActivo'].setValue('0');  // Asegúrate de usar una cadena '0'
        expect(component.formularioProducto.controls['esActivo'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando el estado es inválido', () => {
        component.formularioProducto.controls['esActivo'].setValue('Otro');
        expect(component.formularioProducto.controls['esActivo'].invalid).toBeTrue();
    });
    
    // Valores Limite
    // Nombre
    it('VALORES LIMITE: debería ser válido cuando el nombre tiene 100 caracteres', () => {
        component.formularioProducto.controls['nombre'].setValue('a'.repeat(100));
        expect(component.formularioProducto.controls['nombre'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el nombre tiene más de 100 caracteres', () => {
        component.formularioProducto.controls['nombre'].setValue('a'.repeat(101));
        expect(component.formularioProducto.controls['nombre'].invalid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el nombre tiene menos de 1 carácter', () => {
        component.formularioProducto.controls['nombre'].setValue('');
        expect(component.formularioProducto.controls['nombre'].invalid).toBeTrue();
    });
    
    // Stock
    it('VALORES LIMITE: debería ser válido cuando el stock es 1', () => {
        component.formularioProducto.controls['stock'].setValue(1);
        expect(component.formularioProducto.controls['stock'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser válido cuando el stock es mayor a 1', () => {
        component.formularioProducto.controls['stock'].setValue(2);
        expect(component.formularioProducto.controls['stock'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el stock es menor que 1', () => {
        component.formularioProducto.controls['stock'].setValue(0);
        expect(component.formularioProducto.controls['stock'].invalid).toBeTrue();
    });
    
    // Precio
    it('VALORES LIMITE: debería ser válido cuando el precio es igual a 50', () => {
        component.formularioProducto.controls['precio'].setValue(50);
        expect(component.formularioProducto.controls['precio'].valid).toBeTrue();
    });

    it('VALORES LIMITE: debería ser válido cuando el precio es mayor que 50', () => {
        component.formularioProducto.controls['precio'].setValue(51);
        expect(component.formularioProducto.controls['precio'].valid).toBeTrue();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando el precio es menor que 50', () => {
        component.formularioProducto.controls['precio'].setValue(49);
        expect(component.formularioProducto.controls['precio'].invalid).toBeTrue();
    });
    */
})