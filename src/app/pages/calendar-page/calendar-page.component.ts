import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDayViewComponent } from '../../components/calendar-components/calendar-day-view/calendar-day-view.component';
import { CalendarMonthViewComponent } from '../../components/calendar-components/calendario-month-view/calendar-month-view.component';
import { SupabaseService } from '../../supabase/supabase.service';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    CalendarDayViewComponent,
    CalendarMonthViewComponent,
  ],
  templateUrl: './calendar-page.component.html'
})
export class CalendarPageComponent implements OnInit {
  view: 'day' | 'month' = 'day';
  viewDate: Date = new Date();
  citas: any[] = [];

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.refreshAppointments();
  }

  async refreshAppointments() {
    const data = await this.supabase.getAppointments(); // trae todas las citas
    this.citas = this.mapAppointments(data);
  }

  get citasFiltradas() {
    return this.citas.filter(c =>
      new Date(c.fecha).toDateString() === this.viewDate.toDateString()
    );
  }

  changeView(vista: 'day' | 'month'): void {
    this.view = vista;
  }

  onDaySelected(date: Date) {
    this.viewDate = date;
    this.view = 'day';
  }

  private mapAppointments(data: any[]): any[] {
    return data.map(c => ({
      id: c.id,
      fecha: c.fecha,
      hora: c.hora,
      motivo: c.motivo,
      estado: c.estado,
      notas_previsita: c.notas_previsita,
      trabajador: { nombre: c.usuarios?.nombre || '—' },
      mascota: {
        nombre: c.mascotas?.nombre || '—',
        especie: c.mascotas?.especie || '—'
      },
      cliente: {
        nombre: c.mascotas?.clientes?.nombre || '—',
        apellidos: c.mascotas?.clientes?.apellidos || ''
      }
    }))
    .sort((a, b) => a.hora.localeCompare(b.hora));
  }
}
