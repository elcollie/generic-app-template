// scripts/listCollections.ts
// Script to list all topics and question templates in Firestore (TypeScript)

import { db } from './firebaseAdmin';

async function listCollections() {
  console.log('--- Topics ---');
  const topicsSnapshot = await db.collection('topics').get();
  topicsSnapshot.forEach(doc => {
    console.log(doc.id, doc.data());
  });

  console.log('\n--- Question Templates ---');
  const templatesSnapshot = await db.collection('questionTemplates').get();
  templatesSnapshot.forEach(doc => {
    console.log(doc.id, doc.data());
  });
}

listCollections().catch((err) => {
  console.error('Error listing collections:', err);
  process.exit(1);
});
