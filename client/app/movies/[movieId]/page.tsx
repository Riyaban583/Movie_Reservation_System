"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number;
  genre: string;
  language: string;
  releaseDate: string;
}

interface Showtime {
  id: string;
  movieId: string;
  screenId: string;
  startTime: string;
  endTime: string;
}

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const movieId = params.movieId as string;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [movieResponse, showtimeResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/movies/${movieId}`),
          fetch(`http://localhost:5000/api/showtimes?movieId=${movieId}`),
        ]);

        if (!movieResponse.ok) {
          throw new Error("Movie not found");
        }

        const movieResult = await movieResponse.json();
        const showtimeResult = await showtimeResponse.json();

        setMovie(movieResult.data);

        if (showtimeResponse.ok) {
          setShowtimes(showtimeResult.data || []);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (time: string) => {
    return new Date(time).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-zinc-400">Loading movie...</p>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => router.push("/movies")}
            className="mb-8 rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
          >
            ← Back to Movies
          </button>

          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <p className="text-red-400">
              {error || "Movie not found."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => router.push("/movies")}
          className="mb-8 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
        >
          ← Back to Movies
        </button>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
            Movie Details
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            {movie.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
            <span className="rounded-full bg-zinc-800 px-4 py-2">
              🎬 {movie.genre}
            </span>

            <span className="rounded-full bg-zinc-800 px-4 py-2">
              🌐 {movie.language}
            </span>

            <span className="rounded-full bg-zinc-800 px-4 py-2">
              ⏱ {movie.duration} min
            </span>

            <span className="rounded-full bg-zinc-800 px-4 py-2">
              📅{" "}
              {new Date(movie.releaseDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
            {movie.description}
          </p>
        </section>

        <section className="mt-10">
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
              Choose your show
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Available Showtimes
            </h2>
          </div>

          {showtimes.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
              <p className="text-zinc-400">
                No showtimes available for this movie.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {showtimes.map((showtime) => (
                <div
                  key={showtime.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600 hover:bg-zinc-800"
                >
                  <p className="text-sm text-zinc-500">
                    {formatDate(showtime.startTime)}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    {formatTime(showtime.startTime)}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">
                    Screen: {showtime.screenId}
                  </p>

                  <button
                    onClick={() =>
                      router.push(`/booking/${showtime.id}`)
                    }
                    className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-zinc-200"
                  >
                    Select Seats →
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}