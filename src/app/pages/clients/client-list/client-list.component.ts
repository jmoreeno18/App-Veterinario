import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from './../../../supabase/supabase.service';
import { ClientTableComponent } from '../../../components/client-components/client-table-list/client-table.component';
import { IconPlusComponent } from '../../../components/icons/icon-plus.component';
import { IconUserComponent } from '../../../components/icons/icon-user.component';
import { ModalClientViewComponent } from './../../../components/client-components/modal-client-view/modal-client-view.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ClientTableComponent,
    IconPlusComponent,
    IconUserComponent,
  ],
  templateUrl: './client-list.component.html',
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.loadClients();
  }

  async loadClients() {
    const { data, error } = await this.supabaseService.client
      .from('clientes')
      .select('*')
      .order('fecha_alta', { ascending: false });

    if (!error && data) {
      this.clients = data;
      this.cdr.markForCheck();
    }
  }
}
