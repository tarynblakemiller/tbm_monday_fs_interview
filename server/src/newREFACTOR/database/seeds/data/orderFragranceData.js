export const createOrderFragranceRelations = (orders, fragrances) => {
  const DEFAULT_PRICE = 29.99;

  return orders
    .map((order) => {
      // Select 3 random fragrances for each order
      const selectedFragrances = fragrances
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      return selectedFragrances.map((fragrance) => ({
        order_id: order.id,
        fragrance_id: fragrance.id,
        quantity: 1,
        price_at_time: DEFAULT_PRICE,
        created_at: new Date(),
        updated_at: new Date(),
      }));
    })
    .flat();
};
