import { env } from "../environment.js";

export const createMondayConfig = () => {
  const { MONDAY_API_TOKEN, MONDAY_BOARD_ID, MONDAY_API_URL } = env.MONDAY;

  if (!MONDAY_API_TOKEN) {
    throw new Error("MONDAY_API_TOKEN is required");
  }

  if (!MONDAY_BOARD_ID) {
    throw new Error("MONDAY_BOARD_ID is required");
  }

  return {
    apiToken: MONDAY_API_TOKEN,
    boardId: MONDAY_BOARD_ID,
    baseUrl: MONDAY_API_URL || "https://api.monday.com/v2",
  };
};
