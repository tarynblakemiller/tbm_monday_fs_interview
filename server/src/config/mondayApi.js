import axios from "axios";

const MONDAY_API_URL = "https://api.monday.com/v2";
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;

const mondayApiClient = axios.create({
  baseURL: MONDAY_API_URL,
  headers: {
    // Authorization: `Bearer ${MONDAY_API_TOKEN}`,
    Authorization: `${MONDAY_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default mondayApiClient;
