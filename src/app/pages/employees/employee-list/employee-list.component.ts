import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../supabase/supabase.service';
import { CommonModule } from '@angular/common';
import { IconViewComponent } from "../../../components/icons/icon-view.component";
import { IconEditComponent } from "../../../components/icons/icon-edit.component";
import { IconDeleteComponent } from "../../../components/icons/icon-delete.component";
import { IconUserComponent } from "../../../components/icons/icon-user.component";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink ,IconEditComponent, IconDeleteComponent, IconUserComponent]
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  selectedEmployee: any = null;
  showDeleteModal: boolean = false;

  selectedEmployeeEdit: any = null;
  showEditModal: boolean = false;

  loading = true;

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadEmployees();
    this.loading = false;
  }

  async loadEmployees() {
    const { data, error } = await this.supabase.client
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener trabajadores:', error);
    } else {
      this.employees = data;
    }
  }

  openDeleteModal(emp: any) {
    this.selectedEmployee = emp;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.selectedEmployee = null;
    this.showDeleteModal = false;
  }

  async confirmDeleteEmployee() {
  try {
    await this.supabase.deleteUser(this.selectedEmployee.id);
    this.closeDeleteModal();
    this.loadEmployees(); // Actualiza la lista
  } catch (error) {
    console.error('❌ Error al eliminar empleado:', error);
    alert('❌ Error al eliminar empleado');
  }
}


  openEditModal(emp: any) {
    this.selectedEmployeeEdit = { ...emp }; // Copia para evitar modificar en vivo
    this.showEditModal = true;
  }

closeEditModal() {
  this.showEditModal = false;
  this.selectedEmployeeEdit = null;
}

async confirmEditEmployee() {
  const emp = this.selectedEmployeeEdit;

  try {
    await this.supabase.updateUser(
      emp.id,
      emp.email,
      emp.nombre,
      emp.apellidos,
      emp.rol,
      emp.puesto_trabajo,
      emp.activo
    );

    this.closeEditModal();
    this.loadEmployees();
  } catch (error) {
    console.error('❌ Error al editar empleado:', error);
    alert('❌ Error al editar empleado');
  }
}

}
