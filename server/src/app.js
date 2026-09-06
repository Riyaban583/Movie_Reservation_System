"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const movie_routes_1 = __importDefault(require("./routes/movie.routes"));
const theater_routes_1 = __importDefault(require("./routes/theater.routes"));
const screen_routes_1 = __importDefault(require("./routes/screen.routes"));
const showtime_routes_1 = __importDefault(require("./routes/showtime.routes"));
const reservation_routes_1 = __importDefault(require("./routes/reservation.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const redis_1 = __importDefault(require("./lib/redis"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});
const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.PRODUCTION_CLIENT_URL,
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use("/api", apiLimiter);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/movies", movie_routes_1.default);
app.use("/api/theaters", theater_routes_1.default);
app.use("/api/screens", screen_routes_1.default);
app.use("/api/showtimes", showtime_routes_1.default);
app.use("/api/reservations", reservation_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use(error_middleware_1.errorHandler);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🎬 Movie Reservation API is running...",
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map