import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../supabase/supabase.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-form.component.html',
})
export class PetFormComponent implements OnInit {
  clients: any[] = [];
  pet = {
    cliente_id: null,
    nombre: '',
    especie: '',
    raza: '',
    color: '',
    sexo: '',
    fecha_nacimiento: '',
    esterilizado: false,
    especie_productiva: '',
    n_chip: '',
    n_pasaporte: '',
    n_seguro: '',
    observaciones: ''
  };

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() {
    const { data, error } = await this.supabase.client
      .from('clientes')
      .select('id, nombre, apellidos')
      .order('nombre');

    if (!error) {
      this.clients = data;
    }
  }

  async savePet() {
    const { error } = await this.supabase.client
      .from('mascotas')
      .insert([this.pet]);

    if (error) {
      console.error('Error al guardar mascota:', error.message);
      alert('❌ Error al guardar mascota.');
    } else {
      alert('✅ Mascota guardada correctamente');
      this.router.navigate(['/dashboard/pets']);
    }
  }
}
