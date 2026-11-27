# Agent Handoff Protocol

## Ownership

| Agent         | Reads                                                                                                  | Writes                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Vision Gemini | tracker row, `docs/ai/repo-map.md`, `src/index.css`, target screen, Figma `my4V8oncIa4rgg2yYUEXD8`     | `docs/ai/ui-spec.md` (overwrite), log 1 line               |
| Code DeepSeek | `docs/ai/ui-spec.md`, `docs/ai/repo-map.md`, `docs/ai/contracts.md`, tracker row, spec-listed files    | `src/**`, `docs/ai/code-report.md` (overwrite), log 1 line |
| Report Claude | `git diff --name-only`, `git diff -U0 -- <path>`, `code-report.md`, `report.md`, log tail, tracker row | `docs/ai/report.md` (overwrite), log 1 line                |

Fixed files: `ui-spec.md` single spec · `code-report.md` single cycle · `report.md` single progress report · `handoff-log.md` append-only, 1 line per handoff, max 30. Tracker and Sheet are read-only; Status is human-only. Flow: Figma -> spec -> code -> report; 1 log line each.

## Vision -> Code (`docs/ai/ui-spec.md`, overwrite, max 100 lines)

Header + 4 blocks only; no prose or acceptance text.

```md
TASK: T-06 | ROUTE: /showtimes/:id/seats | NODE: 1:4758 | SPEC: 3

## TREE

Page.div.min-h-screen.bg-[#0B0E14].text-[#F8FAFC].flex.flex-col > Header.div.max-w-4xl.mx-auto.px-6.pt-8 > h1.text-xl.font-bold
Section.div.rounded-2xl.border.border-[#232A38].bg-[#111622].p-6 > SeatGrid//props
Footer.div.fixed.bottom-0.inset-x-0.border-t.bg-[#0F141F]/95

## TOKENS

bg #0B0E14 | surface #111622 | elevated #181F30 | border #1E2638 | accent #F59E0B | text #F8FAFC | muted #94A3B8
amber #FFC174 | success #4EDEA3 | danger #FB7185 | Inter sans | JetBrains Mono | rounded-lg/2xl | gap-4/6 | grid 8x12

## STATES

SeatGrid.mode: booking | editor | status: AVAILABLE | SELECTED | HELD | SOLD | BLOCKED | selectedSeatIds: string[]
Button.primary: default bg-[#F59E0B] | hover bg-[#D97706] | disabled opacity-40
Field.input: focus border-[#F59E0B]/50 | error border-rose-900 text-rose-400 | Page: loading animate-pulse.bg-[#181F30] | empty text-[#94A3B8].text-center

## DATA

getSeatMap(showtimeId) -> { hallName, showtimeLabel, matrix, pricingTiers, seats[] }
seat -> { id, row, col, tier, price, status, accessible } | onSeatClick(seat, state) -> selectedSeatIds
selectedSeats -> calculateOrderTotals() -> { subtotal, imaxSurcharge, serviceFee, tax, total }
assets src/assets/auth/\*.svg | icons lucide-react
```

## Code -> Report (`docs/ai/code-report.md`, max 10 lines, 5 bullets)

```md
TASK: T-06 | STATUS: In Review (suggested; tracker untouched)

- FILES: src/pages/customer/SeatSelectPage.jsx, src/App.jsx
- DONE: SeatGrid booking mode, tier legend, sticky totals, hold CTA disabled at 0 seats
- VERIFY: npm run lint; /showtimes/st_1024_01/seats renders 8x12 grid and totals
- BLOCK: none
- NEXT: FIX-02 checkout total parity
```

Status: `Not Started` | `In Progress` | `In Review` | `Done`, suggested only.

## Token Discipline

1. Reads: line ranges (`offset`/`limit` or `anchor_line`); full file only under 120 lines; use `docs/ai/repo-map.md`, never list directories, never re-read context.
2. Output and edits: no unchanged code, full files, or diff hunks; cite `path:line`; search/replace only, max 3 blocks per file per turn.
3. Overwrite `ui-spec.md`, `code-report.md`, `report.md` each cycle; no append-only specs.
4. Caps: spec 100 lines · code report 10 lines / 5 bullets · progress report 40 lines · `handoff-log.md` 1 line per handoff, <=140 chars, max 30, prune oldest.
5. Ambiguity: one `BLOCK:` or `OPEN:` line, no guessing; repeated bug or naming mismatch -> one lesson per `AGENTS.md`.
