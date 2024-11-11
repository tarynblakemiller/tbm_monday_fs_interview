export const seedFragrances = async (client) => {
  console.log("Starting fragrance seeding...");
  const query = `
    INSERT INTO fragrances (
      fragrance_id,
      name,
      description,
      category,
      image_url
    ) VALUES
      (
        'FRAG-001',
        'Vanilla Dreams',
        'A warm and sweet vanilla fragrance with hints of amber and musk',
        'Sweet',
        'https://example.com/images/vanilla-dreams.jpg'
      ),
      (
        'FRAG-002',
        'Ocean Breeze',
        'Fresh aquatic scent with notes of sea salt and coastal flowers',
        'Marine',
        'https://example.com/images/ocean-breeze.jpg'
      ),
      (
        'FRAG-003',
        'Forest Pine',
        'Woody fragrance featuring pine needles and cedar',
        'Woody',
        'https://example.com/images/forest-pine.jpg'
      ),
      (
        'FRAG-004',
        'Lavender Fields',
        'Calming lavender blend with bergamot and chamomile',
        'Floral',
        'https://example.com/images/lavender-fields.jpg'
      ),
      (
        'FRAG-005',
        'Citrus Burst',
        'Energizing blend of lemon, orange, and grapefruit',
        'Citrus',
        'https://example.com/images/citrus-burst.jpg'
      )
    RETURNING id, fragrance_id, name;
  `;

  try {
    const result = await client.query(query);
    console.log("Inserted fragrances:", result.rows);
    return result.rows;
  } catch (err) {
    console.error("Error in seedFragrances:", err);
    throw err;
  }
};
