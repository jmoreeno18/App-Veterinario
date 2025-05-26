import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quick-access',
  imports: [FormsModule, CommonModule],
  templateUrl: './quick-access.component.html',
  styleUrl: './quick-access.component.css'
})
export class QuickAccessComponent {
  recentPatients = [
    { id: 1, name: 'Max', breed: 'Labrador', type: 'dog' },
    { id: 2, name: 'Luna', breed: 'Siamés', type: 'cat' },
    { id: 3, name: 'Rocky', breed: 'Bulldog', type: 'dog' },
    { id: 4, name: 'Bella', breed: 'Caniche', type: 'dog' }
  ];
}
