import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import movieRoutes from "./routes/movie.routes";
import theaterRoutes from "./routes/theater.routes";
import screenRoutes from "./routes/screen.routes";
import showtimeRoutes from "./routes/showtime.routes";
import reservationRoutes from "./routes/reservation.routes";
import { errorHandler } from "./middlewares/error.middleware";
import dashboardRoutes from "./routes/dashboard.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import redis from "./lib/redis";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/screens", screenRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🎬 Movie Reservation API is running...",
  });
});

export default app;