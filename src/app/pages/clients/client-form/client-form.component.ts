import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from './../../../supabase/supabase.service';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent implements OnInit {
  client = {
    nombre: '',
    apellidos: '',
    DNI: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    email: ''
  };

  lastClients: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadLastClients();
  }

  async saveClient() {
    const payload = {
      ...this.client,
      telefono: this.client.telefono ? Number(this.client.telefono) : null,
      fecha_alta: new Date().toISOString(),
    };

    const { error } = await this.supabaseService.client
      .from('clientes')
      .insert([payload]);

    if (error) {
      console.error('Error al guardar cliente:', error.message);
      alert('❌ Error al guardar cliente. Revisa los datos.');
    } else {
      alert('✅ Cliente guardado correctamente');
      this.router.navigate(['/dashboard/clients']);
    }
  }

  async loadLastClients() {
    const { data, error } = await this.supabaseService.client
      .from('clientes')
      .select('nombre, apellidos, fecha_alta')
      .order('fecha_alta', { ascending: false })
      .limit(3);

    if (!error && data) {
      this.lastClients = data;
    } else {
      console.error('Error al cargar últimos clientes:', error);
    }
  }
}
