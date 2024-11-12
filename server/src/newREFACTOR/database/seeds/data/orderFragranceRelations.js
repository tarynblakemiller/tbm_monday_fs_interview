const generateRandomPrice = () => {
  const basePrice = 30.0; // Base price for a candle
  const variance = 10.0; // Price can vary by up to $10
  return +(basePrice + Math.random() * variance).toFixed(2);
};

export const createOrderFragranceRelations = (orders, fragrances) => {
  if (!orders?.length || !fragrances?.length) {
    throw new Error("Both orders and fragrances arrays must not be empty");
  }

  const relations = [];
  const fragrancesCount = fragrances.length;

  orders.forEach((order) => {
    const selectedIndexes = new Set();
    while (selectedIndexes.size < 3) {
      selectedIndexes.add(Math.floor(Math.random() * fragrancesCount));
    }

    [...selectedIndexes].forEach((index) => {
      relations.push({
        order_id: order.id,
        fragrance_id: fragrances[index].id,
        quantity: 1,
        price_at_time: generateRandomPrice(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });
  });

  return relations;
};

// For testing specific scenarios
export const createSpecificOrderFragranceRelations = (orders, fragrances) => {
  if (!orders?.length || !fragrances?.length) {
    throw new Error("Both orders and fragrances arrays must not be empty");
  }

  return [
    {
      order_id: orders[0].id,
      fragrance_id: fragrances[0].id,
      quantity: 1,
      price_at_time: 35.99,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: orders[0].id,
      fragrance_id: fragrances[1].id,
      quantity: 1,
      price_at_time: 32.99,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: orders[0].id,
      fragrance_id: fragrances[2].id,
      quantity: 1,
      price_at_time: 33.99,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    // Second order gets different three fragrances
    {
      order_id: orders[1].id,
      fragrance_id: fragrances[3].id,
      quantity: 1,
      price_at_time: 34.99,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: orders[1].id,
      fragrance_id: fragrances[4].id,
      quantity: 1,
      price_at_time: 31.99,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: orders[1].id,
      fragrance_id: fragrances[0].id,
      quantity: 1,
      price_at_time: 35.99,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
};

export const validateOrderFragranceRelations = (relations) => {
  const orderCounts = new Map();

  for (const relation of relations) {
    const count = orderCounts.get(relation.order_id) || 0;
    if (count >= 3) {
      throw new Error(`Order ${relation.order_id} has more than 3 fragrances`);
    }
    orderCounts.set(relation.order_id, count + 1);
  }

  for (const [orderId, count] of orderCounts.entries()) {
    if (count !== 3) {
      throw new Error(
        `Order ${orderId} has ${count} fragrances instead of required 3`
      );
    }
  }

  return true;
};
