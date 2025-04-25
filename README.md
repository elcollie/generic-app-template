# Ionic Angular App Template

A starter template for cross-platform (iOS/Android/Web) apps with Firebase Auth and Firestore integration.

## Features
- Angular + Ionic (standalone components)
- Firebase Auth (email/password, Google, etc.)
- Firestore for data storage
- Responsive mobile-first UI
- Modular: easy to add new pages and features

## Getting Started

1. **Create a new Firebase project** at https://console.firebase.google.com/
2. **Enable Authentication** (Email/Password, Google, etc.)
3. **Create a Firestore database** (start in test mode)
4. **Copy your Firebase config** (from project settings)
5. **Clone or generate a new repo from this template**
6. **Run the setup script:**
   ```bash
   ./setup.sh
   ```
7. **Edit `src/environments/environment.ts`** with your Firebase config.
8. **Run the app:**
   ```bash
   npm start
   # or
   ionic serve
   ```

## Adding Pages & Features
- Add new standalone components for pages.
- Add routes in `src/app/app.routes.ts`.
- Add menu items in `shared-menu.component.ts`.

## Theming & Branding
- Edit `src/global.scss` for colors, fonts, and layout tweaks.
- Replace logos and icons as needed.

## Deployment
- Web: Deploy to Firebase Hosting, Vercel, Netlify, etc.
- iOS/Android: Use Capacitor (`ionic build`, `ionic cap add ios/android`, open in Xcode/Android Studio).

---

### Environment Template (`src/environments/environment.template.ts`)
```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: '...',
    appId: '...'
  }
};
```

---

**Happy hacking!**
