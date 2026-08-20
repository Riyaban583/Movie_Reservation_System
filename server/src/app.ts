import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import movieRoutes from "./routes/movie.routes";
import theaterRoutes from "./routes/theater.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theaters", theaterRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🎬 Movie Reservation API is running...",
  });
});

export default app;