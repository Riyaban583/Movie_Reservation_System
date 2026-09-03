"use client";

import { useEffect, useState } from "react";

interface Theater {
  id: string;
  name: string;
  location: string;
  city: string;
  screens: number;
}

export default function TheatersPage() {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/theaters"
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch theaters"
          );
        }

        setTheaters(result.data);
      } catch (error: any) {
        setError(
          error.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm text-zinc-400">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Theaters
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage theaters in the reservation system.
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            Loading theaters...
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
                      Name
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Location
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      City
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Screens
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {theaters.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-zinc-400"
                      >
                        No theaters found.
                      </td>
                    </tr>
                  ) : (
                    theaters.map((theater) => (
                      <tr
                        key={theater.id}
                        className="border-b border-zinc-800 last:border-0"
                      >
                        <td className="px-6 py-4 font-medium">
                          {theater.name}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {theater.location}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {theater.city}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {theater.screens}
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