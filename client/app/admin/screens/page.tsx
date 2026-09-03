"use client";

import { useEffect, useState } from "react";

interface Seat {
  id: string;
  seatNumber: string;
}

interface Theater {
  id: string;
  name: string;
  location: string;
  city: string;
}

interface Screen {
  id: string;
  name: string;
  theaterId: string;
  theater: Theater;
  seats: Seat[];
}

export default function ScreensPage() {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Admin login required");
        }

        const response = await fetch(
          "http://localhost:5000/api/screens",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch screens"
          );
        }

        setScreens(result.data);
      } catch (error: any) {
        setError(
          error.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScreens();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm text-zinc-400">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Screens
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage theater screens and their seats.
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            Loading screens...
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
                      Screen
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Theater
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Location
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      City
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Seats
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {screens.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-zinc-400"
                      >
                        No screens found.
                      </td>
                    </tr>
                  ) : (
                    screens.map((screen) => (
                      <tr
                        key={screen.id}
                        className="border-b border-zinc-800 last:border-0"
                      >
                        <td className="px-6 py-4 font-medium">
                          {screen.name}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {screen.theater.name}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {screen.theater.location}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {screen.theater.city}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {screen.seats.length}
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