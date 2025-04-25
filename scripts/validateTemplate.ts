// scripts/validateTemplate.ts
// Script to validate a question template document structure (TypeScript)

import { db } from './firebaseAdmin';

// Define the expected schema for a question template
const expectedFields = [
  'title', 'description', 'questionText', 'variables', 'topicId',
  'subtopicId', 'prerequisites', 'prerequisiteFor', 'difficulty',
  'tags', 'authorId', 'createdAt', 'updatedAt'
];

async function validateTemplate(docId: string) {
  const docRef = db.collection('questionTemplates').doc(docId);
  const docSnap = await docRef.get();
  if (!docSnap.exists) {
    console.error('Template not found:', docId);
    return;
  }
  const data = docSnap.data();
  const missingFields = expectedFields.filter(f => !(f in data));
  if (missingFields.length) {
    console.warn('Missing fields:', missingFields);
  } else {
    console.log('All expected fields present.');
  }
  // Optionally, add more validation logic here (type checks, etc.)
}

// Usage: node validateTemplate.js <docId>
const docId = process.argv[2];
if (!docId) {
  console.error('Usage: ts-node validateTemplate.ts <docId>');
  process.exit(1);
}

validateTemplate(docId).catch((err) => {
  console.error('Error validating template:', err);
  process.exit(1);
});
