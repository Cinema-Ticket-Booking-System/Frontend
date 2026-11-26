# CineLux Frontend — Agent & Task Tracker Rules

## Live Google Sheet Task Tracker
The shared source of truth for sprint tasks, Figma fixes, and API integration status is the Google Sheet:
- **Title:** CineLux React.js Frontend Task Tracker
- **Spreadsheet ID:** `1n_91on4gb-CKNwX8X_k8Yg1P_7hSlfo8hfW_f7Uqisk`
- **URL:** https://docs.google.com/spreadsheets/d/1n_91on4gb-CKNwX8X_k8Yg1P_7hSlfo8hfW_f7Uqisk/edit
- **Local Mirror:** `docs/TASK_TRACKER.md`

## Figma Design Source
- **File:** Cinema-Page
- **File Key:** `my4V8oncIa4rgg2yYUEXD8`
- **URL:** https://www.figma.com/design/my4V8oncIa4rgg2yYUEXD8/Cinema-Page?node-id=0-1
- Before coding any screen UI, load the `figma-design-to-code` skill and inspect the screen's `nodeId` (listed in `docs/TASK_TRACKER.md`) via `figma_figma` (`create_session` -> `get_design_context` + screenshot).

## Sync Rules (via `gsheets` CLI)
1. **Check before coding:** When asked about project tasks, sprint status, or before implementing a task (`T-xx`), Figma fix (`FIX-xx`), or API endpoint (`API-xx`), read the current state from the Google Sheet with `gsheets readonly read` / `read-all`.
2. **Keep Sheet & Repo in Sync:** After completing or starting a task, resolving a Figma fix, or completing a mock/API contract:
   - Update only the narrowest target cell(s) in the Google Sheet using `gsheets mutate write` (or `gsheets mutate batch`) — never overwrite summary formula cells (`Overview & Progress`, header KPI formulas).
   - Refresh `docs/TASK_TRACKER.md` to match the updated Google Sheet.
3. **Safety:** Never run destructive `gsheets` commands (`delete`, `delete-sheet`, `delete-rows`, `delete-cols`, `clear`) unless the user explicitly requests it.
