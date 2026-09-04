"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Reservation {
  id: string;
  status: string;
  expiresAt?: string;
  createdAt: string;
  showtimeId: string;
  seats: {
    id: string;
    seatId: string;
  }[];
}

export default function BookingsPage() {
  const router = useRouter();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/reservations/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch bookings"
          );
        }

        setReservations(result.data || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unable to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-950/50 text-green-400 border-green-900";

      case "HELD":
        return "bg-yellow-950/50 text-yellow-400 border-yellow-900";

      case "CANCELLED":
        return "bg-red-950/50 text-red-400 border-red-900";

      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Movie Reservation
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              My Bookings
            </h1>

            <p className="mt-2 text-zinc-400">
              View your reservation history and booking status.
            </p>
          </div>

          <button
            onClick={() => router.push("/movies")}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-zinc-200"
          >
            Browse Movies
          </button>
        </div>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-zinc-400">
              Loading bookings...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && reservations.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No bookings yet
            </h2>

            <p className="mt-2 text-zinc-400">
              Your reservations will appear here after booking.
            </p>

            <button
              onClick={() => router.push("/movies")}
              className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200"
            >
              Explore Movies
            </button>
          </div>
        )}

        {!loading && !error && reservations.length > 0 && (
          <div className="grid gap-5">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                      Reservation
                    </p>

                    <p className="mt-2 break-all font-mono text-sm text-zinc-300">
                      {reservation.id}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-4 py-2 text-xs font-semibold ${getStatusClass(
                      reservation.status
                    )}`}
                  >
                    {reservation.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-sm text-zinc-500">
                      Showtime
                    </p>

                    <p className="mt-2 break-all text-sm font-medium text-white">
                      {reservation.showtimeId}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-sm text-zinc-500">
                      Seats
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                      {reservation.seats.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-sm text-zinc-500">
                      Booked On
                    </p>

                    <p className="mt-2 text-sm font-medium text-white">
                      {new Date(
                        reservation.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-zinc-500">
                    Seat IDs
                  </p>

                  <p className="mt-2 break-all text-sm text-zinc-300">
                    {reservation.seats.length > 0
                      ? reservation.seats
                          .map((seat) => seat.seatId)
                          .join(", ")
                      : "No seats"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}