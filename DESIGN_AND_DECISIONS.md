# Design & Decisions Log

---

### [2025-04-24] Project Setup & Collaboration Process
**Context:**
Established initial project scope, technology stack, and collaboration workflow.

**Options Considered:**
- Local Markdown files for tracking
- GitHub Projects for visual task management

**Decision:**
Use local Markdown files (`PROJECT_TRACKER.md`, `DESIGN_AND_DECISIONS.md`) for project management and decision logging. Revisit GitHub Projects if needed as project scales.

**Next Steps:**
- [x] Create tracker and log files
- [x] Design question template data model

---

### [2025-04-24] Question Template Data Model & Topics Structure
**Context:**
Defined the data model for question templates and the structure for organizing them by topic and subtopic in Firestore. Added support for prerequisites and forward learning paths.

**Options Considered:**
- Flat question template structure with tags only
- Hierarchical structure with topics, subtopics, and prerequisite relationships

**Decision:**
Implement a persistent `topics` collection in Firestore for organizing templates by topic and subtopic. Each template references its topic and subtopic by ID and includes both `prerequisites` (topics/subtopics required before attempting) and `prerequisiteFor` (topics/subtopics this template unlocks). This supports curriculum navigation, adaptive learning, and future UI features.

**Next Steps:**
- [ ] Define Firestore collections and document structure for topics and templates
- [ ] Plan CRUD implementation for question templates
- [ ] Plan CRUD implementation for topics

---

### [YYYY-MM-DD] Create Fresh Design & Decisions Log
**Context:**  
Created a fresh design & decisions log in the main project directory.

**Options Considered:**  
- Create a new log file from scratch  
- Copy an existing template and modify it

**Decision:**  
Created a new log file from scratch to ensure a clean and organized start.

**Next Steps:**  
- [ ] Review and update the log file as needed

---

## Template for Future Entries

### [YYYY-MM-DD] Title/Topic
**Context:**  
_Short description of what was discussed or decided._

**Options Considered:**  
- Option 1: Brief description  
- Option 2: Brief description  
- …

**Decision:**  
_What was chosen and why._

**Next Steps:**  
- [ ] Action item 1  
- [ ] Action item 2
