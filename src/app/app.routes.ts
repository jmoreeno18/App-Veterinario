import { Routes } from '@angular/router';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EmployeeListComponent } from './pages/employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages/employees/employee-form/employee-form.component';
import { PetListComponent } from './pages/pets/pet-list/pet-list.component';
import { PetFormComponent } from './pages/pets/pet-form/pet-form.component';

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
      { path: 'pets', component: PetListComponent },
      { path: 'pets/new', component: PetFormComponent },
    ],
  },

  // Cualquier ruta no encontrada
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
