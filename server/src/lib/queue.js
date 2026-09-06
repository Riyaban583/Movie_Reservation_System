"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = void 0;
exports.addTestEmailJob = addTestEmailJob;
const bullmq_1 = require("bullmq");
const connection = {
    host: "localhost",
    port: 6379,
};
exports.emailQueue = new bullmq_1.Queue("emailQueue", {
    connection,
});
async function addTestEmailJob() {
    await exports.emailQueue.add("test-email", {
        to: "riya@gmail.com",
        subject: "Test Email Job",
        message: "BullMQ is working",
    });
}
addTestEmailJob();
//# sourceMappingURL=queue.js.map