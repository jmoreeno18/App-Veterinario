import { SupabaseService } from './../../../supabase/supabase.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastMessageComponent } from '../message/message.component';

@Component({
  selector: 'app-modal-client-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastMessageComponent],
  templateUrl: './modal-client-edit.component.html',
})
export class ModalClientEditComponent {
  @Input() showModal: boolean = false;
  @Input() client: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  constructor(private SupabaseService: SupabaseService) {}

  async save() {
    const { id, ...rest } = this.client;
  // Solo incluir las columnas válidas que existen en Supabase
    const updates = {
      nombre: rest.nombre,
      apellidos: rest.apellidos,
      DNI: rest.DNI,
      telefono: rest.telefono,
      email: rest.email,
      direccion: rest.direccion,
      ciudad: rest.ciudad,
      provincia: rest.provincia,
    };
    const { error } = await this.SupabaseService.client
      .from('clientes')
      .update(updates)
      .eq('id', id);

    if (error) {
      this.showToast('❌ Error al editar cliente.', 'error');
    } else {
      this.showToast('✅ Cliente editado correctamente.', 'success');
      this.updated.emit(); // Notifica al padre que se ha actualizado
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
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
