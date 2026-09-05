import request from "supertest";
import app from "../app";
import redis from "../lib/redis";

describe("Movies API", () => {
  it(
    "GET /api/movies should return movies",
    async () => {
      const response = await request(app).get("/api/movies");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success");
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
    },
    15000
  );

  afterAll(async () => {
    await redis.quit();
  });
});