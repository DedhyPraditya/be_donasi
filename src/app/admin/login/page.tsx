"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    // Simple hardcoded auth, replace with real auth in production
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin_login", "true");
      router.push("/admin");
    } else {
      setError("Username atau password salah");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Admin</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold">Login</button>
      </form>
    </div>
  );
}
