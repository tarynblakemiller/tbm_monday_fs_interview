export const validateOrderFragrances = (orderFragrances) => {
  const orderCounts = new Map();

  for (const relation of orderFragrances) {
    const count = orderCounts.get(relation.order_id) || 0;
    orderCounts.set(relation.order_id, count + 1);

    if (count >= 3) {
      throw new Error(
        `Order ${relation.order_id} exceeds maximum of 3 fragrances`
      );
    }
  }

  for (const [orderId, count] of orderCounts) {
    if (count !== 3) {
      throw new Error(
        `Order ${orderId} has ${count} fragrances, requires exactly 3`
      );
    }
  }

  return true;
};
