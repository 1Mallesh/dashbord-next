"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Redirect to login if not logged in
  useEffect(() => {
    const logged = localStorage.getItem("loggedIn");
    if (!logged) router.push("/");
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md px-6 py-8 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

        <nav className="space-y-4">
          <Link className="block text-gray-700 hover:text-red-500" href="/dashboard">
            Home
          </Link>

          <Link className="block text-gray-700 hover:text-red-500" href="/dashboard/profile">
            Profile
          </Link>

          <Link className="block text-gray-700 hover:text-red-500" href="/dashboard/settings">
            Settings
          </Link>

          <p
            className="block text-red-600 cursor-pointer mt-10"
            onClick={() => {
              localStorage.removeItem("loggedIn");
              router.push("/");
            }}
          >
            Logout
          </p>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1">
        {/* HEADER */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome User</h1>

          <button
            onClick={() => {
              localStorage.removeItem("loggedIn");
              router.push("/");
            }}
            className="bg-red-500 text-white px-4 py-1 rounded-md"
          >
            Logout
          </button>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
