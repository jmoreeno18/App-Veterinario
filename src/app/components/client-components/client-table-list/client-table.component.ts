import { IconEditComponent } from '../../icons/icon-edit.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDeleteComponent } from '../../icons/icon-delete.component';
import { IconViewComponent } from '../../icons/icon-view.component';
import { ModalClientViewComponent } from '../modal-client-view/modal-client-view.component';
import { ModalClientEditComponent } from "../modal-client-edit/modal-client-edit.component";

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    CommonModule,
    IconDeleteComponent,
    IconEditComponent,
    IconViewComponent,
    ModalClientViewComponent,
    ModalClientEditComponent
],
  templateUrl: './client-table.component.html',
})
export class ClientTableComponent {
  @Input() clients: any[] = [];
  @Output() updated = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>()
  @Output() deleteClient = new EventEmitter<any>();
  selectedClient: any = null;
  showModal: boolean = false;
  showEditModal = false;
  editableClient: any = {};
  showDeleteModal = false;

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
}
