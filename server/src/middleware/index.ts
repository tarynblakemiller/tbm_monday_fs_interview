import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { env } from "@/config/database/config";

interface Environment {
  CLIENT_URL: string;
}

interface AppError extends Error {
  status?: number;
  stack?: string;
}

export const configureMiddleware = (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((_req: Request, res: Response, next: NextFunction): void => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  });

  app.use(
    cors({
      origin: env.CLIENT_URL || "http://localhost:5173",
    })
  );
};

export const configureSecurityMiddleware = (app: Application): void => {
  app.use((_req: Request, res: Response, next: NextFunction): void => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    next();
  });
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({
    error: "Not Found",
    availableEndpoints: {
      root: "/",
      health: "/health",
      api: "/api",
      fragrances: "/api/fragrances",
      orders: "/api/orders",
    },
  });
};
