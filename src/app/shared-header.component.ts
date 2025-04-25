import { Component, Input, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgIf, AsyncPipe } from '@angular/common';
import { AuthService } from './auth.service';
import { SharedMenuComponent } from './shared-menu.component';

@Component({
  selector: 'app-shared-header',
  standalone: true,
  imports: [IonicModule, NgIf, AsyncPipe, SharedMenuComponent],
  template: `
    <app-shared-menu></app-shared-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start" *ngIf="user$ | async">
          <ion-menu-button menu="main"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <div slot="end" *ngIf="user$ | async as user">
          <span style="margin-right: 1em; font-size: 0.95em;">
            {{ user.displayName || user.email }}<span *ngIf="role$ | async as role"> ({{ role }})</span>
          </span>
        </div>
      </ion-toolbar>
    </ion-header>
  `
})
export class SharedHeaderComponent {
  @Input() title = '';
  auth = inject(AuthService);
  user$ = this.auth.personal$;
  role$ = this.auth.role$;
}
