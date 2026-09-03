"use client";

import { useEffect, useState } from "react";
import socket from "./socket";

interface DashboardSummary {
  totalMovies: number;
  totalTheaters: number;
  totalScreens: number;
  totalShowtimes: number;
  totalReservations: number;
}

interface OccupancySummary {
  totalCapacity: number;
  bookedSeats: number;
  availableSeats: number;
  occupancyPercentage: number;
}

interface BookingTrend {
  date: string;
  bookings: number;
}

export default function Home() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [occupancy, setOccupancy] = useState<OccupancySummary | null>(null);
  const [bookingTrends, setBookingTrends] = useState<BookingTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Socket client loaded");

    socket.on("seatAvailabilityUpdated", (data) => {
      console.log("🔄 Seat availability updated:", data);
    });

    socket.on("reservationStatusUpdated", (data) => {
      console.log("📢 Reservation status updated:", data);
    });

    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Admin login required");
          setLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [summaryResponse, occupancyResponse, trendsResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/dashboard/summary", {
              headers,
            }),
            fetch("http://localhost:5000/api/dashboard/occupancy", {
              headers,
            }),
            fetch("http://localhost:5000/api/dashboard/booking-trends", {
              headers,
            }),
          ]);

        const summaryResult = await summaryResponse.json();
        const occupancyResult = await occupancyResponse.json();
        const trendsResult = await trendsResponse.json();

        if (!summaryResponse.ok) {
          throw new Error(
            summaryResult.message || "Failed to fetch dashboard summary"
          );
        }

        if (!occupancyResponse.ok) {
          throw new Error(
            occupancyResult.message || "Failed to fetch occupancy data"
          );
        }

        if (!trendsResponse.ok) {
          throw new Error(
            trendsResult.message || "Failed to fetch booking trends"
          );
        }

        setSummary(summaryResult.data);
        setOccupancy(occupancyResult.data);
        setBookingTrends(trendsResult.data);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    return () => {
      socket.off("seatAvailabilityUpdated");
      socket.off("reservationStatusUpdated");
      socket.disconnect();
    };
  }, []);

  const cards = summary
    ? [
        {
          title: "Total Movies",
          value: summary.totalMovies,
        },
        {
          title: "Total Theaters",
          value: summary.totalTheaters,
        },
        {
          title: "Total Screens",
          value: summary.totalScreens,
        },
        {
          title: "Total Showtimes",
          value: summary.totalShowtimes,
        },
        {
          title: "Total Reservations",
          value: summary.totalReservations,
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-zinc-400">
            Movie Reservation System
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-zinc-400">
            Overview of movies, theaters, screens, shows and reservations.
          </p>
        </div>

        <nav className="mb-8 flex flex-wrap gap-3">
  <a
    href="/"
    className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
  >
    Dashboard
  </a>

  <a
    href="/admin/movies"
    className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
  >
    Movies
  </a>

  <a
    href="/admin/theaters"
    className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
  >
    Theaters
  </a>

  <a
    href="/admin/screens"
    className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
  >
    Screens
  </a>

  <a
    href="/admin/showtimes"
    className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
  >
    Showtimes
  </a>

  <a
    href="/admin/reservations"
    className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
  >
    Reservations
  </a>
</nav>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-zinc-400">Loading dashboard...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <p className="font-medium text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && summary && occupancy && (
          <>
            {/* Summary Cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
                >
                  <p className="text-sm font-medium text-zinc-400">
                    {card.title}
                  </p>

                  <p className="mt-4 text-4xl font-bold">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Occupancy */}
            <section className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">
                Occupancy Analytics
              </h2>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <p className="text-sm text-zinc-400">
                    Total Capacity
                  </p>

                  <p className="mt-3 text-3xl font-bold">
                    {occupancy.totalCapacity}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <p className="text-sm text-zinc-400">
                    Booked Seats
                  </p>

                  <p className="mt-3 text-3xl font-bold">
                    {occupancy.bookedSeats}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <p className="text-sm text-zinc-400">
                    Available Seats
                  </p>

                  <p className="mt-3 text-3xl font-bold">
                    {occupancy.availableSeats}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <p className="text-sm text-zinc-400">
                    Occupancy
                  </p>

                  <p className="mt-3 text-3xl font-bold">
                    {occupancy.occupancyPercentage}%
                  </p>
                </div>
              </div>
            </section>

            {/* Booking Trends */}
            <section className="mt-8">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold">
                    Booking Trends
                  </h2>

                  <p className="mt-1 text-sm text-zinc-400">
                    Date-wise reservation summary.
                  </p>
                </div>

                {bookingTrends.length === 0 ? (
                  <p className="py-6 text-center text-zinc-400">
                    No booking trend data available.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b border-zinc-800">
                        <tr>
                          <th className="px-4 py-3 text-sm font-semibold">
                            Date
                          </th>

                          <th className="px-4 py-3 text-sm font-semibold">
                            Bookings
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {bookingTrends.map((trend) => (
                          <tr
                            key={trend.date}
                            className="border-b border-zinc-800 last:border-0"
                          >
                            <td className="px-4 py-3 text-zinc-300">
                              {trend.date}
                            </td>

                            <td className="px-4 py-3 font-medium">
                              {trend.bookings}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}