import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-month-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar-month-view.component.html'
})
export class CalendarMonthViewComponent implements OnInit, OnChanges {
  today: Date = new Date();
  currentMonth: number = this.today.getMonth();
  currentYear: number = this.today.getFullYear();
  calendarDays: { day: number; inCurrentMonth: boolean; date: Date }[] = [];

  currentMonthName: string = '';
  @Output() daySelected = new EventEmitter<Date>();
  @Input() appointments: any[] = [];
  appointmentsByDay: { [dateString: string]: any[] } = {};

  ngOnInit(): void {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appointments']) {
      this.buildAppointmentMap();
    }
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startWeekday = (firstDay.getDay() + 6) % 7;

    const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    for (let i = startWeekday - 1; i >= 0; i--) {
      const date = new Date(this.currentYear, this.currentMonth - 1, daysInPrevMonth - i);
      this.calendarDays.push({ day: date.getDate(), inCurrentMonth: false, date });
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(this.currentYear, this.currentMonth, d);
      this.calendarDays.push({ day: d, inCurrentMonth: true, date });
    }

    const totalDays = this.calendarDays.length;
    const remainder = totalDays % 7;

    if (remainder !== 0) {
      const lastDate = this.calendarDays[totalDays - 1].date;
      for (let i = 1; i <= 7 - remainder; i++) {
        const nextDate = new Date(lastDate);
        nextDate.setDate(lastDate.getDate() + i);
        this.calendarDays.push({
          day: nextDate.getDate(),
          inCurrentMonth: false,
          date: nextDate
        });
      }
    }

    this.currentMonthName = firstDay.toLocaleString('es-Es', { month: 'long' }).toUpperCase();
    this.buildAppointmentMap();
  }


  goToPreviousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  goToNextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  goToToday(): void {
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.generateCalendar();
  }

  onDayClick(day: { date: Date; inCurrentMonth: boolean }): void {
    if (day.inCurrentMonth) {
      this.daySelected.emit(day.date);
    }
  }

  buildAppointmentMap(): void {
    this.appointmentsByDay = {};
    for (const cita of this.appointments) {
      const key = new Date(cita.fecha).toDateString();
      if (!this.appointmentsByDay[key]) {
        this.appointmentsByDay[key] = [];
      }
      this.appointmentsByDay[key].push(cita);
    }
  }

  countByEstado(citas: any[], estado: string): number {
    return citas.filter(cita => cita.estado === estado).length;
  }

  getDotColor(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'bg-blue-200';     // azul
      case 'confirmada':
        return 'bg-green-200';    // verde
      case 'realizada':
        return 'bg-gray-200';     // gris
      case 'anulada':
        return 'bg-red-200';      // rojo
      default:
        return 'bg-gray-200';
    }
  }
}
