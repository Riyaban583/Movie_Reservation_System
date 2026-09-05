import request from "supertest";
import app from "../app";
import redis from "../lib/redis";

describe("Reservation API", () => {
  it(
    "POST /api/reservations should reject invalid data",
    async () => {
      const email = `test-${Date.now()}@example.com`;
      const password = "Test@12345";

      await request(app)
        .post("/api/auth/signup")
        .send({
          name: "Test User",
          email,
          password,
        });

      const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
          email,
          password,
        });

      expect(loginResponse.status).toBe(200);

      const token = loginResponse.body.data.token;

      expect(token).toBeDefined();

      const response = await request(app)
        .post("/api/reservations")
        .set("Authorization", `Bearer ${token}`)
        .send({
          showtimeId: "",
          seatIds: [],
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation failed");
    },
    15000
  );

  afterAll(async () => {
    await redis.quit();
  });
});