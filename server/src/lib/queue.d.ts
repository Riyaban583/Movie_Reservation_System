import { Queue } from "bullmq";
export declare const emailQueue: Queue<any, any, string, any, any, string, import("bullmq").RedisQueueBackend>;
export declare function addTestEmailJob(): Promise<void>;
//# sourceMappingURL=queue.d.ts.map