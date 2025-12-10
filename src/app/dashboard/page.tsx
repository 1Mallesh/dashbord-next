"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Import ShadCN Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Redirect to login if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  // Idle logout timer
  useEffect(() => {
    const logoutTime = 1 * 60 * 1000; // 1 minute

    const logout = () => {
      localStorage.removeItem("loggedIn");
      router.push("/login");
    };

    // const resetTimer = () => {
    //   if (timerRef.current) clearTimeout(timerRef.current);
    //   timerRef.current = setTimeout(logout, logoutTime);
    // };

    // const events = ["mousemove", "keydown", "scroll", "touchstart"];
    // events.forEach((event) => window.addEventListener(event, resetTimer));

    // resetTimer(); // start initially

//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       events.forEach((event) => window.removeEventListener(event, resetTimer));
//     };
//   }, [router]);
  }, [router]);

  // SAMPLE TABLE DATA
  const users = [
    { id: 1, name: "Rohith", email: "rohith@example.com", role: "Admin" },
    { id: 2, name: "Arjun", email: "arjun@example.com", role: "Editor" },
    { id: 3, name: "Ravi", email: "ravi@example.com", role: "Viewer" },
    { id: 4, name: "Rohith", email: "rohith@example.com", role: "Admin" },
    { id: 5, name: "Arjun", email: "arjun@example.com", role: "Editor" },
    { id: 6, name: "Ravi", email: "ravi@example.com", role: "Viewer" },
    { id: 7, name: "Rohith", email: "rohith@example.com", role: "Admin" },
    { id: 8, name: "Arjun", email: "arjun@example.com", role: "Editor" },
    { id: 9, name: "Ravi", email: "ravi@example.com", role: "Viewer" },
    { id: 10, name: "Ravi", email: "ravi@example.com", role: "Viewer" },
    { id: 11, name: "Rohith", email: "rohith@example.com", role: "Admin" },
    { id: 12, name: "Arjun", email: "arjun@example.com", role: "Editor" },
    { id: 13, name: "Ravi", email: "ravi@example.com", role: "Viewer" },
  ];

  return (
    <div className="p-10">
    

      {/* === TABLE STARTS HERE === */}
<div className="mt-10 bg-white shadow-md rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-4">User List</h2>

  {/* Add a fixed height and overflow-auto */}
  <div className="max-h-96 overflow-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>
{/* === TABLE ENDS HERE === */}

    </div>
  );
}
