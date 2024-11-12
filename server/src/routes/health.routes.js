import { Router } from "express";

const createHealthRouter = (mondayClient) => {
  const router = Router();

  router.get("/", async (_req, res) => {
    const health = await mondayClient.checkHealth();

    res.json({
      status: "success",
      data: {
        status: health.status,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || "1.0.0",
        services: {
          api: "healthy",
          monday: health,
        },
      },
    });
  });

  return router;
};

export default createHealthRouter;
