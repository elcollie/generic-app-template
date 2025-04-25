#!/bin/bash

# Simple setup script for new Ionic/Angular app instance

cp src/environments/environment.template.ts src/environments/environment.ts
npm install

echo "\n---"
echo "Copied environment.template.ts to environment.ts."
echo "Please edit src/environments/environment.ts with your Firebase config before running the app."
echo "Run: npm start or ionic serve to launch the app."
