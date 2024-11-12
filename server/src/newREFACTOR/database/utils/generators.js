export const generateOrderId = (index) =>
  `ORD-${Date.now()}-${String(index).padStart(3, "0")}`;

export const generateFragranceId = (index) =>
  `FRAG-${String(index).padStart(3, "0")}`;
