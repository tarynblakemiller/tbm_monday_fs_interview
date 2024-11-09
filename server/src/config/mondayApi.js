import axios from "axios";

const MONDAY_API_URL = "https://api.monday.com/v2";
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;
const MONDAY_BOARD_ID = 7730832838;

export const MONDAY_GROUPS = {
  REQUESTS: "topics",
  WORKING: "group_title",
  DONE: "new_group",
};

export const MONDAY_STATUS = {
  NEW: "New Order",
  WORKING: "Working on it",
  DONE: "Done",
  STUCK: "Stuck",
};

const mondayApiClient = axios.create({
  baseURL: MONDAY_API_URL,
  headers: {
    Authorization: MONDAY_API_TOKEN,
    "Content-Type": "application/json",
  },
});

export { mondayApiClient, MONDAY_BOARD_ID };
