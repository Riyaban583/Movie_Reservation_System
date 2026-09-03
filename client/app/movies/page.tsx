"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [releaseDate, setReleaseDate] = useState("");
const moviesPerPage = 6;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies");

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const result = await response.json();
        setMovies(result.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const genres = useMemo(() => {
    return ["All", ...new Set(movies.map((movie) => movie.genre))];
  }, [movies]);

const filteredMovies = useMemo(() => {
  return movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "All" || movie.genre === genre;

    const movieDate = new Date(movie.releaseDate);

    const localDate =
      `${movieDate.getFullYear()}-${String(
        movieDate.getMonth() + 1
      ).padStart(2, "0")}-${String(
        movieDate.getDate()
      ).padStart(2, "0")}`;

    const utcDate = movieDate.toISOString().slice(0, 10);

    const isoDate = movie.releaseDate.slice(0, 10);

    const matchesDate =
      !releaseDate ||
      releaseDate === localDate ||
      releaseDate === utcDate ||
      releaseDate === isoDate;

    return matchesSearch && matchesGenre && matchesDate;
  });
}, [movies, search, genre, releaseDate]);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

const startIndex = (currentPage - 1) * moviesPerPage;

const paginatedMovies = filteredMovies.slice(
  startIndex,
  startIndex + moviesPerPage
);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        color: "white",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Movies
        </h1>

        <p
          style={{
            color: "#9ca3af",
            marginBottom: "35px",
          }}
        >
          Discover movies and explore available shows.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
           onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
            style={{
              flex: "1",
              minWidth: "240px",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #27272a",
              background: "#15151c",
              color: "white",
              outline: "none",
            }}
          />

          <select
            value={genre}
          onChange={(e) => {
  setGenre(e.target.value);
  setCurrentPage(1);
}}

            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #27272a",
              background: "#15151c",
              color: "white",
              outline: "none",
            }}
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
  type="date"
  value={releaseDate}
  onChange={(e) => {
    setReleaseDate(e.target.value);
    setCurrentPage(1);
  }}
  style={{
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #27272a",
    background: "#15151c",
    color: "white",
    outline: "none",
  }}
/>
        </div>

        {loading && <p>Loading movies...</p>}

        {error && (
          <p style={{ color: "#ef4444" }}>
            {error}
          </p>
        )}

        {!loading && !error && filteredMovies.length === 0 && (
          <p style={{ color: "#9ca3af" }}>
            No movies found.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
         {paginatedMovies.map((movie) => (
            <div
              key={movie.id}
              style={{
                background: "#15151c",
                border: "1px solid #27272a",
                borderRadius: "18px",
                padding: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  marginBottom: "12px",
                }}
              >
                {movie.title}
              </h2>

              <p
                style={{
                  color: "#a1a1aa",
                  marginBottom: "16px",
                  lineHeight: "1.6",
                }}
              >
                {movie.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "18px",
                }}
              >
                <span>🎬 {movie.genre}</span>
                <span>🌐 {movie.language}</span>
                <span>⏱ {movie.duration} min</span>
              </div>

              <button
                onClick={() =>
                  router.push(`/movies/${movie.id}`)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  background: "#ffffff",
                  color: "#111111",
                  fontWeight: "600",
                }}
              >
                View Shows
              </button>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      marginTop: "35px",
    }}
  >
    <button
      onClick={() =>
        setCurrentPage((page) => Math.max(page - 1, 1))
      }
      disabled={currentPage === 1}
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid #27272a",
        background: currentPage === 1 ? "#111115" : "#18181f",
        color: currentPage === 1 ? "#52525b" : "white",
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
      }}
    >
      ← Prev
    </button>

    {Array.from(
      { length: totalPages },
      (_, index) => index + 1
    ).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        style={{
          minWidth: "40px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #27272a",
          background:
            currentPage === page ? "white" : "#18181f",
          color:
            currentPage === page ? "black" : "white",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        {page}
      </button>
    ))}

    <button
      onClick={() =>
        setCurrentPage((page) =>
          Math.min(page + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid #27272a",
        background:
          currentPage === totalPages ? "#111115" : "#18181f",
        color:
          currentPage === totalPages ? "#52525b" : "white",
        cursor:
          currentPage === totalPages
            ? "not-allowed"
            : "pointer",
      }}
    >
      Next →
    </button>
  </div>
)}
      </div>
    </main>
  );
}