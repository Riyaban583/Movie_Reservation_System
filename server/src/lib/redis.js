"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRedis = testRedis;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default(process.env.REDIS_URL);
redis.on("connect", () => {
    console.log("✅ Redis connected");
});
redis.on("error", (error) => {
    console.error("❌ Redis error:", error);
});
async function testRedis() {
    await redis.set("movie-reservation:test", "redis-working");
    const value = await redis.get("movie-reservation:test");
    console.log("Redis test value:", value);
}
exports.default = redis;
//# sourceMappingURL=redis.js.map