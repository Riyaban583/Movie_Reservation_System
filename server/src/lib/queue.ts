import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

export const emailQueue = new Queue("emailQueue", {
  connection,
});

export async function addTestEmailJob() {
  await emailQueue.add("test-email", {
    to: "riya@gmail.com",
    subject: "Test Email Job",
    message: "BullMQ is working",
  });
}

addTestEmailJob();