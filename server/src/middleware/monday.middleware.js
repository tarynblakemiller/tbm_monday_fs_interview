import { mondayClient } from "../../index.js";

export const validateConnection = async (req, res, next) => {
  try {
    const query = `query { me { name } }`;
    await mondayClient.api(query);
    console.log("Monday.com connection was successful");
    next();
  } catch (error) {
    console.error("Monday.com connection validation failed:", error);
    res.status(500).json({
      error: "Failed to validate Monday.com connection",
      details: error.message,
    });
  }
};
