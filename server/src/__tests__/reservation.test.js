"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const redis_1 = __importDefault(require("../lib/redis"));
describe("Reservation API", () => {
    it("POST /api/reservations should reject invalid data", async () => {
        const email = `test-${Date.now()}@example.com`;
        const password = "Test@12345";
        await (0, supertest_1.default)(app_1.default)
            .post("/api/auth/signup")
            .send({
            name: "Test User",
            email,
            password,
        });
        const loginResponse = await (0, supertest_1.default)(app_1.default)
            .post("/api/auth/login")
            .send({
            email,
            password,
        });
        expect(loginResponse.status).toBe(200);
        const token = loginResponse.body.data.token;
        expect(token).toBeDefined();
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/api/reservations")
            .set("Authorization", `Bearer ${token}`)
            .send({
            showtimeId: "",
            seatIds: [],
        });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Validation failed");
    }, 15000);
    afterAll(async () => {
        await redis_1.default.quit();
    });
});
//# sourceMappingURL=reservation.test.js.map