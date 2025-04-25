// scripts/addQuestionTemplate.ts
// Script to add a question template to Firestore (TypeScript)

import { db } from './firebaseAdmin';

async function addQuestionTemplate() {
  const template = {
    title: 'Adding Fractions',
    description: 'Practice adding fractions with like denominators.',
    questionText: 'What is {{a}}/{{b}} + {{c}}/{{b}}?',
    variables: {
      a: { min: 1, max: 9, type: 'int' },
      b: { min: 2, max: 10, type: 'int' },
      c: { min: 1, max: 9, type: 'int' }
    },
    topicId: 'fractions', // Replace with actual topic doc ID
    subtopicId: 'adding_fractions', // Replace with actual subtopic doc ID
    prerequisites: ['fractions:basics'],
    prerequisiteFor: ['fractions:subtracting_fractions'],
    difficulty: 'easy',
    tags: ['fractions', 'addition'],
    authorId: 'uid123', // Replace with actual user ID if needed
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const docRef = await db.collection('questionTemplates').add(template);
  console.log(`Question template added with ID: ${docRef.id}`);
}

addQuestionTemplate().catch((err) => {
  console.error('Error adding question template:', err);
  process.exit(1);
});
