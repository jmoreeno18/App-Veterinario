import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../supabase/supabase.service';
import { ToastMessageComponent } from '../../../components/client-components/message/message.component';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastMessageComponent],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent {
  employee = {
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    puesto_trabajo: '',
  };

  toast = {
    show: false,
    message: '',
    type: 'error' as 'success' | 'error',
  };



  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

async saveEmployee() {
  const { nombre, apellidos, email, password, puesto_trabajo } = this.employee;

  try {
    await this.supabaseService.createUser(email, password, nombre, apellidos, puesto_trabajo);

    this.showToast('✅ Empleado registrado correctamente.', 'success');

    // Espera a que el toast se vea antes de navegar (opcional pero útil para debug)
    setTimeout(() => {
      this.router.navigate(['/dashboard/employees']);
    }, 1000);
  } catch (error: any) {
    console.error('❌ ERROR:', error); // Esto te ayuda a ver si realmente entra aquí
    this.showToast('❌ Error al guardar empleado.', 'error');
  }
}


private showToast(message: string, type: 'success' | 'error') {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;

    setTimeout(() => (this.toast.show = false), 3000); // Se oculta tras 3s
  }

}
