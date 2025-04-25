// scripts/firebaseAdmin.ts
// Firebase Admin SDK singleton setup for local scripts (TypeScript)

import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import * as path from 'path';
import * as fs from 'fs';

// Path to your service account key (download from Firebase Console > Project Settings > Service Accounts)
const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error('Missing serviceAccountKey.json. Download it from Firebase Console > Project Settings > Service Accounts.');
}

const serviceAccount = require(serviceAccountPath);

let app: App;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
export const auth = getAuth(app);
