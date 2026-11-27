import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Film,
  Loader2,
  RotateCcw,
} from "lucide-react";
import SeatGrid from "../../components/seats/SeatGrid";
import { cinemaService } from "../../services/cinemaService";
import { calculateOrderTotals } from "../../utils/pricingCalculator";

const DEFAULT_SCREEN_LABEL = "CURVED IMAX DUAL LASER PROJECTION SURFACE";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

export default function SeatSelectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seatMap, setSeatMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [holding, setHolding] = useState(false);
  const [holdError, setHoldError] = useState(null);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchSeatMap() {
      try {
        const data = await cinemaService.getSeatMap(id);
        if (cancelled) return;
        if (!data) {
          throw new Error("Seat map not found for this showtime.");
        }
        setSeatMap(data);
        setSelectedSeatIds([]);
        setLoadError(null);
      } catch (err) {
        if (cancelled) return;
        setLoadError(err?.message || "Unable to load the seat map.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSeatMap();

    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setLoadError(null);
    setReloadKey((key) => key + 1);
  };

  const selectedSeats = useMemo(() => {
    if (!seatMap) return [];
    return seatMap.seats.filter((seat) => selectedSeatIds.includes(seat.id));
  }, [seatMap, selectedSeatIds]);

  const totals = useMemo(
    () => calculateOrderTotals(selectedSeats),
    [selectedSeats],
  );

  const handleSeatClick = (seat) => {
    if (!seat) return;
    setHoldError(null);
    setSelectedSeatIds((prev) =>
      prev.includes(seat.id)
        ? prev.filter((seatId) => seatId !== seat.id)
        : [...prev, seat.id],
    );
  };

  const handleClear = () => {
    setSelectedSeatIds([]);
    setHoldError(null);
  };

  const handleHoldAndCheckout = async () => {
    if (!seatMap || selectedSeatIds.length === 0 || holding) return;
    setHolding(true);
    setHoldError(null);
    try {
      const hold = await cinemaService.holdSeats(id, selectedSeatIds);
      navigate("/checkout", {
        state: {
          holdCode: hold?.holdCode,
          showtimeId: hold?.showtimeId ?? id,
          seatIds: hold?.seatIds ?? selectedSeatIds,
          expiresInSeconds: hold?.expiresInSeconds,
          hallName: seatMap.hallName,
          showtimeLabel: seatMap.showtimeLabel,
          seats: selectedSeats,
          totals,
        },
      });
    } catch (err) {
      setHoldError(err?.message || "Unable to hold the selected seats.");
      setHolding(false);
    }
  };

  const screenLabel = seatMap?.curvedScreenLabel || DEFAULT_SCREEN_LABEL;
  const canCheckout = selectedSeatIds.length > 0 && !holding;

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
              <span>Seat Selection</span>
            </div>
            <h1 className="text-xl font-bold text-slate-100">
              {seatMap?.hallName || "Select Your Seats"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {seatMap?.showtimeLabel ? (
                <span className="font-mono">{seatMap.showtimeLabel}</span>
              ) : (
                "Choose your preferred seats"
              )}
            </p>
          </div>
        </header>

        {/* Loading state */}
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-[#0F141F] p-10 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            <p className="text-sm">Loading seat map…</p>
          </div>
        )}

        {/* Error state */}
        {!loading && loadError && (
          <div className="rounded-2xl border border-rose-900/60 bg-rose-950/30 p-8 flex flex-col items-center gap-4 text-center">
            <AlertTriangle className="w-7 h-7 text-rose-400" />
            <div>
              <p className="text-sm font-semibold text-rose-200">
                Could not load seats
              </p>
              <p className="text-xs text-rose-300/80 mt-1">{loadError}</p>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 rounded-lg border border-rose-800/70 px-4 py-2 text-xs font-medium text-rose-200 hover:bg-rose-900/40 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}

        {/* Seat map card */}
        {!loading && !loadError && seatMap && (
          <div className="rounded-2xl border border-slate-800 bg-[#0F141F] p-6 sm:p-8">
            <SeatGrid
              seats={seatMap.seats}
              matrix={seatMap.matrix}
              pricingTiers={seatMap.pricingTiers}
              mode="booking"
              selectedSeatIds={selectedSeatIds}
              onSeatClick={handleSeatClick}
              screenLabel={screenLabel}
            />
          </div>
        )}

        {holdError && (
          <div className="mt-4 rounded-lg border border-rose-900/60 bg-rose-950/30 px-4 py-3 text-xs text-rose-200">
            {holdError}
          </div>
        )}
      </div>

      {/* Sticky checkout bar */}
      {!loading && !loadError && seatMap && (
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
                      {formatCurrency(seat.price)}
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
                  {formatCurrency(totals.total)}
                </p>
              </div>

              <button
                type="button"
                disabled={selectedSeatIds.length === 0 || holding}
                onClick={handleClear}
                className="px-3 py-2 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Clear
              </button>

              <button
                type="button"
                disabled={!canCheckout}
                onClick={handleHoldAndCheckout}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-[#0B0E14] hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {holding ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Holding…
                  </>
                ) : (
                  <>
                    Hold Seats & Checkout
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
