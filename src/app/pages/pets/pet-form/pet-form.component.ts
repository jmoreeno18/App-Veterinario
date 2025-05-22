import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-form.component.html',
})
export class PetFormComponent {}
