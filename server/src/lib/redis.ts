import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (error) => {
  console.error("❌ Redis error:", error);
});

export async function testRedis() {
  await redis.set("movie-reservation:test", "redis-working");

  const value = await redis.get("movie-reservation:test");

  console.log("Redis test value:", value);
}


export default redis;