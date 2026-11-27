import { useMemo, useState } from "react";
import { ArrowRight, Film } from "lucide-react";
import SeatGrid from "../../components/seats/SeatGrid";
import { SEAT_STATES } from "../../components/seats/seatStates";
import seatsData from "../../data/seats.json";
import { calculateOrderTotals } from "../../utils/pricingCalculator";

const MODES = ["booking", "editor"];

export default function SeatGridPreview() {
  const [mode, setMode] = useState("booking");
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);

  const seatMap = seatsData;

  const selectedSeats = useMemo(
    () => seatMap.seats.filter((s) => selectedSeatIds.includes(s.id)),
    [seatMap.seats, selectedSeatIds],
  );

  const totals = useMemo(
    () => calculateOrderTotals(selectedSeats),
    [selectedSeats],
  );

  const handleSeatClick = (seat) => {
    if (mode === "editor") return;
    setSelectedSeatIds((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id],
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] pb-28">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        {/* Screen header */}
        <header className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
              <Film className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono tracking-wider">CINELUX</span>
              <span>•</span>
              <span>Dune: Part Two</span>
            </div>
            <h1 className="text-xl font-bold text-slate-100">
              {seatMap.hallName}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              DOLBY ATMOS ·{" "}
              <span className="font-mono">{seatMap.showtimeLabel}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {MODES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  mode === m
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/40"
                    : "bg-[#161B26] text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                mode="{m}"
              </button>
            ))}
          </div>
        </header>

        {/* Seat map card */}
        <div className="rounded-2xl border border-slate-800 bg-[#0F141F] p-6 sm:p-8">
          <SeatGrid
            seats={seatMap.seats}
            matrix={seatMap.matrix}
            pricingTiers={seatMap.pricingTiers}
            mode={mode}
            selectedSeatIds={selectedSeatIds}
            onSeatClick={handleSeatClick}
          />
        </div>

        <p className="text-[11px] text-slate-600 mt-4 text-center">
          Demo route for T-05 · states:{" "}
          {Object.values(SEAT_STATES).join(" · ")}
        </p>
      </div>

      {/* Sticky checkout bar */}
      <div className="fixed bottom-0 inset-x-0 border-t border-slate-800 bg-[#0F141F]/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                {selectedSeatIds.length} Ticket
                {selectedSeatIds.length === 1 ? "" : "s"} Selected
              </p>
              <p className="text-xs text-slate-300">{seatMap.hallName}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedSeats.map((seat) => (
                <span
                  key={seat.id}
                  className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-[10px] font-mono text-amber-300"
                >
                  {seat.id}
                  <span className="text-slate-400">
                    ${Number(seat.price).toFixed(2)}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Estimated Total
              </p>
              <p className="text-lg font-mono font-bold text-amber-400">
                ${totals.total.toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              disabled={selectedSeatIds.length === 0}
              onClick={() => setSelectedSeatIds([])}
              className="px-3 py-2 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Clear
            </button>

            <button
              type="button"
              disabled={selectedSeatIds.length === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-[#0B0E14] hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Hold Seats &amp; Checkout
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
