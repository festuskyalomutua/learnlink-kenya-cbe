import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">LearnLink Login</h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-3 rounded"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
