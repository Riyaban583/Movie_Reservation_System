"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const redis_1 = __importDefault(require("../lib/redis"));
describe("Movies API", () => {
    it("GET /api/movies should return movies", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/api/movies");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success");
        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);
    }, 15000);
    afterAll(async () => {
        await redis_1.default.quit();
    });
});
//# sourceMappingURL=movies.test.js.map