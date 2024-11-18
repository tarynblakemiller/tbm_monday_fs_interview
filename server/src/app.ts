import express, { Application, Request, Response } from "express";
import {
  configureMiddleware,
  errorHandler,
  notFoundHandler,
} from "./middleware/index.ts";
import orderRouter from "./routes/order.routes.js";
import fragranceRouter from "./routes/fragrances.routes.js";
import { validateConnection } from "./middleware/monday.middleware.js";
import healthRouter from "./routes/health.routes.js";

const app: Application = express();

configureMiddleware(app);
app.use(validateConnection);

app.use("/api/orders", orderRouter);
app.use("/api/fragrances", fragranceRouter);
app.use("/health", healthRouter);

// Fix the route handler typing
app.get("/", (_req: Request, res: Response) => {
  return res.json({ message: "Server is running!" });
});

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
