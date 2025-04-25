import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirestoreTopicsService {
  constructor(private firestore: Firestore) {}

  getTopics(): Observable<any[]> {
    const topicsRef = collection(this.firestore, 'topics');
    return collectionData(topicsRef, { idField: 'id' }).pipe(
      catchError(err => {
        console.error('Error fetching topics:', err);
        return of([]);
      })
    ) as Observable<any[]>;
  }
}