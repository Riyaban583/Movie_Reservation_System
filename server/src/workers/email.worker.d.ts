import { Worker } from "bullmq";
declare const emailWorker: Worker<any, any, string, import("bullmq").RedisQueueBackend, import("bullmq").JobProgress>;
export default emailWorker;
//# sourceMappingURL=email.worker.d.ts.map