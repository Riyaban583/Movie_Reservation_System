"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Seat {
  id: string;
  seatNumber: string;
  available: boolean;
}

export default function SeatSelectionPage() {
  const params = useParams();
  const router = useRouter();

  const showtimeId = params.showtimeId as string;

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [booking, setBooking] = useState(false);
const [confirmation, setConfirmation] = useState<any>(null);
 
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/screens/showtime/${showtimeId}/seats`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch seats");
        }

        const result = await response.json();

        setSeats(result.data || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unable to load seats.");
      } finally {
        setLoading(false);
      }
    };

    if (showtimeId) {
      fetchSeats();
    }
  }, [showtimeId]);

  const toggleSeat = (seat: Seat) => {
    if (!seat.available) {
      return;
    }

    setSelectedSeats((current) => {
      if (current.includes(seat.id)) {
        return current.filter((id) => id !== seat.id);
      }

      return [...current, seat.id];
    });
  };

  const handleBooking = async () => {
  if (selectedSeats.length === 0) {
    return;
  }

  try {
    setBooking(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before booking seats.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          showtimeId,
          seatIds: selectedSeats,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Booking failed."
      );
    }

    setConfirmation(result.data);
    setSelectedSeats([]);

  } catch (err: any) {
    console.error(err);
    setError(err.message || "Booking failed.");
  } finally {
    setBooking(false);
  }
};

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-zinc-400">Loading seats...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => router.back()}
            className="mb-8 rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
          >
            ← Back
          </button>

          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => router.back()}
          className="mb-8 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
        >
          ← Back
        </button>

        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Movie Reservation
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Select Your Seats
          </h1>

          <p className="mt-2 text-zinc-400">
            Choose the seats you want to reserve.
          </p>
        </div>

        {/* Screen */}
        <div className="mx-auto mb-12 max-w-3xl">
          <div className="mb-3 text-center text-xs uppercase tracking-[0.3em] text-zinc-500">
            Screen
          </div>

          <div className="h-3 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.25)]" />
        </div>

        {/* Seat Legend */}
        <div className="mb-10 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-zinc-700" />
            <span className="text-zinc-400">Available</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-white" />
            <span className="text-zinc-400">Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-red-700" />
            <span className="text-zinc-400">Booked</span>
          </div>
        </div>

        {/* Seats */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-10">
          {seats.length === 0 ? (
            <p className="py-10 text-center text-zinc-400">
              No seats found for this showtime.
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
              {seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat.id);

                return (
                  <button
                    key={seat.id}
                    onClick={() => toggleSeat(seat)}
                    disabled={!seat.available}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      !seat.available
                        ? "cursor-not-allowed border-red-900 bg-red-900/70 text-red-200"
                        : isSelected
                          ? "border-white bg-white text-black shadow-lg"
                          : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-700"
                    }`}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Booking Summary */}
        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                Selected Seats
              </p>

              <p className="mt-1 text-xl font-semibold">
                {selectedSeats.length === 0
                  ? "No seats selected"
                  : `${selectedSeats.length} seat${
                      selectedSeats.length > 1 ? "s" : ""
                    } selected`}
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm text-zinc-500">
                Seat IDs
              </p>

              <p className="mt-1 max-w-xl break-all text-sm text-zinc-300">
                {selectedSeats.length === 0
                  ? "-"
                  : selectedSeats.join(", ")}
              </p>
            </div>
          </div>

         <button
  disabled={selectedSeats.length === 0 || booking}
  onClick={handleBooking}
  className="mt-6 w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
>
  {booking ? "Processing Booking..." : "Confirm Booking →"}
</button>
        </div>

        {confirmation && (
  <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-zinc-700 bg-zinc-900 p-8 text-center">
    <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
      Booking Confirmed
    </p>

    <h2 className="mt-3 text-3xl font-bold">
      Your reservation is successful 🎉
    </h2>

    <p className="mt-4 text-zinc-400">
      Reservation ID:
    </p>

    <p className="mt-1 break-all font-mono text-sm text-white">
      {confirmation.id}
    </p>

    {confirmation.qrCode && (
      <div className="mt-8 flex justify-center">
        <img
          src={confirmation.qrCode}
          alt="Booking QR Code"
          className="h-64 w-64 rounded-2xl bg-white p-3"
        />
      </div>
    )}

    <button
      onClick={() => router.push("/movies")}
      className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200"
    >
      Browse More Movies
    </button>
  </div>
)}
      </div>
    </main>
  );
}