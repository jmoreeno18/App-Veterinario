import { RouterModule,Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { EmployeeListComponent } from './pages/employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages/employees/employee-form/employee-form.component';
import { PetFormComponent } from './pages/pets/pet-form/pet-form.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { ProfileClientComponent } from './components/profile-client/profile-client.component';

export const routes: Routes = [
  // Redirige raíz a login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Página de login
  {
    path: 'login',
    component: LoginPageComponent,
    // canActivate: [LoginGuard],
  },

  {
    path: 'profile/:id',
    component : ProfileClientComponent

  },

  // Página para reestablecer la contraseña
  {
    path: 'reset-password',
    component: ResetPasswordPageComponent
  },

  // Dashboard y sus rutas hijas
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    // canActivate: [DashboardGuard],
    // canActivateChild: [DashboardGuard],
    children: [
      { path: 'clients', component: ClientListComponent },
      { path: 'clients/new', component: ClientFormComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/new', component: EmployeeFormComponent },
      { path: 'pets/new', component: PetFormComponent },
      { path: 'calendar', component: CalendarPageComponent },
    ],
  },

  // Cualquier ruta no encontrada
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];


