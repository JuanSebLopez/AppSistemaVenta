import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReporteComponent } from "./reporte.component";
import { UtilidadService } from "../../../../Reutilizable/utilidad.service";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VentaService } from "../../../../Services/venta.service";
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import moment from "moment";

describe('ReporteComponent', () => {
    let component: ReporteComponent;
    let fixture: ComponentFixture<ReporteComponent>;
    let ventaServiceMock: any;
    let utilidadServiceMock: any;

    beforeEach(async () => {
        ventaServiceMock = {
            reporte: jasmine.createSpy('reporte').and.returnValue(of({status:true, value: []}))
        };
        utilidadServiceMock = {
            mostrarAlerta: jasmine.createSpy('mostrarAlerta')
        };

        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatTableModule,
                ReporteComponent,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: VentaService, useValue: ventaServiceMock },
                { provide: UtilidadService, useValue: utilidadServiceMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ReporteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Test para verificar que se crea correctamente
    it('debería crear el componente correctamente', () => {
        expect(component).toBeTruthy();
    });

    // Clases de equivalencia
    it('debería ser válido cuando las fechas son correctas', () => {
        component.formularioFiltro.patchValue({
        fechaInicio: moment('2023/01/01', 'YYYY-MM-DD'),
        fechaFin: moment('2023/01/10', 'YYYY-MM-DD')
        });
        component.formularioFiltro.updateValueAndValidity();
        expect(component.formularioFiltro.valid).toBeTrue();
    });

    it('debería ser inválido cuando la fecha de inicio es mayor a la fecha de fin', () => {
        component.formularioFiltro.patchValue({
          fechaInicio: '2024/05/10',
          fechaFin: '2024/05/09'
        });
        component.formularioFiltro.updateValueAndValidity();
        expect(component.formularioFiltro.invalid).toBeTrue();
    });

    it('debería ser inválido cuando alguna fecha es futura', () => {
        const fechaFutura = moment().add(1, 'days').format('DD/MM/YYYY');
        const fechaPasada = moment('2023-01-05', 'YYYY-MM-DD').format('DD/MM/YYYY');
        component.formularioFiltro.patchValue({
          fechaInicio: fechaFutura,
          fechaFin: fechaPasada
        });
        component.formularioFiltro.updateValueAndValidity();
        component.buscarVentas();
        expect(utilidadServiceMock.mostrarAlerta).toHaveBeenCalledWith('Las fechas no pueden ser futuras', 'Oops!');
    });

    it('debería ser inválido cuando las fechas no son válidas o están vacías', () => {
        component.formularioFiltro.patchValue({
          fechaInicio: '',
          fechaFin: ''
        });
        component.buscarVentas();
        expect(utilidadServiceMock.mostrarAlerta).toHaveBeenCalledWith('Debe ingresar ambas fechas', 'Oops!');
        expect(component.formularioFiltro.invalid).toBeTrue();
    });
});