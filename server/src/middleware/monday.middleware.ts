import { Request, Response, NextFunction } from "express";
import { mondayClient } from "../../index";

interface MondayApiResponse {
  me: {
    name: string;
  };
}

export const validateConnection = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = "query { me { name } }";
    await mondayClient.api<MondayApiResponse>(query);
    console.log("Monday.com connection was successful");
    next();
  } catch (error) {
    console.error("Monday.com connection validation failed:", error);
    res.status(500).json({
      error: "Failed to validate Monday.com connection",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
