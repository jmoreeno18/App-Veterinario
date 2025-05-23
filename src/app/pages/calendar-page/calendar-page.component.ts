import { CalendarDayViewComponent } from './../../components/calendar-components/calendar-day-view/calendar-day-view.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarMonthViewComponent } from '../../components/calendar-components/calendario-month-view/calendar-month-view.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    CalendarDayViewComponent,
    CalendarMonthViewComponent,
    RouterLink,
  ],
  templateUrl: './calendar-page.component.html'
})
export class CalendarPageComponent {
  view: 'day' | 'week' | 'month' = 'day';
  viewDate: Date = new Date();


  citasDelDia = [
    {
      fecha: '2025-05-22',
      hora: '11:00',
      motivo: 'Consulta general',
      estado: 'pendiente',
      notas_previsita: 'Revisión general.',
      trabajador: {
        nombre: 'Dr. Joaquín Vet'
      },
      mascota: {
        nombre: 'Toby',
        especie: 'perro'
      },
      cliente: {
        nombre: 'Lucía',
        apellidos: 'Martínez'
      },
    },
    {
      fecha: '2025-05-22',
      hora: '12:00',
      motivo: 'Consulta general',
      estado: 'pendiente',
      notas_previsita: 'El paciente ha presentado vómitos las últimas 24h.',
      trabajador: {
        nombre: 'Dra. Maria Vet'
      },
      mascota: {
        nombre: 'Rob',
        especie: 'exotico'
      },
      cliente: {
        nombre: 'Lucía',
        apellidos: 'Martínez'
      },
    },
    {
      fecha: '2025-05-22',
      hora: '13:00',
      motivo: 'Consulta general',
      estado: 'pendiente',
      notas_previsita: 'Picores repetidos en todo el cuerpo.',
      trabajador: {
        nombre: 'Dr. Joaquín Vet'
      },
      mascota: {
        nombre: 'Garfield',
        especie: 'gato'
      },
      cliente: {
        nombre: 'Ana',
        apellidos: 'Fuentes'
      },
    },
    {
      fecha: '2025-05-22',
      hora: '14:00',
      motivo: 'Consulta general',
      estado: 'pendiente',
      notas_previsita: 'No come nada desde hace 72h.',
      trabajador: {
        nombre: 'Dr. Joaquín Vet'
      },
      mascota: {
        nombre: 'Vaca',
        especie: 'ganado'
      },
      cliente: {
        nombre: 'Francisco',
        apellidos: 'Valero'
      },
    },
  ];

  cambiarVista(vista: 'day' | 'week' | 'month'): void {
    this.view = vista;
  }

  onDaySelected(date: Date) {
    this.viewDate = date;
    this.view = 'day';
  }

  get citasFiltradas() {
  return this.citasDelDia.filter(cita =>
    new Date(cita.fecha).toDateString() === this.viewDate.toDateString()
  );
}

}
