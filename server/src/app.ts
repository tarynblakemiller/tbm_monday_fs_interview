import express, { Application, Request, Response } from "express";
import {
  configureMiddleware,
  errorHandler,
  notFoundHandler,
} from "./middleware/index.ts";
import orderRouter from "./routes/order.routes.ts";
import fragranceRouter from "./routes/fragrances.routes.ts";
import { validateConnection } from "./middleware/monday.middleware.ts";
import createHealthRouter from "./routes/health.routes.ts";
import { mondayService } from "./services/monday.service.ts";

const app: Application = express();

configureMiddleware(app);
app.use(validateConnection);

app.use("/api/orders", orderRouter);
app.use("/api/fragrances", fragranceRouter);
app.use("/health", createHealthRouter(mondayService));

app.get("/", (_req: Request, res: Response) => {
  return res.json({ message: "Server is running!" });
});

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
