import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from './../../../supabase/supabase.service';
import { IconDeleteComponent } from '../../../components/icons/icon-delete.component';
import { IconEditComponent } from '../../../components/icons/icon-edit.component';
import { IconViewComponent } from '../../../components/icons/icon-view.component';
import { IconPlusComponent } from "../../../components/icons/icon-plus.component";

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, RouterLink, IconDeleteComponent, IconEditComponent, IconViewComponent, IconPlusComponent],
  templateUrl: './pet-list.component.html',
})
export class PetListComponent implements OnInit {
  pets: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  async loadPets() {
    const { data, error } = await this.supabaseService.client
      .from('mascotas')
      .select(`*,
        clientes (
          nombre,
          apellidos
        )
      `)
      .order('fecha_nacimiento', { ascending: false });

    if (error) {
      console.error('Error al obtener mascotas:', error);
    } else {
      // Mapear para tener acceso directo al nombre del cliente
      this.pets = data.map((pet: any) => ({
        ...pet,
        cliente_nombre: `${pet.clientes?.nombre || ''} ${pet.clientes?.apellidos || ''}`,
      }));
    }
  }
}
