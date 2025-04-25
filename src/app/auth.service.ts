import { Injectable, OnDestroy } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user as firebaseUser, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable, from, of, switchMap, ReplaySubject, Subscription } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private personalSubject = new ReplaySubject<User | null>(1);
  personal$ = this.personalSubject.asObservable();
  role$: Observable<string | null>;
  private authSub: Subscription;

  constructor(private auth: Auth, private firestore: Firestore) {
    console.log('AuthService constructor');
    this.authSub = firebaseUser(this.auth).subscribe((user: User | null) => {
      console.log('AuthService user observable fired', user);
      this.personalSubject.next(user);
    });
    this.role$ = this.personal$.pipe(
      switchMap((user: User | null) => {
        console.log('AuthService role$ switchMap', user);
        if (!user || !user.uid) return of(null);
        const userDoc = doc(this.firestore, `users/${user.uid}`);
        return from(getDoc(userDoc)).pipe(
          timeout(10000),
          catchError(err => {
            console.error('Error fetching user doc:', err);
            return of(null);
          }),
          switchMap(snap => {
            console.log('AuthService role$ switchMap snap', snap);
            const userRole = snap && snap.exists() ? snap.data()['role'] : null;
            if (userRole) return of(userRole);
            const roleDoc = doc(this.firestore, `roles/${user.uid}`);
            return from(getDoc(roleDoc)).pipe(
              timeout(10000),
              catchError(err => {
                console.error('Error fetching role doc:', err);
                return of(null);
              }),
              switchMap(roleSnap => {
                console.log('AuthService role$ switchMap roleSnap', roleSnap);
                return of(roleSnap && roleSnap.exists() ? roleSnap.data()['role'] : null)
              })
            );
          })
        );
      })
    );
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  loginWithGoogle() {
    console.log('AuthService loginWithGoogle');
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  loginWithEmail(email: string, password: string) {
    console.log('AuthService loginWithEmail', email, password);
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signupWithEmail(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    // Assign default role in Firestore
    const userRef = doc(this.firestore, 'roles', cred.user.uid);
    await setDoc(userRef, { role: 'user' });
    return cred;
  }

  logout() {
    console.log('AuthService logout');
    return signOut(this.auth);
  }
}
