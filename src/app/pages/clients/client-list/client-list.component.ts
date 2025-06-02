import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from './../../../supabase/supabase.service';
import { ClientTableComponent } from '../../../components/client-components/client-table-list/client-table.component';
import { IconPlusComponent } from '../../../components/icons/icon-plus.component';
import { IconUserComponent } from '../../../components/icons/icon-user.component';
import { FormsModule } from '@angular/forms';
import { FiltroClientesPipe } from './filtro-clientes.pipe';
import { ToastMessageComponent } from '../../../components/client-components/message/message.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ClientTableComponent,
    IconPlusComponent,
    IconUserComponent,
    FormsModule,
    ToastMessageComponent
  ],
  templateUrl: './client-list.component.html',
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];

  selectedClient: any = null;
  showDeleteModal: boolean = false;

  loading= true;

  filtro: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadClients();
    this.loading = false;
  }

  async loadClients() {
    const { data, error } = await this.supabaseService.client
      .from('clientes')
      .select('*, mascotas(*)')
      .order('fecha_alta', { ascending: false });

    if (!error && data) {
      this.clients = data;
      this.cdr.markForCheck();
    }
  }

  openDeleteModal(client: any) {
    this.selectedClient = client;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.selectedClient = null;
    this.showDeleteModal = false;
  }

  async confirmDeleteClient() {
    const { error } = await this.supabaseService.client
      .from('clientes')
      .delete()
      .eq('id', this.selectedClient.id);

    if (error) {
      this.showToast('❌ Error al eliminar cliente.', 'error');
    } else {
      this.loadClients(); // Refresca la lista
      this.showToast('✅ Cliente eliminado correctamente.', 'success');
    }

    this.closeDeleteModal();
  }

  toast = {
    show: false,
    message: '',
    type: 'error' as 'success' | 'error',
  };

  private showToast(message: string, type: 'success' | 'error') {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;

    setTimeout(() => (this.toast.show = false), 3000); // Se oculta tras 3s
  }
}

