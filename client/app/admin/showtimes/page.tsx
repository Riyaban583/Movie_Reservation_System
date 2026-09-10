"use client";

import { useEffect, useState } from "react";

interface Showtime {
  id: string;
  movieId: string;
  screenId: string;
  startTime: string;
  endTime: string;
}

interface Movie {
  id: string;
  title: string;
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
  theater?: Theater;
}

export default function ShowtimesPage() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    movieId: "",
    screenId: "",
    startTime: "",
    endTime: "",
  });

  const fetchShowtimes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/showtimes`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch showtimes"
        );
      }

      setShowtimes(result.data);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/movies`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch movies"
        );
      }

      setMovies(result.data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch movies");
    }
  };

  const fetchScreens = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Admin login required");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/screens`,
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
      setError(error.message || "Failed to fetch screens");
    }
  };

  useEffect(() => {
    fetchShowtimes();
    fetchMovies();
    fetchScreens();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateShowtime = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setCreating(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Admin login required");
      }

      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);

      if (end <= start) {
        throw new Error(
          "End time must be after start time"
        );
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/showtimes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieId: formData.movieId,
            screenId: formData.screenId,
            startTime: start.toISOString(),
            endTime: end.toISOString(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to create showtime"
        );
      }

      setSuccess("Showtime created successfully.");

      setFormData({
        movieId: "",
        screenId: "",
        startTime: "",
        endTime: "",
      });

      setShowForm(false);

      await fetchShowtimes();
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
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

          <button
            onClick={() => {
              setShowForm(!showForm);
              setError("");
              setSuccess("");
            }}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            {showForm ? "Cancel" : "+ Add Showtime"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">
              Create Showtime
            </h2>

            <form
              onSubmit={handleCreateShowtime}
              className="grid gap-5 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Movie
                </label>

                <select
                  name="movieId"
                  value={formData.movieId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                >
                  <option value="">
                    Select movie
                  </option>

                  {movies.map((movie) => (
                    <option
                      key={movie.id}
                      value={movie.id}
                    >
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Screen
                </label>

                <select
                  name="screenId"
                  value={formData.screenId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                >
                  <option value="">
                    Select screen
                  </option>

                  {screens.map((screen) => (
                    <option
                      key={screen.id}
                      value={screen.id}
                    >
                      {screen.name}
                      {screen.theater
                        ? ` - ${screen.theater.name}`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Start Time
                </label>

                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  End Time
                </label>

                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creating
                    ? "Creating..."
                    : "Create Showtime"}
                </button>
              </div>
            </form>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-900 bg-green-950/40 p-4 text-green-400">
            {success}
          </div>
        )}

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            Loading showtimes...
          </div>
        )}

        {!loading && error && (
          <div className="mb-6 rounded-2xl border border-red-900 bg-red-950/40 p-6 text-red-400">
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