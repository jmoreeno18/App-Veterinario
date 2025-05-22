import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cita {
  fecha: string;
  hora: string;
  motivo: string;
  estado: string;
  notas?: string;
  notas_previsita?: string;
  trabajador?: { nombre: string };
  mascota: { nombre: string; especie: string };
  cliente: { nombre: string; apellidos: string };
}


@Component({
  selector: 'app-calendar-day-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar-day-view.component.html'
})
export class CalendarDayViewComponent {
  @Input() fechaSeleccionada!: Date;
  @Input() citas: Cita[] = [];

  notaVisible = false;
  notaSeleccionada: string = '';

  modalAbierto = false;
  selectedCita: Cita = {
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'pendiente',
    notas_previsita: '',
    mascota: { nombre: '', especie: '' },
    cliente: { nombre: '', apellidos: '' }
  };

  abrirModal(cita: Cita) {
    this.selectedCita = { ...cita };
    this.modalAbierto = true;
  }

  guardarCita() {
    const index = this.citas.findIndex(c => c.fecha === this.selectedCita.fecha && c.hora === this.selectedCita.hora);
    if (index !== -1) {
      this.citas[index] = { ...this.selectedCita };
    }
    this.modalAbierto = false;
  }

  verNota(nota: string | undefined) {
    this.notaSeleccionada = nota || 'Sin notas registradas';
    this.notaVisible = true;
  }
}
