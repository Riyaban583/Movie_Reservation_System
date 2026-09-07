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

  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    genre: "",
    language: "",
    releaseDate: "",
  });

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/movies`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch movies");
      }

      setMovies(result.data);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateMovie = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setCreating(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as an admin first.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/movies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            duration: Number(formData.duration),
            genre: formData.genre,
            language: formData.language,
            releaseDate: formData.releaseDate,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create movie");
      }

      setSuccess("Movie created successfully.");

      setFormData({
        title: "",
        description: "",
        duration: "",
        genre: "",
        language: "",
        releaseDate: "",
      });

      setShowForm(false);

      await fetchMovies();
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
            <p className="text-sm text-zinc-400">Admin Dashboard</p>

            <h1 className="mt-2 text-4xl font-bold">Movies</h1>

            <p className="mt-2 text-zinc-400">
              Manage movies in the reservation system.
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
            {showForm ? "Cancel" : "+ Add Movie"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Create Movie</h2>

            <form
              onSubmit={handleCreateMovie}
              className="grid gap-5 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                  placeholder="Interstellar"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Genre
                </label>

                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                  placeholder="Sci-Fi"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Language
                </label>

                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                  placeholder="English"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Duration (minutes)
                </label>

                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                  placeholder="169"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Release Date
                </label>

                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-zinc-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                  placeholder="A team of explorers travels through a wormhole in space."
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Movie"}
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
            Loading movies...
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
                          {new Date(movie.releaseDate).toLocaleDateString()}
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