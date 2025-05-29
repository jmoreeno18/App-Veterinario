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
    puesto_trabajo: '',
    activo: true,
  };

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async saveEmployee() {
    const payload = {
      ...this.employee,
      created_at: new Date().toISOString(),
    };

    const { error } = await this.supabaseService.client
      .from('usuarios')
      .insert([payload]);

    if (error) {
      console.error('Error al guardar trabajador:', error.message);
      alert('❌ Error al guardar trabajador. Revisa los datos.');
    } else {
      alert('✅ Trabajador guardado correctamente');
      this.router.navigate(['/dashboard/employees']);
    }
  }
}
