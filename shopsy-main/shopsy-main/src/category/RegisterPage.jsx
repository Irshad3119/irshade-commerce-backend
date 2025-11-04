import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://irshade-commerce-backend.onrender.com/register", form);
      console.log("Register Response:", res.data);
      if (res.data.success) {
        alert("Registration Successful ✅");
        navigate("/login");
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-10">
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 max-w-md w-full text-white border border-white/30">
        {/* 🔹 Top Toggle Tabs */}
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

        <h1 className="text-3xl font-extrabold mb-6 text-center">
          Create Account ✨
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-sm placeholder-white/60 focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-sm placeholder-white/60 focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              placeholder="Enter your number"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-sm placeholder-white/60 focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-sm placeholder-white/60 focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-400 to-pink-400 font-semibold text-white shadow-lg hover:scale-105 transition-transform"
          >
            Register
          </button>
        </form>
         <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-200 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
