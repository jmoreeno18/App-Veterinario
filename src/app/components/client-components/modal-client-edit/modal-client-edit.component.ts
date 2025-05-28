import { SupabaseService } from './../../../supabase/supabase.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-client-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-client-edit.component.html',
})
export class ModalClientEditComponent {
  @Input() showModal: boolean = false;
  @Input() client: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  constructor(private SupabaseService: SupabaseService) {}

  async save() {
    const { id, ...updates } = this.client;
    const { error } = await this.SupabaseService.client
      .from('clientes')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error al actualizar cliente:', error);
    } else {
      this.updated.emit(); // Notifica al padre que se ha actualizado
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }
}
