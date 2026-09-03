"use client";

import { useEffect, useState } from "react";

interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number;
  genre: string;
  language: string;
  releaseDate: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/movies"
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch movies"
          );
        }

        setMovies(result.data);
      } catch (error: any) {
        setError(
          error.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm text-zinc-400">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Movies
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage movies in the reservation system.
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            Loading movies...
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
                      Title
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Genre
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Language
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Duration
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Release Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {movies.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-zinc-400"
                      >
                        No movies found.
                      </td>
                    </tr>
                  ) : (
                    movies.map((movie) => (
                      <tr
                        key={movie.id}
                        className="border-b border-zinc-800 last:border-0"
                      >
                        <td className="px-6 py-4 font-medium">
                          {movie.title}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {movie.genre}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {movie.language}
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {movie.duration} min
                        </td>

                        <td className="px-6 py-4 text-zinc-300">
                          {new Date(
                            movie.releaseDate
                          ).toLocaleDateString()}
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