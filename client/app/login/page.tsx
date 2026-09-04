"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      const token = result.data?.token || result.token;

      if (!token) {
        throw new Error("Token was not returned by server");
      }

      localStorage.setItem("token", token);

      router.push("/movies");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Movie Reservation
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Welcome Back
            </h1>

            <p className="mt-2 text-zinc-400">
              Login to continue booking your favorite movies.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-900 bg-red-950/40 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-500">
              Don't have an account?
            </p>

            <button
              onClick={() => router.push("/signup")}
              className="mt-1 text-sm font-semibold text-white hover:underline"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}