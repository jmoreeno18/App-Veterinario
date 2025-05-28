import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../supabase/supabase.service';

interface Cita {
  id: number;
  fecha: string;
  hora: string;
  motivo: string;
  estado: string;
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
export class CalendarDayViewComponent implements OnChanges {
  constructor(private supabase: SupabaseService) {}

  @Input() fechaSeleccionada!: Date;
  @Input() citas: Cita[] = [];
  @Output() citaActualizada = new EventEmitter<void>();

  successMsg = '';
  fechaTraducida: string = '';

  notaVisible = false;
  notaSeleccionada: string = '';

  modalAbierto = false;
  selectedCita: Cita = {
    id: 0,
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'pendiente',
    notas_previsita: '',
    trabajador: { nombre: '' },
    mascota: { nombre: '', especie: '' },
    cliente: { nombre: '', apellidos: '' }
  };

  abrirModal(cita: Cita) {
    this.selectedCita = {
      id: cita.id,
      fecha: cita.fecha,
      hora: cita.hora,
      motivo: cita.motivo,
      estado: cita.estado,
      notas_previsita: cita.notas_previsita || '',
      trabajador: { nombre: cita.trabajador?.nombre || '' },
      mascota: { ...cita.mascota },
      cliente: { ...cita.cliente }
    };
    this.modalAbierto = true;
  }

  async guardarCita() {
    try {
      await this.supabase.updateAppointment(this.selectedCita.id, {
        hora: this.selectedCita.hora,
        motivo: this.selectedCita.motivo,
        estado: this.selectedCita.estado,
        notas_previsita: this.selectedCita.notas_previsita
      });

      const index = this.citas.findIndex(c => c.id === this.selectedCita.id);
      if (index !== -1) {
        this.citas[index] = { ...this.selectedCita };
      }

      this.successMsg = '✅ Cita actualizada correctamente.';
      this.modalAbierto = false;
      this.citaActualizada.emit(); 

    } catch (err) {
      alert('Error al guardar la cita');
    }
  }

  verNota(nota: string | undefined) {
    this.notaSeleccionada = nota || 'Sin notas registradas';
    this.notaVisible = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fechaSeleccionada'] && this.fechaSeleccionada) {
      this.fechaTraducida = this.fechaSeleccionada.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
}
