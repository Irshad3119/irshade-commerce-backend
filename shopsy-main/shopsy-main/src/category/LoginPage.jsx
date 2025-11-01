import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
         navigate("/profile");

      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/20 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-md w-full text-white">
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => navigate("/login")}
            className={`text-lg font-semibold pb-1 ${
              location.pathname === "/login"
                ? "border-b-4 border-pink-400 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className={`text-lg font-semibold pb-1 ${
              location.pathname === "/register"
                ? "border-b-4 border-pink-400 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back 👋</h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-500 font-semibold text-white shadow-lg hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-200 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
