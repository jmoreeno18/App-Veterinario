import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../supabase/supabase.service';

// Define interface for better type safety
interface Appointment {
  id: string;
  estado: 'confirmada' | 'pendiente' | 'cancelado';
  fecha: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
  error: string | undefined;
  citas: Appointment[] = [];

  appointmentsToday = 0;
  completedAppointments: Appointment[] = [];
  pendingAppointments = 0;
  comfirmlen = 0;

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.getAppointment();
  }

  getAppointment(): void {
    this.supabase.getSummaryAppointments().subscribe({
      next: (data) => {
        this.citas = data.data ?? [];
        
        // Total de citas
        this.appointmentsToday = this.citas.length;

        // Filtrar y contar citas completadas
        this.completedAppointments = this.citas.filter(
          cita => cita.estado === 'confirmada'
        );
        this.comfirmlen = this.completedAppointments.length;
        
        // Contar citas pendientes
        this.pendingAppointments = this.citas.filter(
          cita => cita.estado === 'pendiente'
        ).length;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.error = "Error al cargar citas";
      }
    });
  }

}