import { Worker } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    console.log("📩 Processing email job:", job.name);
    console.log("Job data:", job.data);
  },
  {
    connection,
  }
);

emailWorker.on("completed", (job) => {
  console.log(`✅ Job completed: ${job.id}`);
});

emailWorker.on("failed", (job, error) => {
  console.error(`❌ Job failed: ${job?.id}`, error);
});

export default emailWorker;