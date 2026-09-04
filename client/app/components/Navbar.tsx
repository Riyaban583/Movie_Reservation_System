"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const links = [
    { href: "/movies", label: "Movies" },
  ];

  if (isLoggedIn) {
    links.push(
      { href: "/bookings", label: "My Bookings" },
      { href: "/profile", label: "Profile" }
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/movies"
          className="text-xl font-bold tracking-tight text-white"
        >
          🎬 CineReserve
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-white text-black"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  pathname === "/login"
                    ? "bg-white text-black"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  pathname === "/signup"
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}