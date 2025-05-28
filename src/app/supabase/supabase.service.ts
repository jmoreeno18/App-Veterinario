import { Injectable } from '@angular/core';
import { AuthSession } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { supabase } from './config/init-supabase';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  public user: any = null;
  public userRol: string = '';
  _session: AuthSession | null = null;

  constructor(
    private router: Router
  ) { }

  get session() {
    supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  // Obtiene el cliente de Supabase
  get client() {
    return supabase;
  }

  // Iniciar sesión
  async login(email: string, password: string): Promise<void> {
    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      // Si ha ocurrido cualquier error en el inicio de sesión, la cierra
      if (error || !data.user) {
        await supabase.auth.signOut();
        throw error || new Error('Usuario o contraseña incorrectos');
      }

      // Recoge el rol del usuario en la tabla 'usuarios'
      const { data: profileRol, error: profileError } = await supabase
        .from('usuarios')
        .select('rol')
        .eq('correo', data.user.email)
        .single()

      if (profileError || !profileRol) {
        throw profileError || new Error('No se pudo obtener el perfil del usuario');
      }

      this.user = data.user;
      this.userRol = profileRol.rol;

      // Redirigir al dashboard según el rol del usuario
      this.redirecTo();
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      throw err;
    }
  }

  // Cerrar sesión
  signOut() {
    return supabase.auth.signOut()
  }

  // Redirige a una ruta u otra según el rol del usuario
  redirecTo(): void {
    if (this.userRol === 'admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  // Obtiene los datos necesarios para las citas
  async getAppointments(): Promise<any[]> {
    const { data, error } = await supabase
      .from('citas')
      .select(`
      id,
      fecha,
      hora,
      motivo,
      estado,
      notas_previsita,
      mascotas (
        nombre,
        especie,
        clientes (
          nombre,
          apellidos,
          email
        )
      ),
      usuarios (
        nombre
      )
    `);

    if (error) {
      console.error('❌ Error fetching appointments:', error.message);
      return [];
    }

    return data;
  }

  // Permite modificar citas desde el Modal
async updateAppointment(id: number, updates: Partial<any>) {
  const { error } = await supabase
    .from('citas')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('❌ Error updating appointment:', error.message);
    throw error;
  }
}


}
