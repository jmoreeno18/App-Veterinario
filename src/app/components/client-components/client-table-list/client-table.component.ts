import { IconEditComponent } from '../../icons/icon-edit.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDeleteComponent } from '../../icons/icon-delete.component';
import { IconViewComponent } from '../../icons/icon-view.component';
import { ModalClientViewComponent } from '../modal-client-view/modal-client-view.component';
import { ModalClientEditComponent } from "../modal-client-edit/modal-client-edit.component";
import { SupabaseService } from '../../../supabase/supabase.service';
import { FormsModule } from '@angular/forms';
import { FiltroClientesPipe } from '../../../pages/clients/client-list/filtro-clientes.pipe';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconDeleteComponent,
    IconEditComponent,
    IconViewComponent,
    ModalClientViewComponent,
    ModalClientEditComponent,
    FiltroClientesPipe
  ],
  templateUrl: './client-table.component.html',
})
export class ClientTableComponent {
  @Input() clients: any[] = [];
  @Input() filtro: string = '';
  @Output() updated = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() deleteClient = new EventEmitter<any>();
  selectedClient: any = null;
  showModal: boolean = false;
  showEditModal = false;
  editableClient: any = {};
  showDeleteModal = false;
  selectedPet: any = null;

  constructor(private supabaseService: SupabaseService) {}

  openModal(client: any) {
    this.selectedClient = client;
    this.showModal = true;
  }

  closeModal() {
    this.selectedClient = null;
    this.showModal = false;
  }

  openEditModal(client: any) {
    this.editableClient = { ...client };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editableClient = {};
  }
  onClientUpdated() {
    this.updated.emit(); // Esto avisa al ClientListComponent
    this.closeEditModal();
  }

  onDelete(client: any) {
    this.delete.emit(client)
  }

  openPetModal(pet: any) {
    this.selectedPet = pet;
}

closePetModal() {
  this.selectedPet = null;
}

showDeletePetModal: boolean = false;
petToDelete: any = null;

triggerDeletePet(pet: any) {
  this.petToDelete = pet;
  this.showDeletePetModal = true;
}

cancelDeletePet() {
  this.petToDelete = null;
  this.showDeletePetModal = false;
}

confirmDeletePetFinal() {
  if (!this.petToDelete) return;

  this.supabaseService.client
    .from('mascotas')
    .delete()
    .eq('id', this.petToDelete.id)
    .then(({ error }) => {
      if (error) {
        alert('❌ Error al eliminar mascota');
      } else {
        alert('✅ Mascota eliminada');
        this.closePetModal();
        this.updated.emit(); // recargar en el padre
      }

      this.cancelDeletePet();
    });
}

showEditPetModal = false;

async savePetEdit() {
  const pet = { ...this.selectedPet };
  const { id, ...updates } = pet;

  const { error } = await this.supabaseService.client
    .from('mascotas')
    .update(updates)
    .eq('id', id);

  if (error) {
    alert('❌ Error al guardar los cambios');
  } else {
    this.showEditPetModal = false;
    this.updated.emit(); // refresca lista
  }
}



}
