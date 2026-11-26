export function calculateOrderTotals(seats = [], options = {}) {
  const {
    imaxSurchargePerTicket = 1.0,
    serviceFeePerTicket = 0.2,
    taxRate = 0.0825,
  } = options;

  const subtotal = seats.reduce(
    (sum, seat) => sum + Number(seat.price || 0),
    0,
  );
  const imaxSurcharge = seats.length * imaxSurchargePerTicket;
  const serviceFee = seats.length * serviceFeePerTicket;
  const preTaxAmount = subtotal + imaxSurcharge + serviceFee;
  const tax = Number((preTaxAmount * taxRate).toFixed(2));
  const total = Number((preTaxAmount + tax).toFixed(2));

  return {
    ticketCount: seats.length,
    subtotal: Number(subtotal.toFixed(2)),
    imaxSurcharge: Number(imaxSurcharge.toFixed(2)),
    serviceFee: Number(serviceFee.toFixed(2)),
    tax,
    total,
  };
}
