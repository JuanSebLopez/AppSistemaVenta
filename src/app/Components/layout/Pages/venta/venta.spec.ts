import { ComponentFixture, TestBed } from "@angular/core/testing";
import { VentaComponent } from "./venta.component"
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductoService } from "../../../../Services/producto.service";
import { VentaService } from "../../../../Services/venta.service";
import { UtilidadService } from "../../../../Reutilizable/utilidad.service";
import { Producto } from "../../../../Interfaces/producto";
import { of } from "rxjs";

describe('VentaComponent', () => {
    let component: VentaComponent;
    let fixture: ComponentFixture<VentaComponent>;

    const mockProductoService = {
        list: jasmine.createSpy('list').and.returnValue(of({status: true, value: [] }))
    }
    const mockVentaService = {
        registrar: jasmine.createSpy('registrar').and.returnValue(of({status: true, value: {numeroDocumento: '123'} }))
    }
    let mockUtilidadService = jasmine.createSpyObj('UtilidadService', ['mostrarAlerta']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VentaComponent, ReactiveFormsModule, BrowserAnimationsModule],
            providers: [
                { provide: ProductoService, useValue: mockProductoService },
                { provide: VentaService, useValue: mockVentaService },
                { provide: UtilidadService, useValue: mockUtilidadService }
            ]
        }).compileComponents();
        
        fixture = TestBed.createComponent(VentaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debería crear el componente correctamente', () => {
        expect(component).toBeTruthy();
    });

    /* 
    // Clases de equivalencia
    // Producto
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando se selecciona un producto válido', () => {
        const productoValido = { idProducto: 1, nombre: 'Laptop', esActivo: 1, stock: 10, precio: '1500' } as Producto;
        component.formularioProductoVenta.controls['producto'].setValue(productoValido);
        expect(component.formularioProductoVenta.controls['producto'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando no se selecciona un producto', () => {
        component.formularioProductoVenta.controls['producto'].setValue(null);
        expect(component.formularioProductoVenta.controls['producto'].invalid).toBeTrue();
    });
    
    // Cantidad
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando la cantidad es mayor o igual a 1', () => {
        component.formularioProductoVenta.controls['cantidad'].setValue(5);
        expect(component.formularioProductoVenta.controls['cantidad'].valid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando la cantidad es menor a 1', () => {
        component.formularioProductoVenta.controls['cantidad'].setValue(0);
        expect(component.formularioProductoVenta.controls['cantidad'].invalid).toBeTrue();
    });
    
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando la cantidad no es un número', () => {
        component.formularioProductoVenta.controls['cantidad'].setValue('abc');
        expect(component.formularioProductoVenta.controls['cantidad'].invalid).toBeTrue();
    });
    
    // Tipo de Pago
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando el tipo de pago es "Efectivo"', () => {
        component.tipodePagoPorDefecto = 'Efectivo';
        expect(component.tipodePagoPorDefecto).toBe('Efectivo');
    });
    
    // Tipo de Pago: Prueba para tipo de pago válido "Tarjeta"
    it('CLASES DE EQUIVALENCIA: debería ser válido cuando el tipo de pago es "Tarjeta"', () => {
        component.tipodePagoPorDefecto = 'Tarjeta';
        expect(component.tipodePagoPorDefecto).toBe('Tarjeta');
    });
    
    // Tipo de Pago: Prueba para tipo de pago inválido
    it('CLASES DE EQUIVALENCIA: debería ser inválido cuando se selecciona un tipo de pago inválido', () => {
        component.tipodePagoPorDefecto = 'Otro';
        expect(['Efectivo', 'Tarjeta']).not.toContain(component.tipodePagoPorDefecto);
    });
    */

    // Valores Limite
    it('VALORES LIMITE: debería ser válido cuando la cantidad es mayor o igual a 1', () => {
        component.formularioProductoVenta.controls['cantidad'].setValue(1);
        expect(component.formularioProductoVenta.controls['cantidad'].valid).toBeTruthy();
    
        component.formularioProductoVenta.controls['cantidad'].setValue(2);
        expect(component.formularioProductoVenta.controls['cantidad'].valid).toBeTruthy();
    });
    
    it('VALORES LIMITE: debería ser inválido cuando la cantidad es 0', () => {
        component.formularioProductoVenta.controls['cantidad'].setValue(0);
        expect(component.formularioProductoVenta.controls['cantidad'].valid).toBeFalsy();
    });
}) 