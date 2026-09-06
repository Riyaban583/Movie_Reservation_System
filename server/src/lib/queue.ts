import { Queue } from "bullmq";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const emailQueue = new Queue("emailQueue", {
  connection: {
    url: redisUrl,
  },
});

export async function addTestEmailJob() {
  await emailQueue.add("test-email", {
    to: "riya@gmail.com",
    subject: "Test Email Job",
    message: "BullMQ is working",
  });
}

addTestEmailJob();