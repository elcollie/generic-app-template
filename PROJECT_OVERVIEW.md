# Project Overview

## ⚠️ Architectural Foundation: Standalone vs. NgModule (Critical)

**This project uses Angular Standalone Components (NO AppModule, NO feature NgModules).**

- All components are bootstrapped and composed using the standalone API.
- Providers like `provideIonicAngular()` must be included in the `bootstrapApplication` call in `main.ts`.
- Do NOT attempt to add or rely on classic NgModule patterns (no `AppModule`, no `IonicModule.forRoot()` in a root module).
- All dependencies (e.g., `IonicModule`, `RouterModule`) must be imported directly in the `imports` array of each standalone component.

**Always clarify if a file, snippet, or migration step is for standalone or NgModule-based Angular. Mixing patterns will break the app.**

## MVP Scope
- Design and manage (CRUD) multiple maths question templates
- Generate questions from templates, with variable randomization and student-level adaptation
- User authentication, profile, and history via Firebase (assume feasible, focus on math features first)
- The MVP scope is now finalized and will not evolve further

## Technology Stack
- **Frontend:** Angular 19.2.5 with Ionic 8.5.3
- **Backend:** Firebase (Authentication, Firestore, Cloud Functions)
- **Math Libraries:**
    - KaTeX (rendering) — currently implemented
    - math.js (computation) — fully implemented
    - The math rendering and computation libraries have been finalized
- **Payment Processing:** Stripe (via Firebase Cloud Functions) — implemented
- **Deployment:** Firebase Hosting, iOS/Android app stores (current)

## Project Management & Documentation
- All project tracking and design decisions are recorded in Markdown files in the repo:
    - `PROJECT_TRACKER.md`: Tasks, status, and progress log
    - `DESIGN_AND_DECISIONS.md`: All design choices, key discussions, and context
- Collaboration: All design decisions have been finalized and approved
- Updates: Tracker and overview updated after every significant change or decision
- GitHub Projects is used for visual management

---

_Last updated: 2025-04-24_
