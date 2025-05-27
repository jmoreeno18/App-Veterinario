import { IconEditComponent } from '../../icons/icon-edit.component';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDeleteComponent } from '../../icons/icon-delete.component';
import { IconViewComponent } from '../../icons/icon-view.component';
import { ModalClientViewComponent } from '../modal-client-view/modal-client-view.component';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    CommonModule,
    IconDeleteComponent,
    IconEditComponent,
    IconViewComponent,
    ModalClientViewComponent,
  ],
  templateUrl: './client-table.component.html',
})
export class ClientTableComponent {
  @Input() clients: any[] = [];
  selectedClient: any = null;
  showModal: boolean = false;

  openModal(client: any) {
    this.selectedClient = client;
    this.showModal = true;
  }

  closeModal() {
    this.selectedClient = null;
    this.showModal = false;
  }
}
