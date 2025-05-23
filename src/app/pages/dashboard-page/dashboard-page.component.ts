import { ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { NavCardsComponent } from "../../components/dashboard/nav-cards/nav-cards.component";
import { QuickAccessComponent } from "../../components/dashboard/quick-access/quick-access.component";
import { SummaryComponent } from "../../components/dashboard/summary/summary.component";
@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, FormsModule, NavCardsComponent, QuickAccessComponent, SummaryComponent],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  constructor(){}

  searchQuery = '';
  unreadNotifications = 5;
  unreadMessages = 2;
  currentDate = new Date();



  onSearch() {
    // Implementar lógica de búsqueda
    console.log('Buscando:', this.searchQuery);
  }

  openNotifications() {
    // Implementar apertura de notificaciones
    console.log('Abrir notificaciones');
  }

  openMessages() {
    // Implementar apertura de mensajes
    console.log('Abrir mensajes');
  }

  logout() {
    // Implementar cierre de sesión
    console.log('Cerrar sesión');
  }
 }
