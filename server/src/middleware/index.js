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
