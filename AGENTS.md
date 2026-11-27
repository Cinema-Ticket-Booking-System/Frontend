# CineLux Agent Rules

## Sources

- Sheet `1n_91on4gb-CKNwX8X_k8Yg1P_7hSlfo8hfW_f7Uqisk` is task truth; mirror `docs/TASK_TRACKER.md`.
- Figma `my4V8oncIa4rgg2yYUEXD8` (node IDs in tracker) · paths `docs/ai/repo-map.md` · shapes `docs/ai/contracts.md` · handoffs `docs/ai/handoff-protocol.md`.

## Tracker

1. Read the Sheet (`gsheets readonly read`) before `T-xx`/`FIX-xx`/`API-xx` work; after work mutate only non-status cells (`Mock Ready`, `API Connected`, notes), then mirror the tracker.
2. Status is human-only: suggest, never write. No destructive `gsheets` commands.

## UI

Load the tracker Figma node via `figma_figma` (`create_session` -> `get_design_context` + screenshot) before screen UI; if `figma-design-to-code` is missing, use these tools directly.

## Self-Update Rule

Repeated bug, naming mismatch, or missing context -> append `YYYY-MM-DD | TASK | lesson` to `docs/ai/lessons.md`; max 30 lines, prune oldest, no duplicates.
