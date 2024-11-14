import express from "express";
import cors from "cors";
import { env } from "../config/environment.js";
import { validateConnection } from "./monday.middleware.js";
import { mondayClient } from "../../index.js";

export const configureMiddleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
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
export const configureSecurityMiddleware = (app) => {
  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net",
        "style-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net",
        "img-src 'self' data: https: http:",
        "font-src 'self' https://unpkg.com https://cdn.jsdelivr.net",
        "connect-src 'self' https://api.monday.com wss: https://unpkg.com https://cdn.jsdelivr.net",
        "worker-src 'self' blob:",
        "frame-src 'self'",
        "object-src 'none'",
      ].join("; ")
    );

    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");

    next();
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
};

export const notFoundHandler = (req, res) => {
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
