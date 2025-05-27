import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent {}
