import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../supabase/supabase.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-page',
  imports: [NgIf, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password-page.component.html',
})
export class ResetPasswordPageComponent {
  resetForm: FormGroup;
  message: string = '';
  error: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Alterna la visibilidad del campo de contraseña.
   * Si `showPassword` es true, muestra el texto como plano (type="text"),
   * si es false, lo oculta como contraseña (type="password").
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  goToLogin() {
    this.router.navigate(['']);
  }

  async onSubmit() {
    if (this.resetForm.invalid) return;

    const { newPassword } = this.resetForm.value;

    try {
      await this.supabaseService.updatePassword(newPassword);

      // Si todo ha salido bien, redirige al login
      this.router.navigate(['/login']);
      this.message = 'Contraseña actualizada correctamente';
    } catch (err: any) {
      this.error = 'No se pudo actualizar la contraseña';
    }
  }
}
