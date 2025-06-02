import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../supabase/supabase.service';
import { FormsModule } from '@angular/forms';
import { ToastMessageComponent } from '../../../components/client-components/message/message.component';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastMessageComponent],
  templateUrl: './pet-form.component.html',
})
export class PetFormComponent implements OnInit {
  clients: any[] = [];
  pet = this.initPet();

  toast = {
    show: false,
    message: '',
    type: 'error' as 'success' | 'error',
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
      this.showToast('❌ Error al guardar mascota.', 'error');
    } else {
      this.showToast('✅ Mascota registrada correctamente.', 'success');
      this.pet = this.initPet();
    }
  }

  private showToast(message: string, type: 'success' | 'error') {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;

    setTimeout(() => (this.toast.show = false), 3000); // Se oculta tras 3s
  }

  private initPet() {
    return {
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
      observaciones: '',
    };
  }
}


