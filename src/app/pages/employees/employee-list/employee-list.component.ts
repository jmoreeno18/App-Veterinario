import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../supabase/supabase.service';
import { CommonModule } from '@angular/common';
import { IconViewComponent } from "../../../components/icons/icon-view.component";
import { IconEditComponent } from "../../../components/icons/icon-edit.component";
import { IconDeleteComponent } from "../../../components/icons/icon-delete.component";
import { IconUserComponent } from "../../../components/icons/icon-user.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  standalone: true,
  imports: [CommonModule, IconEditComponent, IconDeleteComponent, IconUserComponent]
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    const { data, error } = await this.supabase.client
      .from('usuarios')
      .select('*')
      .order('created_at', {ascending: false})

    if (error) {
      console.error('Error al obtener trabajadores:', error);
    } else {
      this.employees = data;
      console.log('Empleados: ', data)
    }
  }
}
