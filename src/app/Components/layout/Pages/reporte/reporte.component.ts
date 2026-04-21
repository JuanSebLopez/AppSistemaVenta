import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workbook } from 'exceljs';
import moment from 'moment';

import { Reporte } from '../../../../Interfaces/reporte';
import { VentaService } from '../../../../Services/venta.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import { MAT_DATE_FORMATS } from '@angular/material/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { buffer } from 'rxjs';

export const MY_DATA_FORMATS={
  parse:{
    dateInput: 'DD/MM/YYYY'
  },
  display:{
    dateInput : 'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY'
  }
}

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MomentDateModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    {provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS}
  ],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {
  formularioFiltro: FormGroup;
  listaVentasReporte: Reporte[] = [];
  columnasTabla: string[] = ['fechaRegistro','numeroVenta','tipoPago','total','producto','cantidad','precio','totalProducto'];
  dataVentaReporte= new MatTableDataSource(this.listaVentasReporte);
  maxDate: Date;
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;

  constructor(
    private fb:FormBuilder,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {
    this.maxDate = new Date();
    this.formularioFiltro = this.fb.group({
      fechaInicio : ['',Validators.required],
      fechaFin : ['',Validators.required]
    }, {validators: this.validarFechas.bind(this) });
  }

  ngAfterViewInit(): void {
    this.dataVentaReporte.paginator = this.paginacionTabla;
  }
  
  buscarVentas() {
    if(!this.formularioFiltro.valid) {
      const errores = this.formularioFiltro.errors;
      if(errores?.['invalidFecha']) {
        this._utilidadServicio.mostrarAlerta("Debe ingresar ambas fechas", "Oops!");
      } else if (errores?.['fechaFutura']) {
        this._utilidadServicio.mostrarAlerta("Las fechas no pueden ser futuras", "Oops!");
      } else if (errores?.['invalidRango']) {
        this._utilidadServicio.mostrarAlerta("La fecha de inicio debe ser menor o igual a la fecha fin", "Oops!");
      }
      return;
    }

    const _fechaInicio = moment(this.formularioFiltro.value.fechaInicio).format('DD/MM/YYYY');
    const _fechaFin = moment(this.formularioFiltro.value.fechaFin).format('DD/MM/YYYY');

    this._ventaServicio.reporte(
      _fechaInicio,
      _fechaFin
    ).subscribe({
      next: (data) => {
        if (data.status) {
          this.listaVentasReporte = data.value;
          this.dataVentaReporte.data = data.value;
        } else {
          this.listaVentasReporte = [];
          this.dataVentaReporte.data = [];
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops!");
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  validarFechas(group: AbstractControl): { [key: string]: boolean } | null {
    const fechaInicioValue = group.get('fechaInicio')?.value;
    const fechaFinValue = group.get('fechaFin')?.value;

    if (!fechaInicioValue || !fechaFinValue) {
      return { invalidFecha: true };
    }

    const fechaInicio = moment(fechaInicioValue, 'DD/MM/YYYY', true);
    const fechaFin = moment(fechaFinValue, 'DD/MM/YYYY', true);

    const hoy = moment().endOf('day');
    if (fechaInicio.isAfter(hoy) || fechaFin.isAfter(hoy)) {
      return { fechaFutura: true };
    }

    if (!fechaInicio.isValid() || !fechaFin.isValid()) {
      return { invalidFecha: true };
    }

    if (fechaInicio.isAfter(fechaFin)) {
      return { invalidRango: true };
    }

    return null;
  }

  exportarExcel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Reporte Ventas');

    // Encabezados
    worksheet.addRow([
      'Numero de Venta',
      'Tipo de Pago',
      'Fecha Registro',
      'Total por Producto',
      'Producto',
      'Precio',
      'Cantidad',
      'Total',
    ]);

    this.listaVentasReporte.forEach(venta => {
      worksheet.addRow([
        venta.numeroDocumento,
        venta.tipoPago,
        venta.fechaRegistro,
        venta.totalVenta,
        venta.producto,
        venta.precio,
        venta.cantidad,
        venta.total,
      ]);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Reporte_Ventas.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
