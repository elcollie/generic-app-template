import {Component, inject, OnInit, OnDestroy} from '@angular/core';
import {FirestoreTopicsService} from './firestore-topics.service';
import { NgIf, NgFor } from '@angular/common';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { Router, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedHeaderComponent } from './shared-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, NgIf, NgFor, RouterOutlet, SharedHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private topicsService = inject(FirestoreTopicsService);
  private auth = inject(AuthService);
  topics: any[] = [];
  user: User | null = null;
  role: string | null = null;
  private authSub: Subscription | undefined;
  private roleSub: Subscription | undefined;
  private topicsSub: Subscription | undefined;

  constructor(private router: Router) {
    console.log('AppComponent constructor');
  }

  ngOnInit() {
    console.log('AppComponent ngOnInit');
    this.authSub = this.auth.personal$.subscribe((user: User | null) => {
      this.user = user;
      if (!user) {
        this.router.navigate(['/login']);
        this.topics = [];
        this.topicsSub?.unsubscribe();
        return;
      }
      this.topicsSub = this.topicsService.getTopics().subscribe(
        topics => { this.topics = topics; },
        err => { this.topics = []; console.error('Error in topics subscription', err); }
      );
    });
    this.roleSub = this.auth.role$.subscribe((role: string | null) => {
      this.role = role;
    });
  }

  ngOnDestroy() {
    console.log('AppComponent ngOnDestroy');
    this.authSub?.unsubscribe();
    this.roleSub?.unsubscribe();
    this.topicsSub?.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}