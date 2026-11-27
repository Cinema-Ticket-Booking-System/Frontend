---
name: implement-cine-task
description: Implements a specific CineLux task (T-01..T-30), Figma fix (FIX-01..FIX-05), or API endpoint (API-01..API-13) while respecting team ownership and keeping TASK_TRACKER.md aligned.
---

# Implement CineLux Task Workflow

1. **Locate Task & Figma Frame:** Look up the target `T-xx`, `FIX-xx`, or `API-xx` ID in `TASK_TRACKER.md` to check the assigned owner, route, branch, and Figma node ID (`my4V8oncIa4rgg2yYUEXD8`).
2. **Verify Existing Code First:** Inspect `src/App.jsx`, `src/layouts/`, `src/services/`, and `src/data/` before creating files so you build on existing scaffolding rather than duplicating it.
3. **Implement Within Ownership:** Create or update only the files belonging to that task's owner and feature track.
4. **Install Missing Packages Explicitly:** If a task needs `axios`, `@tanstack/react-query`, or `qrcode.react`, list the exact install command clearly for the developer.
5. **Update Tracker Notes:** Report any status change (`Not Started` -> `In Progress` -> `In Review` -> `Done`) and any new mock JSON or API endpoint added so `TASK_TRACKER.md` and the Google Sheet stay in sync.
   - **Status is manual:** Never write status values into the Google Sheet or `docs/TASK_TRACKER.md`. Only *report* the suggested status in your response; the human developer applies it by hand.
