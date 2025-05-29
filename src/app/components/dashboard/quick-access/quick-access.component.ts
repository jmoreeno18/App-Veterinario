import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../supabase/supabase.service';

interface Appointment {
  id: string;
  estado: 'completado' | 'pendiente' | 'cancelado';
  fecha: string;
  hora: string;
  motivo: string;
  notas_previsita?: string;
  mascotas: {
    nombre: string;
    especie: string;
    clientes: {
      nombre: string;
      apellidos: string;
      email: string;
    };
  };
  usuarios: {
    nombre: string;
  };
}

@Component({
  selector: 'app-quick-access',
  imports: [FormsModule, CommonModule],
  templateUrl: './quick-access.component.html',
  styleUrl: './quick-access.component.css'
})
export class QuickAccessComponent implements OnInit{

  ngOnInit(): void {
    this.getLastFourCompletedAppointments();
  }

  lastFourCompleted : any;

  constructor(private supabase: SupabaseService) {}

  async getLastFourCompletedAppointments(): Promise<Appointment[]> {
    try {
      // Obtener todas las citas
      const allAppointments = await this.supabase.getAppointments();
      
      // Filtrar solo las completadas y obtener las últimas 4
      this.lastFourCompleted = allAppointments
        .filter(cita => cita.estado === 'realizada')
        .sort((a, b) => {
          // Ordenar por fecha más reciente primero
          const dateComparison = new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
          if (dateComparison === 0) {
            // Si las fechas son iguales, comparar por hora
            return b.hora.localeCompare(a.hora);
          }
          return dateComparison;
        })
        .slice(0, 4); // Tomar solo las primeras 4
        console.log(this.lastFourCompleted)
      return this.lastFourCompleted;
      
      
    } catch (error) {
      console.error('Error al obtener las últimas citas completadas:', error);
      return [];
    }
  }


}
