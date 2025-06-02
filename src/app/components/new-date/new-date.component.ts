import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { SupabaseService } from "../../supabase/supabase.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IconPlusComponent } from "../icons/icon-plus.component";
import { ToastMessageComponent } from "../client-components/message/message.component";

@Component({
  selector: 'app-new-date',
  standalone: true,
  imports: [CommonModule, FormsModule, IconPlusComponent, ToastMessageComponent],
  templateUrl: './new-date.component.html',
})
export class NewDateComponent implements OnInit {
  @Output() citaCreada = new EventEmitter<void>(); // Para notificar al padre
  showModal = false;

  clientes: any[] = [];
  mascotas: any[] = [];
  trabajadores: any[] = [];

  selectedClienteId: number | null = null;

  newDate = {
    mascota_id: null,
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'pendiente',
    trabajador_id: null,
    notas_previsita: '',
  };

  constructor(
    private supabase: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const { data: clientes, error: errorClientes } = await this.supabase.client
      .from('clientes')
      .select('id, nombre, apellidos');

    const { data: trabajadores, error: errorTrabajadores } = await this.supabase.client
      .from('usuarios')
      .select('id, nombre, apellidos')
      .not('puesto_trabajo', 'is', null); // Cualquier puesto de trabajo

    if (errorClientes) console.error('Error cargando clientes:', errorClientes.message);
    if (errorTrabajadores) console.error('Error cargando trabajadores:', errorTrabajadores.message);

    this.clientes = clientes || [];
    this.trabajadores = trabajadores || [];
    this.cdr.markForCheck()
  }

  async loadMascotasDelCliente(clienteId: number) {
    this.selectedClienteId = clienteId;

    const { data, error } = await this.supabase.client
      .from('mascotas')
      .select('id, nombre, especie')
      .eq('cliente_id', clienteId);

    if (error) {
      console.error('Error cargando mascotas:', error.message);
    }

    this.mascotas = data || [];
    this.newDate.mascota_id = null;
  }

  async saveDate() {
    const { mascota_id, fecha, hora, motivo, trabajador_id } = this.newDate;

    if (!this.selectedClienteId || !mascota_id || !fecha || !hora || !motivo || !trabajador_id) {
      this.showToast('❌ Error al agregar cita.', 'error');
    }

    // Asegúrate de no incluir cliente_id si no está en la tabla "citas"
    const cita = {
      ...this.newDate
    };

    const { error } = await this.supabase.client
      .from('citas')
      .insert([cita]);

    if (error) {
      this.showToast('❌ Error al agregar cita.', 'error');
    } else {
      this.showToast('✅ Cita agregada correctamente.', 'success');
      this.citaCreada.emit(); // Notificamos al componente padre
      this.resetForm();
    }
  }

  resetForm() {
    this.selectedClienteId = null;
    this.newDate = {
      mascota_id: null,
      fecha: '',
      hora: '',
      motivo: '',
      estado: 'pendiente',
      trabajador_id: null,
      notas_previsita: '',
    };
    this.mascotas = [];
    this.showModal = false;
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
