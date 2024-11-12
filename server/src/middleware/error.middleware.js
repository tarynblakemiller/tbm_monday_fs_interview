export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  res.status(status).json({
    status: "error",
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

export const notFoundHandler = (_req, res) => {
  res.status(404).json({
    status: "error",
    error: {
      message: "Resource not found",
      availableEndpoints: {
        root: "/",
        health: "/health",
        api: "/api",
        fragrances: "/api/fragrances",
        orders: "/api/orders",
      },
    },
  });
};
