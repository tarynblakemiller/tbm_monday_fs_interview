export const FRAGRANCE_CATEGORIES = [
  { value: 1, label: "Smokey" },
  { value: 2, label: "Fruity" },
  { value: 3, label: "Fresh" },
  { value: 4, label: "Floral" },
  { value: 5, label: "Herbaceous" },
  { value: 6, label: "Citrus" },
  { value: 8, label: "Woody" },
];

export const DEFAULT_FRAGRANCES = [
  {
    id: "frag-001",
    fragrance_id: "FRGL001",
    name: "Ocean Breeze",
    description:
      "A fresh and invigorating blend of sea salt, citrus, and woody notes that captures the essence of a peaceful day by the ocean. Features top notes of bergamot and marine accord, heart notes of lavender and jasmine, and base notes of driftwood and musk.",
    category: "Fresh",
    image_url: "https://example.com/images/ocean-breeze.jpg",
    created_at: "2024-01-15T08:00:00.000Z",
    updated_at: "2024-01-15T08:00:00.000Z",
  },
  {
    id: "frag-002",
    fragrance_id: "FRGL002",
    name: "Vanilla Dreams",
    description:
      "A warm and comforting fragrance that combines Madagascar vanilla with subtle notes of praline and amber. This gourmand scent features sweet undertones of caramel and a hint of tonka bean for a truly delectable experience.",
    category: "Sweet",
    image_url: "https://example.com/images/vanilla-dreams.jpg",
    created_at: "2024-01-16T09:30:00.000Z",
    updated_at: "2024-01-16T09:30:00.000Z",
  },
  {
    id: "frag-003",
    fragrance_id: "FRGL003",
    name: "Forest Whispers",
    description:
      "An enchanting woodland blend featuring pine needles, cedar, and wild mushrooms. This earthy fragrance captures the essence of a morning walk through a misty forest, with subtle hints of moss and fallen rain.",
    category: "Woody",
    image_url: "https://example.com/images/forest-whispers.jpg",
    created_at: "2024-01-17T10:45:00.000Z",
    updated_at: "2024-01-17T10:45:00.000Z",
  },
  {
    id: "frag-004",
    fragrance_id: "FRGL004",
    name: "Midnight Rose",
    description:
      "A sophisticated floral fragrance centered around Damascus rose, with supporting notes of peony and white musk. The addition of black pepper adds an unexpected spicy twist to this elegant blend.",
    category: "Floral",
    image_url: "https://example.com/images/midnight-rose.jpg",
    created_at: "2024-01-18T11:15:00.000Z",
    updated_at: "2024-01-18T11:15:00.000Z",
  },
  {
    id: "frag-005",
    fragrance_id: "FRGL005",
    name: "Spice Market",
    description:
      "An exotic journey through ancient spice routes, featuring cardamom, saffron, and cinnamon. This warm and spicy fragrance is enriched with notes of vanilla and amber for a rich, lasting impression.",
    category: "Spicy",
    image_url: "https://example.com/images/spice-market.jpg",
    created_at: "2024-01-19T12:20:00.000Z",
    updated_at: "2024-01-19T12:20:00.000Z",
  },
  {
    id: "frag-006",
    fragrance_id: "FRGL006",
    name: "Citrus Symphony",
    description:
      "A vibrant blend of Mediterranean citrus fruits including bergamot, lemon, and mandarin orange. Enhanced with subtle floral notes and a light musk base for a refreshing and uplifting experience.",
    category: "Fresh",
    image_url: "https://example.com/images/citrus-symphony.jpg",
    created_at: "2024-01-20T13:40:00.000Z",
    updated_at: "2024-01-20T13:40:00.000Z",
  },
].map((fragrance) => ({
  ...fragrance,
  created_at: new Date(),
  updated_at: new Date(),
}));
