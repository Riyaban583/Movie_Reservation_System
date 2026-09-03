"use client";

import { useEffect, useState } from "react";

interface Showtime {
  id: string;
  movieId: string;
  screenId: string;
  startTime: string;
  endTime: string;
}

export default function ShowtimesPage() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/showtimes"
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch showtimes"
          );
        }

        setShowtimes(result.data);
      } catch (error: any) {
        setError(
          error.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm text-zinc-400">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Showtimes
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage movie show schedules.
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            Loading showtimes...
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
                      Movie ID
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Screen ID
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Start Time
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      End Time
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {showtimes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-zinc-400"
                      >
                        No showtimes found.
                      </td>
                    </tr>
                  ) : (
                    showtimes.map((showtime) => (
                      <tr
                        key={showtime.id}
                        className="border-b border-zinc-800 last:border-0"
                      >
                        <td className="px-6 py-4 text-zinc-300">
                          {showtime.movieId}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {showtime.screenId}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {new Date(
                            showtime.startTime
                          ).toLocaleString()}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {new Date(
                            showtime.endTime
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