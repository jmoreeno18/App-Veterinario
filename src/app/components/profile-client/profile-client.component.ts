import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  lastVisit: Date;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
}

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
  imports: [],
  templateUrl: './profile-client.component.html',
  styleUrl: './profile-client.component.css'
})
export class ProfileClientComponent implements OnInit{
id: string | null = null;

  // Contadores para el resumen
  totalPets: number = 0;
  totalAppointments: number = 0;
  nextAppointment: string = '';

  // Notificaciones y mensajes (simulados)
  unreadNotifications: number = 3;
  unreadMessages: number = 2;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.id = params.get('id')
    })
  }



  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  editProfile(): void {
    console.log('Editar perfil');
    // Implementar navegación a editar perfil
  }

  addPet(): void {
    console.log('Agregar mascota');
    // Implementar modal o navegación para agregar mascota
  }

  viewPetDetails(pet: Pet): void {
    console.log('Ver detalles de mascota:', pet.name);
    this.router.navigate(['/pets', pet.id]);
  }

  scheduleAppointment(): void {
    console.log('Agendar nueva cita');
    this.router.navigate(['/appointments/new']);
  }

  viewAppointmentDetails(appointment: Appointment): void {
    console.log('Ver detalles de cita:', appointment.type);
    this.router.navigate(['/appointments', appointment.id]);
  }

  viewAllAppointments(): void {
    console.log('Ver todas las citas');
    this.router.navigate(['/appointments']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'scheduled':
        return 'Programada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  }

  // Acciones rápidas
  quickSchedule(): void {
    this.scheduleAppointment();
  }

  quickHistories(): void {
    this.router.navigate(['/medical-records']);
  }

  quickReminders(): void {
    this.router.navigate(['/reminders']);
  }

  quickContact(): void {
    this.router.navigate(['/contact']);
  }

  openNotifications(): void {
    console.log('Abrir notificaciones');
    // Implementar panel de notificaciones
  }

  openMessages(): void {
    console.log('Abrir mensajes');
    // Implementar panel de mensajes
  }

}
