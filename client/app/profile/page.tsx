"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

       const response = await fetch(
  "http://localhost:5000/api/auth/me",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch profile"
          );
        }

        setUser(result.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-zinc-400">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white md:px-10">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => router.push("/movies")}
          className="mb-8 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
        >
          ← Back to Movies
        </button>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Account
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-zinc-400">
              Your account information.
            </p>
          </div>

          {user && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="text-sm text-zinc-500">
                  Name
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {user.name}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="text-sm text-zinc-500">
                  Email
                </p>

                <p className="mt-2 text-lg font-semibold break-all">
                  {user.email}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="text-sm text-zinc-500">
                  Role
                </p>

                <p className="mt-2 text-lg font-semibold uppercase">
                  {user.role}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <button
                  onClick={() => router.push("/movies")}
                  className="flex-1 rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-zinc-200"
                >
                  Browse Movies
                </button>

                <button
                  onClick={handleLogout}
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 font-semibold text-white hover:bg-zinc-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}