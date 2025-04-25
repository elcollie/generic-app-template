import { Component, inject } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { NgIf, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-shared-menu',
  standalone: true,
  imports: [IonicModule, NgIf, AsyncPipe],
  template: `
    <ion-menu side="start" menuId="main" contentId="main-content" *ngIf="user$ | async as user">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item button (click)="navigateHome()">
            <ion-icon name="home"></ion-icon>
            <ion-label>Home</ion-label>
          </ion-item>
        </ion-list>
        <div style="flex: 1 1 auto;"></div>
        <ion-list lines="none" class="signout-list">
          <ion-item button (click)="logout()" class="signout-item">
            <ion-icon name="log-out"></ion-icon>
            <ion-label>Sign out</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  `,
  styles: [`
    .signout-list {
      margin-top: auto;
      padding-bottom: 1.5em;
    }
    .signout-item {
      color: var(--ion-color-danger, #eb445a);
      font-weight: 500;
    }
    ion-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `]
})
export class SharedMenuComponent {
  auth = inject(AuthService);
  user$ = this.auth.personal$;
  router = inject(Router);
  menuCtrl = inject(MenuController);

  async closeMenu() {
    await this.menuCtrl.close('main');
  }

  async navigateHome() {
    await this.router.navigate(['/']);
    await this.closeMenu();
  }

  async logout() {
    await this.auth.logout();
    await this.router.navigate(['/login']);
    await this.closeMenu();
  }
}
