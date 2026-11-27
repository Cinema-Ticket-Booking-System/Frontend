/**
 * SeatGrid — Reusable 2D seat matrix engine (T-05)
 * Modes: "booking" (customer seat selection) | "editor" (admin layout builder)
 *
 * Props:
 *   seats            {Array}   – flat seat array from seats.json / API
 *   matrix           {Object}  – { rows: string[], columns: number, aisleAfterColumn: number }
 *   pricingTiers     {Object}  – { [tier]: { label, price } }
 *   rowBands         {Array}   – [{ rows: string[], tier: string }]
 *   mode             {"booking"|"editor"}
 *   selectedSeatIds  {string[]}
 *   onSeatClick      {(seat, state) => void}
 *   screenLabel      {string}
 *   showScreen       {boolean}
 *   showRowLabels    {boolean}
 *   showTierLegend   {boolean}
 *   showStateLegend  {boolean}
 *   className        {string}
 */

import { useMemo } from "react";
import { Accessibility, Lock, X, Check } from "lucide-react";
import {
  DEFAULT_ROW_BANDS,
  DEFAULT_SEAT_TIER_BORDER,
  DEFAULT_TIER_CHIP,
  SEAT_STATES,
  SEAT_TIER_BORDER,
  TIER_CHIP_STYLES,
} from "./seatStates";

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildSeatIndex(seats = []) {
  const index = new Map();
  seats.forEach((seat) => {
    if (seat?.id) index.set(seat.id, seat);
  });
  return index;
}

function resolveSeatState(seat, selectedIds, mode) {
  if (!seat) return SEAT_STATES.BLOCKED;
  if (mode === "editor") {
    return seat.status === SEAT_STATES.BLOCKED
      ? SEAT_STATES.BLOCKED
      : SEAT_STATES.AVAILABLE;
  }
  if (selectedIds.has(seat.id)) return SEAT_STATES.SELECTED;
  if (seat.status === SEAT_STATES.SOLD) return SEAT_STATES.SOLD;
  if (seat.status === SEAT_STATES.HELD) return SEAT_STATES.HELD;
  if (seat.status === SEAT_STATES.BLOCKED) return SEAT_STATES.BLOCKED;
  return SEAT_STATES.AVAILABLE;
}

// ─── SeatCell ───────────────────────────────────────────────────────────────

function getSeatClasses(state, tier, accessible) {
  const base =
    "size-7 sm:size-8 md:size-9 flex items-center justify-center rounded-lg border p-px transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.44px] leading-none text-center font-medium shrink-0";

  switch (state) {
    case SEAT_STATES.SELECTED:
      return `${base} bg-amber-500 border-amber-400 text-[#0B0E14] font-bold shadow-[0_0_14px_rgba(245,158,11,0.55)] cursor-pointer`;
    case SEAT_STATES.HELD:
      return `${base} bg-[rgba(30,36,54,0.6)] border-[rgba(255,193,116,0.3)] text-[#ffc174] cursor-not-allowed`;
    case SEAT_STATES.SOLD:
      return `${base} bg-[#0b0e14] border-[#151a23] text-slate-600 cursor-not-allowed`;
    case SEAT_STATES.BLOCKED:
      return `${base} bg-rose-950/50 border-rose-900/60 text-rose-500/60 cursor-not-allowed`;
    default: {
      const tierBorder = accessible
        ? "border-[rgba(86,229,169,0.4)] text-[#56e5a9]"
        : SEAT_TIER_BORDER[tier] || DEFAULT_SEAT_TIER_BORDER;
      return `${base} bg-[#151a23] hover:bg-[#1e2436] hover:border-amber-500/60 hover:text-amber-300 cursor-pointer ${tierBorder}`;
    }
  }
}

function SeatCellContent({ state, seat }) {
  if (state === SEAT_STATES.SOLD)
    return <X className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={2.5} />;
  if (state === SEAT_STATES.HELD)
    return <Lock className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={2.5} />;
  if (state === SEAT_STATES.SELECTED)
    return <Check className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />;
  if (seat?.accessible)
    return <Accessibility className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={2} />;
  return <span>{seat?.col ?? ""}</span>;
}

function SeatCell({ seat, state, mode, onSeatClick }) {
  const isInteractive =
    mode === "editor"
      ? state !== SEAT_STATES.BLOCKED
      : state === SEAT_STATES.AVAILABLE || state === SEAT_STATES.SELECTED;

  const title = seat
    ? `${seat.id} · ${seat.tier}${seat.price != null ? ` · $${Number(seat.price).toFixed(2)}` : ""} · ${state}`
    : "Unavailable position";

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={state === SEAT_STATES.SELECTED}
      aria-disabled={!isInteractive}
      disabled={!isInteractive}
      onClick={() => isInteractive && onSeatClick?.(seat, state)}
      className={getSeatClasses(state, seat?.tier, seat?.accessible)}
    >
      <SeatCellContent state={state} seat={seat} />
    </button>
  );
}

// ─── Screen Arc (matches Figma glow exactly) ─────────────────────────────────
//
// Figma breakdown:
//  1. Wide elliptical amber glow — blurred oval sitting ABOVE the arc line,
//     radially fading to transparent on all sides (no hard edge).
//  2. Thin amber curved arc line (~flat parabola), full width.
//  3. "# CURVED IMAX DUAL LASER PROJECTION SURFACE #" mono label below arc.
//
function ScreenArc({ label }) {
  return (
    <div className="w-full flex flex-col items-center select-none mb-2 sm:mb-4">
      {/* Wrapper constrains to same width as the seat matrix area */}
      <div className="relative w-full max-w-[720px] flex flex-col items-center">

        {/* ── Ambient overhead glow ─────────────────────────────────────── */}
        {/* Figma: wide, blurred, elliptical amber radial sitting above the arc.
            We replicate it with an absolutely-positioned div that is:
            - 70% of parent width, centered
            - Short in height (approx 56px tall)
            - Blurred heavily (blur-[48px] ≈ 48px)
            - Transparent at the bottom, so only the top half glows
        */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-14 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(245,158,11,0.32) 0%, rgba(245,158,11,0.10) 45%, rgba(245,158,11,0) 100%)",
            filter: "blur(18px)",
          }}
        />

        {/* ── SVG arc line ──────────────────────────────────────────────── */}
        {/* Figma arc: very flat, wide parabola — Q control point ~10% of height.
            viewBox 672×48 matches Figma node size; stroke amber #F59E0B, width 2.
        */}
        <svg
          viewBox="0 0 672 48"
          className="w-full h-10 sm:h-12 relative z-10"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Subtle glow trail beneath the arc using a wider, low-opacity dupe */}
          <path
            d="M 8 44 Q 336 2 664 44"
            fill="none"
            stroke="rgba(245,158,11,0.18)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Main arc line */}
          <path
            d="M 8 44 Q 336 2 664 44"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        {/* ── Label below arc ───────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 mt-1 relative z-10">
          <span className="text-[#94a3b8] font-mono text-[10px]" aria-hidden="true">#</span>
          <p className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.9px] sm:tracking-[1.1px] text-[#94a3b8] font-mono uppercase whitespace-nowrap">
            {label}
          </p>
          <span className="text-[#94a3b8] font-mono text-[10px]" aria-hidden="true">#</span>
        </div>
      </div>
    </div>
  );
}

// ─── Tier Legend chips ───────────────────────────────────────────────────────

function TierLegend({ pricingTiers }) {
  const entries = Object.entries(pricingTiers || {});
  if (!entries.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6 px-2">
      {entries.map(([tier, meta]) => {
        const style = TIER_CHIP_STYLES[tier] || DEFAULT_TIER_CHIP;
        return (
          <div
            key={tier}
            className={`flex items-center gap-1.5 px-2.5 sm:px-[13px] py-1 sm:py-[5px] rounded-lg border ${style.bg} ${style.border}`}
          >
            <span
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[2px] shrink-0 ${style.dot}`}
              aria-hidden="true"
            />
            <span className={`text-[11px] sm:text-[12px] ${style.label}`}>
              {meta?.label || tier}
            </span>
            {meta?.price != null && (
              <span
                className={`font-mono text-[10px] sm:text-[11px] tracking-[0.44px] font-bold pl-0.5 ${style.price}`}
              >
                ${Number(meta.price).toFixed(2)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── State Legend strip ──────────────────────────────────────────────────────

function StateLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-2 text-[11px] sm:text-[12px] text-[#94a3b8] mt-4 sm:mt-6 px-2">
      <span className="inline-flex items-center gap-1.5 sm:gap-2">
        <span className="size-[16px] sm:size-[18px] rounded-[4px] border border-[#232a38] bg-[#151a23] shrink-0" aria-hidden="true" />
        Available
      </span>
      <span className="inline-flex items-center gap-1.5 sm:gap-2">
        <span className="size-[16px] sm:size-[18px] rounded-[4px] border border-amber-400 bg-amber-500 flex items-center justify-center shrink-0" aria-hidden="true">
          <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#0B0E14]" strokeWidth={3} />
        </span>
        Selected
      </span>
      <span className="inline-flex items-center gap-1.5 sm:gap-2">
        <span className="size-[16px] sm:size-[18px] rounded-[4px] border border-[rgba(255,193,116,0.3)] bg-[rgba(30,36,54,0.6)] flex items-center justify-center shrink-0" aria-hidden="true">
          <Lock className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#ffc174]" strokeWidth={2.5} />
        </span>
        Held in Cart
      </span>
      <span className="inline-flex items-center gap-1.5 sm:gap-2">
        <span className="size-[16px] sm:size-[18px] rounded-[4px] border border-[#151a23] bg-[#0b0e14] flex items-center justify-center shrink-0" aria-hidden="true">
          <X className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-slate-600" strokeWidth={2.5} />
        </span>
        Sold / Reserved
      </span>
      <span className="inline-flex items-center gap-1.5 sm:gap-2">
        <span className="size-[16px] sm:size-[18px] rounded-[4px] border border-[rgba(86,229,169,0.4)] bg-[#151a23] flex items-center justify-center shrink-0" aria-hidden="true">
          <Accessibility className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#56e5a9]" strokeWidth={2} />
        </span>
        Accessible
      </span>
    </div>
  );
}

// ─── SeatRow ─────────────────────────────────────────────────────────────────
//
// Responsive strategy:
//   - Seats are `size-7 sm:size-8 md:size-9` (28/32/36px)
//   - Gap between seats: `gap-1 sm:gap-1.5 md:gap-2`
//   - Center aisle gap: `gap-3 sm:gap-4 md:gap-6`
//   - Row label: `w-5 sm:w-6` text-[11px] sm:text-[13px]
//   On very narrow screens the outer scroll wrapper handles overflow.
//

function SeatRow({
  row,
  columns,
  aisleAfterColumn,
  seatIndex,
  selectedIds,
  mode,
  onSeatClick,
  showRowLabels,
}) {
  const leftCols = aisleAfterColumn;
  const rightCols = columns - aisleAfterColumn;

  return (
    <div className="flex items-center w-full">
      {/* Left row label */}
      {showRowLabels && (
        <div className="w-5 sm:w-6 shrink-0 flex items-center justify-center mr-1 sm:mr-3">
          <span className="font-mono font-bold text-[11px] sm:text-[13px] tracking-[0.26px] text-[#94a3b8]">
            {row}
          </span>
        </div>
      )}

      {/* Seat wings + aisle */}
      <div className="flex flex-1 items-center justify-center min-w-0">
        {/* Left wing */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
          {Array.from({ length: leftCols }, (_, i) => {
            const col = i + 1;
            const seatId = `${row}${col}`;
            const seat = seatIndex.get(seatId);
            const state = resolveSeatState(seat, selectedIds, mode);
            return (
              <SeatCell
                key={seatId}
                seat={seat}
                state={state}
                mode={mode}
                onSeatClick={onSeatClick}
              />
            );
          })}
        </div>

        {/* Center aisle — Figma: faint || text, 32px wide */}
        <div className="w-5 sm:w-7 md:w-8 shrink-0 flex items-center justify-center mx-1 sm:mx-2 md:mx-3">
          <span
            className="font-mono text-[9px] sm:text-[11px] text-[rgba(148,163,184,0.2)] tracking-[-0.55px] select-none"
            aria-hidden="true"
          >
            ||
          </span>
        </div>

        {/* Right wing */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
          {Array.from({ length: rightCols }, (_, i) => {
            const col = aisleAfterColumn + i + 1;
            const seatId = `${row}${col}`;
            const seat = seatIndex.get(seatId);
            const state = resolveSeatState(seat, selectedIds, mode);
            return (
              <SeatCell
                key={seatId}
                seat={seat}
                state={state}
                mode={mode}
                onSeatClick={onSeatClick}
              />
            );
          })}
        </div>
      </div>

      {/* Right row label */}
      {showRowLabels && (
        <div className="w-5 sm:w-6 shrink-0 flex items-center justify-center ml-1 sm:ml-3">
          <span className="font-mono font-bold text-[11px] sm:text-[13px] tracking-[0.26px] text-[#94a3b8]">
            {row}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Main SeatGrid ───────────────────────────────────────────────────────────

export default function SeatGrid({
  seats = [],
  matrix = {},
  pricingTiers = {},
  rowBands = DEFAULT_ROW_BANDS,
  mode = "booking",
  selectedSeatIds = [],
  onSeatClick,
  screenLabel = "CURVED IMAX DUAL LASER PROJECTION SURFACE",
  showScreen = true,
  showRowLabels = true,
  showTierLegend = true,
  showStateLegend = true,
  className = "",
}) {
  const rows = useMemo(
    () =>
      Array.isArray(matrix.rows) && matrix.rows.length ? matrix.rows : [],
    [matrix.rows],
  );
  const columns = Number(matrix.columns) || 0;
  const aisleAfterColumn =
    Number(matrix.aisleAfterColumn) || Math.floor(columns / 2);

  const seatIndex = useMemo(() => buildSeatIndex(seats), [seats]);
  const selectedIds = useMemo(
    () => new Set(selectedSeatIds),
    [selectedSeatIds],
  );

  if (!rows.length || !columns) {
    return (
      <div className="rounded-xl border border-dashed border-[#232a38] bg-[#111622] p-8 text-center text-sm text-[#94a3b8]">
        No seat matrix configured for this auditorium.
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      {/* Screen arc + glow */}
      {showScreen && <ScreenArc label={screenLabel} />}

      {/* Pricing tier legend chips */}
      {showTierLegend && <TierLegend pricingTiers={pricingTiers} />}

      {/*
        Seat matrix — responsive strategy:
        • On wide screens: all seats fit without scrolling (md: 36px × 12 + gaps ≈ 580px)
        • On narrow screens (sm/mobile): seat size drops to 28px; if still too narrow, horizontal scroll kicks in
        • `overflow-x-auto` only triggers when content truly overflows
      */}
      <div className="w-full overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-[10px] min-w-min w-full">
          {rows.map((row) => (
            <SeatRow
              key={row}
              row={row}
              columns={columns}
              aisleAfterColumn={aisleAfterColumn}
              seatIndex={seatIndex}
              selectedIds={selectedIds}
              mode={mode}
              onSeatClick={onSeatClick}
              showRowLabels={showRowLabels}
            />
          ))}
        </div>
      </div>

      {/* State legend */}
      {showStateLegend && <StateLegend />}
    </div>
  );
}
