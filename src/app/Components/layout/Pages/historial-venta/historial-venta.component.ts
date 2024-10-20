import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment, { invalid } from 'moment';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Venta } from '../../../../Interfaces/venta';
import { VentaService } from '../../../../Services/venta.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { ModalDetalleVentaComponent } from '../../Modales/modal-detalle-venta/modal-detalle-venta.component';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MAT_DATE_FORMATS, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-historial-venta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatOptionModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    {provide: MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}
  ],
  templateUrl: './historial-venta.component.html',
  styleUrl: './historial-venta.component.css'
})
export class HistorialVentaComponent implements AfterViewInit{
  formularioBusqueda: FormGroup;
  opcionesBusqueda: any[] = [
    {value: "fecha", descripcion: "Por fechas"},
    {value: "numero", descripcion: "Numero venta"}
  ]
  columnasTabla:string[] = ['fechaRegistro','numeroDocumento','tipoPago','total','accion']
  dataInicio: Venta[] = [];
  datosListaVenta = new MatTableDataSource(this.dataInicio);
  maxDate: Date;
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;

  constructor(
    private fb:FormBuilder,
    private cd: ChangeDetectorRef,
    private dialog:MatDialog,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {
    this.maxDate = new Date();
    const today = new Date();
    
    this.formularioBusqueda = this.fb.group({
      buscarPor: ['fecha', [Validators.required]],
      numero : ['', [this.validarFiltro.bind(this)]],
      fechaInicio : [today],
      fechaFin : [today]
    }, {validators: this.validarFechas.bind(this) });
    
    this.formularioBusqueda.get("buscarPor")?.valueChanges.subscribe(value => {
      this.formularioBusqueda.patchValue({
        numero  : "",
        fechaInicio: today,
        fechaFin: today
      });

      this.cd.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    this.datosListaVenta.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosListaVenta.filter = filterValue.trim().toLocaleLowerCase();
  }

  buscarVentas(){
    if (!this.formularioBusqueda.valid) {
      const errores = this.formularioBusqueda.errors;
      if(errores?.['invalidFecha']) {
        this._utilidadServicio.mostrarAlerta("Debe ingresar ambas fechas", "Oops!");
      } else if (errores?.['fechaFutura']) {
        this._utilidadServicio.mostrarAlerta("Las fechas no pueden ser futuras", "Oops!");
      } else if (errores?.['invalidRango']) {
        this._utilidadServicio.mostrarAlerta("Fecha fina debe ser mayor o igual a la fecha de inicio", "Oops!")
      }
      return;
    }

    let _fechaInicio = moment(this.formularioBusqueda.value.fechaInicio).format('DD/MM/YYYY');
    let _fechaFin = moment(this.formularioBusqueda.value.fechaFin).format('DD/MM/YYYY');
      
    this._ventaServicio.historial(
      this.formularioBusqueda.value.buscarPor,
      this.formularioBusqueda.value.numero,
      _fechaInicio,
      _fechaFin
    ).subscribe({
      next: (data) =>{
        if(data.status)
          this.datosListaVenta = data.value;
        else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops!");
      },
      error:(e) => {
        console.log(e);
      }
    });
  }

  verDetalleVenta(_venta:Venta){
    this.dialog.open(ModalDetalleVentaComponent,{
      data: _venta,
      disableClose: true,
      width: '700px'
    });
  }

  validarFechas(group: AbstractControl): { [key: string]: boolean} | null {
    const buscarPor = group.get('buscarPor')?.value;
    const fechaInicioValue = group.get('fechaInicio')?.value;
    const fechaFinValue = group.get('fechaFin')?.value;

    if (!fechaInicioValue || !fechaFinValue) {
      if(buscarPor === 'fecha'){
        return { invalidFecha: true};
      }
      return null;
    }
    
    const fechaInicio = moment(fechaInicioValue, 'DD/MM/YYYY', true);
    const fechaFin = moment(fechaFinValue, 'DD/MM/YYYY', true);

    if (buscarPor === 'fecha') {
      const hoy = moment().endOf('day');
      
      if (fechaInicio.isSame(fechaFin)) {
        return null;
      }
  
      if (fechaInicio.isAfter(hoy) || fechaFin.isAfter(hoy)) {
        return { fechaFutura: true };
      }
      
      if (!fechaInicio.isValid() || !fechaFin.isValid()) {
        return { invalidFecha: true };
      }
  
      if (fechaInicio.isAfter(fechaFin)) {
        console.log("Error: invalidRango");
        return { invalidRango: true };
      }
    }
  
    return null;
  }

  validarFiltro(control: AbstractControl): { [key: string]: boolean } | null {
    const buscarPor = this.formularioBusqueda?.get('buscarPor')?.value;
    if (buscarPor === 'numero') {
      const numero = control.value;
      if (!numero || isNaN(numero) || parseInt(numero, 10) <= 0 || /^d+$/.test(numero) && parseInt(numero, 10) === 0) {
        return { invalidNumero: true};
      }
    }
    return null;
  }
}
