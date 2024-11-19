import { createClient, fetchExchange, Client } from "urql";

if (!process.env.MONDAY_API_TOKEN) {
  throw new Error("MONDAY_API_TOKEN is required");
}

const mondayClient: Client = createClient({
  url: process.env.MONDAY_API_URL || "https://api.monday.com/v2",
  exchanges: [fetchExchange],
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.MONDAY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  },
});

export default mondayClient;
