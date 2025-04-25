import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedHeaderComponent } from './shared-header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <app-shared-header [title]="'Login'"></app-shared-header>
    <ion-content class="ion-padding">
      <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
        <ion-list lines="none">
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input formControlName="email" type="email" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Password</ion-label>
            <ion-input formControlName="password" type="password" required></ion-input>
          </ion-item>
        </ion-list>
        <ion-button expand="block" type="submit" [disabled]="loginForm.invalid">Login</ion-button>
      </form>
      <ion-text color="danger" *ngIf="error">
        <p>{{ error }}</p>
      </ion-text>
      <ion-item lines="none">
        <ion-label>Don't have an account?</ion-label>
        <ion-button fill="clear" routerLink="/signup">Sign up</ion-button>
      </ion-item>
    </ion-content>
  `,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, RouterModule, SharedHeaderComponent],
})
export class LoginComponent {
  loginForm: any;
  error: string | null = null;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.auth.loginWithEmail(email!, password!)
      .then(() => this.router.navigate(['/']))
      .catch(err => this.error = err.message || 'Login failed');
  }
}
