import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { SupabaseService } from "../../supabase/supabase.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IconPlusComponent } from "../icons/icon-plus.component";

@Component({
  selector: 'app-new-date',
  standalone: true,
  imports: [CommonModule, FormsModule, IconPlusComponent],
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
      alert('❗ Todos los campos obligatorios deben estar completos.');
      return;
    }

    // Asegúrate de no incluir cliente_id si no está en la tabla "citas"
    const cita = {
      ...this.newDate
    };

    const { error } = await this.supabase.client
      .from('citas')
      .insert([cita]);

    if (error) {
      console.error('❌ Error al guardar la cita:', error.message);
      alert('❌ Error al guardar la cita');
    } else {
      alert('✅ Cita guardada correctamente');
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
}
