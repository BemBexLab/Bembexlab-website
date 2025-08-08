"use client";

import { useEffect, useState } from "react";

type Contact = {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  subject: string | null;
  message: string;
  submitted_at: string | Date | null;
};

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchContacts();
  }, [isAuthenticated]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.message || "Login failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to delete contact");
      }
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete lead");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAll = async () => {
    if (!contacts.length) return;
    if (
      !confirm(
        `This will permanently delete ${contacts.length} lead(s). Continue?`
      )
    )
      return;

    try {
      setDeletingAll(true);
      const res = await fetch(`/api/admin?all=true`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to delete all contacts");
      }
      setContacts([]);
    } catch (err) {
      console.error("Delete-all error:", err);
      alert("Failed to delete all leads");
    } finally {
      setDeletingAll(false);
    }
  };

  if (!hasMounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A11] text-white p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 p-6 bg-[#1a1a1a] rounded-xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded bg-[#2a2a2a] text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-[#2a2a2a] text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-2 rounded text-white"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 text-white bg-[#0A0A11] min-h-screen mt-[100px]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>

        {/* Top-left aligned on the table container, but here is above the table; 
            if you literally want inside the table top-left cell, move this into the <thead> as an extra <th>. */}
        <button
          onClick={handleDeleteAll}
          disabled={deletingAll || contacts.length === 0}
          className="bg-red-700 hover:bg-red-800 px-3 py-2 rounded text-white text-xs disabled:opacity-60"
          title="Delete all leads"
        >
          {deletingAll ? "Deleting All..." : "Delete All"}
        </button>
      </div>

      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[950px] w-full text-left border border-white text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#1a1a1a]">
                <th className="p-2 border border-white">First Name</th>
                <th className="p-2 border border-white">Last Name</th>
                <th className="p-2 border border-white">Email</th>
                <th className="p-2 border border-white">Phone</th>
                <th className="p-2 border border-white">Service</th>
                <th className="p-2 border border-white">Subject</th>
                <th className="p-2 border border-white">Message</th>
                <th className="p-2 border border-white">Time</th>
                <th className="p-2 border border-white text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="hover:bg-[#2a2a2a] transition">
                  <td className="p-2 border border-white">{c.first_name}</td>
                  <td className="p-2 border border-white">
                    {c.last_name ?? "-"}
                  </td>
                  <td className="p-2 border border-white">{c.email}</td>
                  <td className="p-2 border border-white">{c.phone ?? "-"}</td>
                  <td className="p-2 border border-white">
                    {c.service ?? "-"}
                  </td>
                  <td className="p-2 border border-white">
                    {c.subject ?? "-"}
                  </td>
                  <td className="p-2 border border-white">{c.message}</td>
                  <td className="p-2 border border-white">
                    {c.submitted_at
                      ? new Date(c.submitted_at).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="p-2 border border-white text-center">
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={deletingId === c.id}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-xs disabled:opacity-60"
                    >
                      {deletingId === c.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-gray-300">
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
