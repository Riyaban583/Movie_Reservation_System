"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const mailer_1 = __importDefault(require("../lib/mailer"));
const connection = {
    host: "localhost",
    port: 6379,
};
const emailWorker = new bullmq_1.Worker("emailQueue", async (job) => {
    console.log("📩 Processing email job:", job.name);
    console.log("Job data:", job.data);
    if (job.name === "booking-confirmation") {
        const { reservationId, showtimeId, seatIds } = job.data;
        await mailer_1.default.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Booking Confirmation",
            text: `Your booking is confirmed.

Reservation ID: ${reservationId}
Showtime ID: ${showtimeId}
Seats: ${seatIds.join(", ")}`,
        });
        console.log("✅ Booking confirmation email sent");
    }
}, {
    connection,
});
emailWorker.on("completed", (job) => {
    console.log(`✅ Job completed: ${job.id}`);
});
emailWorker.on("failed", (job, error) => {
    console.error(`❌ Job failed: ${job?.id}`, error);
});
exports.default = emailWorker;
//# sourceMappingURL=email.worker.js.map