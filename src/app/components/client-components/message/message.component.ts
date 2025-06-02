import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  imports: [CommonModule]
})
export class ToastMessageComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success'; // Cambia colores
  @Input() show: boolean = false;
}
