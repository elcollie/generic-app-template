import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./signup.component').then(m => m.SignupComponent) },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];
