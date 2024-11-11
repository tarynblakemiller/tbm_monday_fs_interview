import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    endpoints: {
      api: "/api",
      fragrances: "/api/fragrances",
      orders: "/api/orders",
    },
  });
});

export default router;
