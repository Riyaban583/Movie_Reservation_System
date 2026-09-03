"use client";

import { useEffect, useState } from "react";

interface ReservationSeat {
  id: string;
  seatId: string;
  showtimeId: string;
}

interface Reservation {
  id: string;
  userId: string;
  showtimeId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  seats: ReservationSeat[];
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Admin login required");
        }

        const response = await fetch(
          "http://localhost:5000/api/reservations/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch reservations"
          );
        }

        setReservations(result.data);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm text-zinc-400">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Reservations
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage all customer reservations.
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            Loading reservations...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-zinc-800 bg-zinc-950">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Reservation ID
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      User ID
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Showtime ID
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Seats
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {reservations.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-zinc-400"
                      >
                        No reservations found.
                      </td>
                    </tr>
                  ) : (
                    reservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="border-b border-zinc-800 last:border-0"
                      >
                        <td className="px-6 py-4 font-medium">
                          {reservation.id}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {reservation.userId}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {reservation.showtimeId}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {reservation.seats.length}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium">
                            {reservation.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {new Date(
                            reservation.createdAt
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}