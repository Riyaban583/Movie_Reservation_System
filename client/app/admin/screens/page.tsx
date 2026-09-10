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
  const [theaters, setTheaters] = useState<Theater[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [generatingSeats, setGeneratingSeats] = useState(false);

  const [screenForm, setScreenForm] = useState({
    name: "",
    theaterId: "",
  });

  const [seatForm, setSeatForm] = useState({
    rows: "",
    seatsPerRow: "",
  });

  const fetchScreens = async () => {
    try {
      setLoading(true);
      setError("");

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
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchTheaters = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/theaters`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch theaters"
        );
      }

      setTheaters(result.data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch theaters");
    }
  };

  useEffect(() => {
    fetchScreens();
    fetchTheaters();
  }, []);

  const handleScreenChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setScreenForm({
      ...screenForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSeatChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSeatForm({
      ...seatForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateScreen = async (
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/screens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: screenForm.name,
            theaterId: screenForm.theaterId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to create screen"
        );
      }

      setSuccess("Screen created successfully.");

      const createdScreenId = result.data.id;

      setScreenForm({
        name: "",
        theaterId: "",
      });

      await fetchScreens();

      if (
        seatForm.rows &&
        seatForm.seatsPerRow &&
        createdScreenId
      ) {
        const seatResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/screens/${createdScreenId}/seats`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              rows: Number(seatForm.rows),
              seatsPerRow: Number(seatForm.seatsPerRow),
            }),
          }
        );

        const seatResult = await seatResponse.json();

        if (!seatResponse.ok) {
          throw new Error(
            seatResult.message || "Screen created but seats failed"
          );
        }

        setSuccess(
          `Screen created and ${seatResult.data.count} seats generated successfully.`
        );

        setSeatForm({
          rows: "",
          seatsPerRow: "",
        });

        await fetchScreens();
      }

      setShowForm(false);
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
              Screens
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage theater screens and their seats.
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
            {showForm ? "Cancel" : "+ Add Screen"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">
              Create Screen
            </h2>

            <form
              onSubmit={handleCreateScreen}
              className="grid gap-5 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Screen Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={screenForm.name}
                  onChange={handleScreenChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                  placeholder="Screen 1"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Theater
                </label>

                <select
                  name="theaterId"
                  value={screenForm.theaterId}
                  onChange={handleScreenChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                >
                  <option value="">
                    Select theater
                  </option>

                  {theaters.map((theater) => (
                    <option
                      key={theater.id}
                      value={theater.id}
                    >
                      {theater.name} - {theater.city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Rows
                </label>

                <input
                  type="number"
                  name="rows"
                  value={seatForm.rows}
                  onChange={handleSeatChange}
                  min="1"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Seats Per Row
                </label>

                <input
                  type="number"
                  name="seatsPerRow"
                  value={seatForm.seatsPerRow}
                  onChange={handleSeatChange}
                  min="1"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-400"
                  placeholder="10"
                />
              </div>

              <div className="md:col-span-2">
                <p className="mb-4 text-sm text-zinc-400">
                  Example: 5 rows × 10 seats = 50 seats.
                </p>

                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creating
                    ? "Creating..."
                    : "Create Screen & Generate Seats"}
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
            Loading screens...
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
