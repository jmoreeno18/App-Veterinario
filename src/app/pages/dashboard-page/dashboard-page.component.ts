import { ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { NavCardsComponent } from "../../components/dashboard/nav-cards/nav-cards.component";
import { QuickAccessComponent } from "../../components/dashboard/quick-access/quick-access.component";
import { SummaryComponent } from "../../components/dashboard/summary/summary.component";
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, FormsModule, NavCardsComponent, QuickAccessComponent, SummaryComponent, RouterOutlet,RouterLink
],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardPageComponent {
  constructor( private cdr: ChangeDetectorRef){}

  sidebarOpen = false;
  searchQuery = '';
  unreadNotifications = 5;
  unreadMessages = 2;
  currentDate = new Date();

  



  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

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
