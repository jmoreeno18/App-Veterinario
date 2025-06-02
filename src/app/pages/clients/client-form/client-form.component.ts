import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from './../../../supabase/supabase.service';
import { ToastMessageComponent } from '../../../components/client-components/message/message.component';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ToastMessageComponent],
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
      this.showToast('❌ No se pudo registrar el cliente', 'error')
    } else {
      this.showToast('✅ Se registró el cliente correctamente', 'success')
      setTimeout(() => {
        this.router.navigate(['/dashboard/clients']);
      }, 2000)
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

  toast = {
    show: false,
    message: '',
    type: 'error' as 'success' | 'error',
  };

  private showToast(message: string, type: 'success' | 'error') {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;

    setTimeout(() => (this.toast.show = false), 3000); // Se oculta tras 3s
  }
}
