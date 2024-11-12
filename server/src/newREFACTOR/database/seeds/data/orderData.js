// seeds/data/orderData.js

const ORDER_STATUSES = {
  NEW: "NEW",
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

const INSCRIPTIONS = [
  "Happy Birthday Mom!",
  "Congratulations on your graduation!",
  "Welcome to your new home!",
  "Happy Anniversary!",
  "Thank you for being amazing!",
  "Best wishes on your retirement!",
];

const SALES_ASSOCIATES = [
  "John Smith",
  "Sarah Wilson",
  "Michael Chen",
  "Emily Rodriguez",
  "David Kim",
  "Lisa Thompson",
];

const generateOrderId = (index) =>
  `ORD-${Date.now()}-${String(index + 1).padStart(3, "0")}`;
const generateOrderNumber = (index) =>
  `ORD-2024-${String(index + 1).padStart(3, "0")}`;

const generateAddress = () => {
  const streets = [
    "Main St",
    "Oak Ave",
    "Maple Rd",
    "Cedar Ln",
    "Pine Dr",
    "Elm St",
  ];
  const cities = [
    "New York",
    "Chicago",
    "Los Angeles",
    "Houston",
    "Miami",
    "Seattle",
  ];
  const states = ["NY", "IL", "CA", "TX", "FL", "WA"];

  const streetNum = Math.floor(Math.random() * 999) + 1;
  const streetName = streets[Math.floor(Math.random() * streets.length)];
  const aptNum = Math.floor(Math.random() * 20) + 1;
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const zip = Math.floor(Math.random() * 89999) + 10000;

  return `${streetNum} ${streetName}, Apt ${aptNum}, ${city}, ${state} ${zip}`;
};

const generatePhone = () => {
  const areaCode = Math.floor(Math.random() * 800) + 200;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNum = Math.floor(Math.random() * 9000) + 1000;
  return `${areaCode}-${prefix}-${lineNum}`;
};

export const generateOrderData = (count = 10) => {
  const orders = Array.from({ length: count }, (_, index) => ({
    order_id: generateOrderId(index),
    sales_associate:
      SALES_ASSOCIATES[Math.floor(Math.random() * SALES_ASSOCIATES.length)],
    inscription_request:
      INSCRIPTIONS[Math.floor(Math.random() * INSCRIPTIONS.length)],
    order_status: ORDER_STATUSES.NEW,
    order_number: generateOrderNumber(index),
    quantity: Math.floor(Math.random() * 2) + 1, // 1 or 2 boxes
    order_creation_date: new Date().toISOString(),
    client_first_name: `TestClient${index + 1}`,
    client_last_name: `LastName${index + 1}`,
    client_shipping_address: generateAddress(),
    client_email: `client${index + 1}@example.com`,
    client_phone: generatePhone(),
    monday_item_id: null, // To be filled when synced with Monday.com
  }));

  return orders;
};

// For testing specific scenarios
export const generateSpecificOrderData = () => [
  {
    order_id: generateOrderId(0),
    sales_associate: "John Smith",
    inscription_request: "Happy Birthday Mom!",
    order_status: ORDER_STATUSES.NEW,
    order_number: "ORD-2024-001",
    quantity: 2,
    order_creation_date: new Date().toISOString(),
    client_first_name: "Alice",
    client_last_name: "Johnson",
    client_shipping_address: "123 Main St, Apt 4B, New York, NY 10001",
    client_email: "alice.j@email.com",
    client_phone: "212-555-0101",
    monday_item_id: null,
  },
  {
    order_id: generateOrderId(1),
    sales_associate: "Sarah Wilson",
    inscription_request: "Congratulations on your graduation!",
    order_status: ORDER_STATUSES.PROCESSING,
    order_number: "ORD-2024-002",
    quantity: 1,
    order_creation_date: new Date().toISOString(),
    client_first_name: "Michael",
    client_last_name: "Brown",
    client_shipping_address: "456 Oak Ave, Chicago, IL 60601",
    client_email: "mbrown@email.com",
    client_phone: "312-555-0202",
    monday_item_id: null,
  },
];
