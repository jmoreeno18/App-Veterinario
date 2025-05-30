import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../supabase/supabase.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async saveEmployee() {
    const { nombre, apellidos, email, password, puesto_trabajo } = this.employee;

  try {
      await this.supabaseService.createUser(email, password, nombre, apellidos, puesto_trabajo);
      this.router.navigate(['/dashboard/employees']);
    } catch (error: any) {
        console.error('❌ Error al crear trabajador:', error.message || error);
  }
}

}
