import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../supabase/supabase.service';
import { CommonModule } from '@angular/common';

interface Appointment {
  id: number;
  type: string;
  petName: string;
  veterinarian: string;
  date: Date;
  time: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  initials: string;
}

@Component({
  selector: 'app-profile-client',
  imports: [CommonModule],
  templateUrl: './profile-client.component.html',
  styleUrl: './profile-client.component.css'
})
export class ProfileClientComponent implements OnInit {
  id!: number;
  user: any;
  Pets: any[] = [];

  // Contadores para el resumen
  totalAppointments: number = 0;
  nextAppointment: string = 'Sin citas programadas';
  totalPets: number = 0;

  // Notificaciones y mensajes (simulados)
  unreadNotifications: number = 3;
  unreadMessages: number = 2;
   allAppointments: any[] = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : null;

      if (id !== null && !isNaN(id)) {
        this.id = id;
        this.getOneUser(id);
      } else {
        console.error('ID inválido');
        // this.router.navigate(['/not-found']);
      }
    });
  }

  getOneUser(id: number) {
    return this.supabase.getOneUser(id).subscribe({
      next: (response) => {
        this.user = response.data;
        this.totalPets = this.user?.mascotas ? this.user.mascotas.length : 0;
        this.Pets = this.user?.mascotas || [];
        
        // Calcular total de citas
        this.calculateTotalAppointments();
        
        // Calcular próxima cita
        this.calculateNextAppointment();
        
      },
      error: (err) => {
        console.error('Error al cargar usuario:', err);
      }
    });
  }

  // Método para generar iniciales del usuario
  getUserInitials(): string {
    if (!this.user) return '';
    
    const nombre = this.user.nombre || '';
    const apellidos = this.user.apellidos || '';
    
    const firstInitial = nombre.charAt(0).toUpperCase();
    const lastInitial = apellidos.charAt(0).toUpperCase();
    
    return `${firstInitial}${lastInitial}`;
  }

  // Calcular total de citas de todas las mascotas
  calculateTotalAppointments(): void {
    if (!this.Pets || this.Pets.length === 0) {
      this.totalAppointments = 0;
      return;
    }

    this.totalAppointments = this.Pets.reduce((total, pet) => {
      return total + (pet.citas ? pet.citas.length : 0);
    }, 0);
  }

  // Calcular próxima cita
  calculateNextAppointment(): void {
    if (!this.Pets || this.Pets.length === 0) {
      this.nextAppointment = 'Sin citas programadas';
      return;
    }
    
    // Recopilar todas las citas de todas las mascotas
    this.Pets.forEach(pet => {
      if (pet.citas && pet.citas.length > 0) {
        pet.citas.forEach((cita: any) => {
          this.allAppointments.push({
            ...cita,
            petName: pet.nombre,
            petId: pet.id,
            fullDateTime: `${cita.fecha} ${cita.hora}` // Combinar fecha y hora
          });
        });
      }
    });

    if (this.allAppointments.length === 0) {
      this.nextAppointment = 'Sin citas programadas';
      return;
    }

    // Encontrar la próxima cita
    const now = new Date();
    const futureCitas = this.allAppointments.filter(cita => {
      const citaDateTime = new Date(`${cita.fecha}T${cita.hora}`);
      return citaDateTime > now;
    });

    if (futureCitas.length > 0) {
      // Ordenar por fecha y hora más cercana
      futureCitas.sort((a, b) => {
        const dateTimeA = new Date(`${a.fecha}T${a.hora}`);
        const dateTimeB = new Date(`${b.fecha}T${b.hora}`);
        return dateTimeA.getTime() - dateTimeB.getTime();
      });

      const nextCita = futureCitas[0];
      const citaDateTime = new Date(`${nextCita.fecha}T${nextCita.hora}`);
      this.nextAppointment = this.formatDate(citaDateTime);
    } else {
      this.nextAppointment = 'Sin citas programadas';
    }
  }

  // Formatear fecha para mostrar
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  }

  // Obtener la última visita de una mascota
  getLastVisit(pet: any): string {
    if (!pet.citas || pet.citas.length === 0) {
      return 'Sin visitas registradas';
    }

    // Ordenar citas por fecha y hora (más reciente primero)
    const sortedCitas = pet.citas.sort((a: any, b: any) => {
      const dateTimeA = new Date(`${a.fecha}T${a.hora}`);
      const dateTimeB = new Date(`${b.fecha}T${b.hora}`);
      return dateTimeB.getTime() - dateTimeA.getTime();
    });

    return sortedCitas[0].motivo || 'Consulta general';
  }

  // Métodos para navegación y acciones
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

 

  addPet(): void {
    console.log('Agregar mascota');
    // this.router.navigate(['/pets/add'], { queryParams: { userId: this.id } });
  }



  scheduleAppointment(): void {
    console.log('Agendar nueva cita');
    this.router.navigate(['/appointments/new'], { queryParams: { userId: this.id } });
  }

  // Método para obtener clases de estado (si decides implementar el historial de citas)
  getStatusClass(status: string): string {
    switch (status) {
      case 'realizada':
        return 'bg-green-100 text-green-800';
      case 'confirmada':
        return 'bg-blue-100 text-blue-800';
      case 'anulada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Método para obtener texto de estado
  getStatusText(status: string): string {
    switch (status) {
      case 'realizada':
        return 'Realizada';
      case 'confirmada':
        return 'Confirmada';
      case 'anulada':
        return 'Anulada';
      default:
        return 'Desconocido';
    }
  }
}