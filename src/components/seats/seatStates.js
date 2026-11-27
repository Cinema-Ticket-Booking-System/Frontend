/**
 * Seat states supported by the SeatGrid engine.
 * - AVAILABLE  : selectable by the customer
 * - SELECTED   : currently picked in booking mode
 * - HELD       : locked in another cart (5-min hold) — amber border, lock icon
 * - SOLD       : already purchased / reserved — dark bg, × icon
 * - BLOCKED    : disabled / not bookable (editor mode only)
 */
export const SEAT_STATES = Object.freeze({
  AVAILABLE: "AVAILABLE",
  SELECTED: "SELECTED",
  HELD: "HELD",
  SOLD: "SOLD",
  BLOCKED: "BLOCKED",
});

/**
 * Legend metadata for each state — matches Figma bottom legend strip.
 */
export const SEAT_STATE_META = Object.freeze({
  AVAILABLE: {
    label: "Available",
    swatch: "bg-[#151a23] border-[#232a38]",
  },
  SELECTED: {
    label: "Selected",
    swatch: "bg-amber-500 border-amber-400",
    icon: "check",
  },
  HELD: {
    label: "Held in Cart",
    swatch: "bg-[rgba(30,36,54,0.6)] border-[rgba(255,193,116,0.3)]",
    icon: "lock",
  },
  SOLD: {
    label: "Sold / Reserved",
    swatch: "bg-[#0b0e14] border-[#151a23]",
    icon: "x",
  },
  BLOCKED: {
    label: "Blocked",
    swatch: "bg-rose-950/60 border-rose-900",
  },
});

/**
 * Row bands group consecutive rows into pricing tier sections.
 * Matches Figma: A-C = Standard, D-F = Sweet Spot, G-H = VIP Recliner.
 */
export const DEFAULT_ROW_BANDS = Object.freeze([
  { rows: ["A", "B", "C"], tier: "STANDARD" },
  { rows: ["D", "E", "F"], tier: "SWEET_SPOT" },
  { rows: ["G", "H"],      tier: "VIP_RECLINER" },
]);

/**
 * Figma tier chip configs — colored dot + label text color per tier.
 * dot: swatch color class  |  label: text color class  |  border: ring color class
 */
export const TIER_CHIP_STYLES = Object.freeze({
  STANDARD: {
    dot: "bg-[rgba(148,163,184,0.4)]",
    label: "text-[#94a3b8]",
    price: "text-[#f8fafc]",
    border: "border-[#232a38]",
    bg: "bg-[#151a23]",
  },
  SWEET_SPOT: {
    dot: "bg-[#ffc174] shadow-[0_1px_2px_rgba(255,193,116,0.5)]",
    label: "text-[#ffc174]",
    price: "text-[#ffc174]",
    border: "border-[rgba(255,193,116,0.3)]",
    bg: "bg-[#1e2436]",
  },
  VIP_RECLINER: {
    dot: "bg-[#4edea3]",
    label: "text-[#94a3b8]",
    price: "text-[#f8fafc]",
    border: "border-[#232a38]",
    bg: "bg-[#151a23]",
  },
});

/** Fallback tier chip style */
export const DEFAULT_TIER_CHIP = TIER_CHIP_STYLES.STANDARD;

/**
 * Per-seat available-state border/text color by tier.
 * Applied only when state === AVAILABLE.
 */
export const SEAT_TIER_BORDER = Object.freeze({
  STANDARD:    "border-[#232a38] text-[#94a3b8]",
  SWEET_SPOT:  "border-[rgba(255,193,116,0.3)] text-[#ffc174]",
  VIP_RECLINER:"border-[rgba(78,222,163,0.3)]  text-[#4edea3]",
  ADA_ACCESSIBLE:"border-[rgba(86,229,169,0.4)] text-[#56e5a9]",
});

export const DEFAULT_SEAT_TIER_BORDER = SEAT_TIER_BORDER.STANDARD;
