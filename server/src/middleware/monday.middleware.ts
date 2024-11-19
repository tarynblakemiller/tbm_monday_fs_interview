import { Request, Response, NextFunction } from "express";
import { Client } from "urql";
import mondayClient from "@/services/monday/client";

interface MondayApiResponse {
  data: {
    me: {
      name: string;
    };
  };
}

export const validateConnection = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = `query { me { name } }`;
    const response = await (mondayClient as Client)
      .query<MondayApiResponse>(query, {})
      .toPromise();

    if (response.error) {
      throw new Error(response.error.message);
    }

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
