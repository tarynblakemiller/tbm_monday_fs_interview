import { Router, Request, Response } from "express";
import type { MondayService } from "../services/monday.service";

const createHealthRouter = (mondayService: MondayService): Router => {
  const router: Router = Router();

  router.get("/", async (_req: Request, res: Response) => {
    try {
      await mondayService.getBoardItems("7730832838");
      console.log("HEALTH ROUTE HIT");

      res.json({
        status: "success",
        data: {
          timestamp: new Date().toISOString(),
          version: process.env.npm_package_version || "1.0.0",
          services: {
            api: "healthy",
            monday: { status: "healthy" },
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Monday service unhealthy",
      });
    }
  });

  return router;
};

export default createHealthRouter;
