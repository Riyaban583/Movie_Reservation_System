import { Worker } from "bullmq";
import transporter from "../lib/mailer";

const connection = {
  host: "localhost",
  port: 6379,
};

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    console.log("📩 Processing email job:", job.name);
    console.log("Job data:", job.data);

    if (job.name === "booking-confirmation") {
      const { reservationId, showtimeId, seatIds } = job.data;

      await transporter.sendMail({
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