import { createClient, fetchExchange } from "urql";

export const mondayClient = createClient({
  url: "https://api.monday.com/v2",
  exchanges: [fetchExchange],
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.MONDAY_API_TOKEN}`,
    },
  },
});
