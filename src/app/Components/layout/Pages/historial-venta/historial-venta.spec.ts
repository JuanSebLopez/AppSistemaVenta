import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialVentaComponent } from './historial-venta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VentaService } from '../../../../Services/venta.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import moment from 'moment';

describe('HistorialVentaComponent', () => {
  let component: HistorialVentaComponent;
  let fixture: ComponentFixture<HistorialVentaComponent>;
  let ventaServiceMock: any;
  let utilidadServiceMock: any;
  let matDialogMock: any;

  beforeEach(async () => {
    ventaServiceMock = {
      historial: jasmine.createSpy('historial').and.returnValue(of({ status: true, value: [] }))
    };
    utilidadServiceMock = {
      mostrarAlerta: jasmine.createSpy('mostrarAlerta')
    };
    matDialogMock = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatTableModule, HistorialVentaComponent, BrowserAnimationsModule],
      providers: [
        { provide: VentaService, useValue: ventaServiceMock },
        { provide: UtilidadService, useValue: utilidadServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora los errores por componentes/material no usados
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test para verificar que se crea correctamente
  it('debería crear el componente correctamente', () => {
      expect(component).toBeTruthy();
    });
    
  // Clases de equivalencia 
  /* 
  it('debería ser válido cuando las fechas son correctas', () => {
    component.formularioBusqueda.patchValue({
      buscarPor: 'fecha',
      fechaInicio: moment('2024/01/01', 'YYYY-MM-DD'),
      fechaFin: moment('2024/01/05', 'YYYY-MM-DD')
    });
    component.formularioBusqueda.updateValueAndValidity();
    expect(component.formularioBusqueda.valid).toBeTrue();
  });
  
  it('debería ser inválido cuando la fecha de inicio es mayor a la fecha de fin', () => {
    component.formularioBusqueda.patchValue({
      buscarPor: 'fecha',
      fechaInicio: '2024/05/10',
      fechaFin: '2024/05/09'
    });
    component.formularioBusqueda.updateValueAndValidity();
    expect(component.formularioBusqueda.invalid).toBeTrue();
  });
  
  it('debería ser inválido cuando alguna fecha es futura', () => {
    const fechaFutura = moment().add(1, 'days').format('DD/MM/YYYY');
    const fechaPasada = moment('2024-01-05', 'YYYY-MM-DD').format('DD/MM/YYYY');
    component.formularioBusqueda.patchValue({
      buscarPor: 'fecha',
      fechaInicio: fechaFutura,
      fechaFin: fechaPasada
    });
    component.formularioBusqueda.updateValueAndValidity();
    component.buscarVentas();
    expect(utilidadServiceMock.mostrarAlerta).toHaveBeenCalledWith('Las fechas no pueden ser futuras', 'Oops!');
  });
  
  
  it('debería ser inválido cuando las fechas no son válidas o están vacías', () => {
    component.formularioBusqueda.patchValue({
      buscarPor: 'fecha',
      fechaInicio: '',
      fechaFin: ''
    });
    component.buscarVentas();
    expect(utilidadServiceMock.mostrarAlerta).toHaveBeenCalledWith('Debe ingresar ambas fechas', 'Oops!');
    expect(component.formularioBusqueda.invalid).toBeTrue();
  });
  
  
  it('debería manejar bien la comparación de fechas con Moment', () => {
    const fecha1 = moment('2024-01-05', 'YYYY-MM-DD').format('DD/MM/YYYY');
    const fecha2 = moment('2024-01-05', 'YYYY-MM-DD').format('DD/MM/YYYY');
    expect(moment(fecha1, 'DD/MM/YYYY').isSame(moment(fecha2, 'DD/MM/YYYY'))).toBeTrue();
  });
  
  it('debería ser válido cuando se ingresa un número de venta válido', () => {
    component.formularioBusqueda.patchValue({
      buscarPor: 'numero',
      numero: 1
    });
    expect(component.formularioBusqueda.valid).toBeTrue();
  });
  
  it('debería ser inválido cuando se ingresa un número de venta negativo', () => {
    component.formularioBusqueda.patchValue({
      buscarPor: 'numero',
      numero: '-2'
    });
    expect(component.formularioBusqueda.invalid).toBeTrue();
  });
  */

  // Valores Limite
  it('debería ser válido cuando el Número Orden es igual a 1', () => {
    component.formularioBusqueda.patchValue({
      buscarPor: 'numero',
      numero: '1'
    });

    component.formularioBusqueda.updateValueAndValidity();
    expect(component.formularioBusqueda.valid).toBeTrue();
  });

  it('debería ser válido cuando el Número Orden es igual a 2', () => {
    component.formularioBusqueda.patchValue({
      buscarPor: 'numero',
      numero: '2'
    });

    component.formularioBusqueda.updateValueAndValidity();
    expect(component.formularioBusqueda.valid).toBeTrue();
  });

  it('debería ser inválido cuando el Número Orden es igual a 0', () => {
    component.formularioBusqueda.patchValue({
      buscarPor: 'numero',
      numero: '0'
    });

    component.formularioBusqueda.updateValueAndValidity();
    expect(component.formularioBusqueda.invalid).toBeTrue();
  });
});