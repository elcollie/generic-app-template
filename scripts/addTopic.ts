// scripts/addTopic.ts
// Script to add a topic to Firestore (TypeScript)

import { db } from './firebaseAdmin';

async function addTopic() {
  const topic = {
    name: 'Fractions',
    description: 'All about fractions: concepts, operations, and applications.',
    parentId: null, // or another topic's document ID for subtopics
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const docRef = await db.collection('topics').add(topic);
  console.log(`Topic added with ID: ${docRef.id}`);
}

addTopic().catch((err) => {
  console.error('Error adding topic:', err);
  process.exit(1);
});
