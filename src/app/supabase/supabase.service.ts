import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from './config/init-supabase';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  public user: any = null;
  public userRol: string = '';

  constructor(private router: Router) {
    // Escucha cambios de sesión
    this.client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        // Limpiar estado local
        this.user = null;
        this.userRol = '';

        // Redirigir al login
        this.router.navigate(['/login']);
      }

      if (event === 'SIGNED_IN' && session?.user) {
        this.user = session.user;
        const email = session.user.email;
        if (email) {
          this.loadUserRole(email);
        }
      }
    });
  }

  // Obtiene el cliente de Supabase
  get client() {
    return supabase;
  }

  /**
   * Inicia sesión con el email y la contraseña proporcionados.
   *
   * Intenta autenticar al usuario mediante Supabase Auth con correo y contraseña.
   * En caso de error o usuario no encontrado, cierra sesión y lanza un error.
   * Luego, obtiene el rol del usuario desde la tabla 'usuarios' según su email.
   * Si no puede obtener el rol, lanza un error.
   * Finalmente, asigna el usuario y su rol a las propiedades locales.
   *
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @throws {Error} Lanza un error si el inicio de sesión falla o no se puede obtener el perfil del usuario.
   */
  async login(email: string, password: string): Promise<void> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
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
        .eq('email', data.user.email)
        .single();

      if (profileError || !profileRol) {
        throw (
          profileError || new Error('No se pudo obtener el perfil del usuario')
        );
      }

      this.user = data.user;
      this.userRol = profileRol.rol;
    } catch (err: any) {
      throw new Error(err?.message || 'Error desconocido al iniciar sesión.');
    }
  }

  /**
   * Cierra la sesión del usuario actual en Supabase.
   *
   * En caso de error (por ejemplo, si la sesión ya está cerrada), muestra una
   * advertencia en consola pero continúa con la limpieza local.
   *
   * @returns {Promise<void>} - Una promesa que se resuelve cuando el cierre de sesión
   * y la redirección han finalizado.
   */
  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch {
      // Se ignora el error, porque no debe impedir que se limpien datos y redirija
    } finally {
      // Limpia la información del usuario
      this.user = null;
      this.userRol = '';

      // Redirige a la página de login
      await this.router.navigate(['/login']);
    }
  }

  /**
   * Verifica si existe una sesión activa en Supabase, y si es así, restaura
   * las credenciales del usuario y su rol correspondiente desde la base de datos.
   *
   * Mantiene la sesión del usuario activa tras una recarga de página o reinicio.
   *
   * - Si hay una sesión activa, se asigna el usuario a `this.user` y se busca
   *   su rol en la tabla `usuarios` para asignarlo a `this.userRol`.
   * - Si no hay sesión o hay un error en la consulta, se limpian los valores.
   *
   * @returns {Promise<void>} Una promesa que se resuelve cuando la restauración de sesión ha finalizado.
   */
  async restoreSession(): Promise<void> {
    const {
      data: { session },
    } = await this.client.auth.getSession();

    if (session?.user) {
      this.user = session.user;

      // Buscar el rol asociado al usuario en la tabla "usuarios"
      const { data: profileRol, error } = await this.client
        .from('usuarios')
        .select('rol')
        .eq('email', session.user.email)
        .single();

      if (!error && profileRol) {
        this.userRol = profileRol.rol;
      } else {
        this.userRol = '';
      }
    } else {
      this.user = null;
      this.userRol = '';
    }
  }

  /**
   * Carga y asigna el rol del usuario a partir de su email.
   *
   * Consulta la tabla `usuarios` en Supabase para obtener
   * el campo `rol` correspondiente al email proporcionado. Si encuentra
   * un resultado válido, actualiza la propiedad `userRol` con dicho valor.
   * Si hay un error o no se encuentra el usuario, se asigna un rol vacío.
   *
   * @param {string} email - Dirección de correo del usuario cuyo rol se desea obtener.
   * @returns {Promise<void>} Una promesa que se resuelve cuando finaliza la operación.
   */
  private async loadUserRole(email: string): Promise<void> {
    const { data: profileRol, error } = await this.client
      .from('usuarios')
      .select('rol')
      .eq('email', email)
      .single();

    if (!error && profileRol) {
      this.userRol = profileRol.rol;
    } else {
      this.userRol = '';
    }
  }

  /**
   * Redirige a la ruta especificada.
   *
   * Permite redirigir a cualquier ruta del sistema pasándola
   * como parámetro.
   *
   * @param ruta - Ruta a la que se desea redirigir.
   */
  redirectTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  /**
   * Envía un correo electrónico para que el usuario pueda restablecer su contraseña.
   * Utiliza la función de Supabase para enviar el email con el enlace de recuperación.
   *
   * @param {string} email - El correo electrónico del usuario que solicita el restablecimiento.
   * @throws {Error} Si ocurre un error al enviar el correo de restablecimiento.
   * @returns {Promise<void>} Una promesa que se resuelve cuando el correo se ha enviado correctamente.
   */
  async resetPassword(email: string): Promise<void> {
    const redirectTo = 'http://localhost:4200/reset-password';
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      throw new Error(
        `Error al enviar correo de restablecimiento: ${error.message}`
      );
    }
  }

  /**
   * Actualiza la contraseña del usuario autenticado en Supabase.
   *
   * @param {string} newPassword - La nueva contraseña que se establecerá para el usuario.
   * @returns {Promise<void>} - Una promesa que se resuelve si la actualización es exitosa.
   * @throws {Error} - Lanza un error si la actualización falla.
   */
  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) throw error;
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
