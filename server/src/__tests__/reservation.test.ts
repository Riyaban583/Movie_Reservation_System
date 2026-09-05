import request from "supertest";
import app from "../app";

describe("Reservation API", () => {
  it(
    "POST /api/reservations should reject invalid data",
    async () => {
      const response = await request(app)
        .post("/api/reservations")
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
});