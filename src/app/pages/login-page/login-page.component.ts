import { CommonModule, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { SupabaseService } from '../../supabase/supabase.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, CommonModule, RouterModule],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  showPassword: boolean = false;
  emailFocused: boolean = false;
  passwordFocused: boolean = false;
  formSubmitted: boolean = false;
  errorMsg: string | null = null;
  successMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Restablece el formulario de login a su estado inicial.
   * Establece los campos 'email' y 'password' a cadenas vacías.
   * Reinicia el estado de validación y los mensajes de error y éxito.
   * Resetea la bandera 'formSubmitted' para evitar mostrar errores prematuros.
   */
  resetForm() {
    // Resetea el formulario a valores vacíos para evitar valores undefined o null
    this.loginForm.reset({ email: '', password: '' });

    // Reiniciar flags y mensajes
    this.formSubmitted = false;
    this.errorMsg = null;
    this.successMsg = null;
  }

  /**
   * Alterna la visibilidad del campo de contraseña.
   * Si `showPassword` es true, muestra el texto como plano (type="text"),
   * si es false, lo oculta como contraseña (type="password").
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Envía un enlace de recuperación de contraseña al email proporcionado.
   */
  async onForgotPassword() {
    const email = this.loginForm.get('email')?.value;

    // Validar que el input de email no esté vacío
    if (!email) {
      this.errorMsg = 'Introduce tu email para recuperar la contraseña';
      this.successMsg = null;
      return;
    }

    // Reiniciar mensajes anteriores
    this.errorMsg = null;
    this.successMsg = null;
    this.isLoading = true;

    try {
      // Enviar enlace de restablecimiento con Supabase
      await this.supabaseService.resetPassword(email);
      this.successMsg = 'Revisa tu correo para restablecer tu contraseña.';
      this.errorMsg = null;
    } catch (err: any) {
      this.errorMsg = 'Introduce una dirección de correo válida';
      this.successMsg = null;
    } finally {
      // Desactivar estado de carga y actualizar vista
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }

  /**
   * Maneja el envío del formulario de login.
   * - Valida el formulario antes de continuar.
   * - Muestra el indicador de carga durante el proceso.
   * - Llama al servicio de Supabase para iniciar sesión.
   * - Redirige al dashboard si las credenciales son válidas.
   * - Muestra errores en caso de fallo en la autenticación.
   */
  async onSubmit(): Promise<void> {
    this.formSubmitted = true;

    // Comprobar que el formulario sea válido
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Limpiar errores previos
    this.errorMsg = null;
    this.successMsg = null;

    // Activar estado de carga
    this.isLoading = true;

    // Obtener y normalizar datos del formulario
    const email = this.loginForm.get('email')?.value?.trim();
    const password = this.loginForm.get('password')?.value;

    // Validación defensiva
    if (!email || !password) {
      this.errorMsg = 'Por favor, introduce tu correo y contraseña.';
      this.isLoading = false;
      this.cdr.markForCheck();
      return;
    }

    try {
      await this.supabaseService.login(email, password);
      this.resetForm();
      this.router.navigate(['/dashboard']);
    } catch (error: unknown) {
      this.errorMsg = 'Email o contraseña incorrectos. Inténtalo de nuevo.';
      this.isLoading = false;

      this.cdr.markForCheck();
      return;
    } finally {
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }
}
