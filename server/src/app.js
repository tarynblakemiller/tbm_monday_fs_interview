import express from "express";
const app = express();
import {
  configureMiddleware,
  errorHandler,
  notFoundHandler,
} from "./middleware/index.js";
import orderRouter from "./routes/order.routes.js";
import fragranceRouter from "./routes/fragrances.routes.js";
import { validateConnection } from "./middleware/monday.middleware.js";
import healthRouter from "./routes/health.routes.js";

configureMiddleware(app);
app.use(validateConnection);

app.use("/api/orders", orderRouter);
app.use("/api/fragrances", fragranceRouter);
app.get("/health", healthRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    endpoints: {
      root: "/",
      api: "/api",
      orders: "/api/orders/:id",
      fragrances: "/api/fragrances",
    },
  });
});

app.get("/", (req, res) => res.json({ message: "Server is running!" }));

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
