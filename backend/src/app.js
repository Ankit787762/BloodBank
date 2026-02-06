import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import userRouter from "./routes/user.routes.js";
import requestRouter from "./routes/request.routes.js";
import stockRoutes from "./routes/stock.routes.js";

const app = express();

/* ========================
   🌍 CORS CONFIG
======================== */
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // allow cookies / auth headers
  })
);

/* ========================
   🧠 BODY PARSERS
======================== */
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

/* ========================
   🛣️ ROUTES
======================== */
app.use("/api/v1/users", userRouter);
app.use("/api/v1/request", requestRouter);

app.use("/api/stock", stockRoutes);

/* ========================
   ❌ GLOBAL ERROR HANDLER
======================== */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("🔥 ERROR:", err);

  res.status(statusCode).json({
    success: false,
    message,
  });
});

export { app };
