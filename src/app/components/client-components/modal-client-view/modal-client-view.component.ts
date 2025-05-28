import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-client-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-client-view.component.html',
  styleUrl: './modal-client-view.component.css',
})
export class ModalClientViewComponent {
  @Input() showModal: boolean = false;
  @Input() selectedClient: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
