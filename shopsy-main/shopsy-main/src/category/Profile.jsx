import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // ✅ Load immediately on mount
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Detect if user changes in localStorage (like after login)
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser && !user) {
        setUser(JSON.parse(updatedUser));
      }
    }, 500); // checks every 0.5 sec for fresh login

    return () => clearInterval(interval);
  }, [user]);

  // ✅ Fetch user's orders
  useEffect(() => {
    const fetchUserOrders = async (email) => {
      try {
        const res = await axios.get(`https://irshade-commerce-backend.onrender.com/orders/user/${email}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching user orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.email) {
      fetchUserOrders(user.email);
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500";
      case "On the Way":
      case "on the Way":
        return "bg-blue-500";
      default:
        return "bg-red-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-purple-700 to-pink-700 text-white">
        <h2 className="text-2xl font-semibold animate-pulse">Loading your profile...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-purple-700 to-pink-700 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">No Profile Found ❌</h2>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-pink-500 rounded-lg text-white hover:scale-105 transition-transform"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-6 text-white">
      {/* ---------------- PROFILE SECTION ---------------- */}
      <div className="flex flex-col items-center mb-10">
        <div className="bg-white/20 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-md w-full text-white text-center border border-white/30">
          <h1 className="text-3xl font-bold mb-4">👤 Your Profile</h1>

          <div className="space-y-3 text-left mb-6">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-500 font-semibold text-white shadow-lg hover:scale-105 transition-transform"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ---------------- ORDERS SECTION ---------------- */}
      <div className="bg-white/20 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/30 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">📦 My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-white/80">No orders found.</p>
        ) : (
          <div className="overflow-auto">
            <table className="table-auto w-full border border-white/30 text-sm text-left">
              <thead className="bg-white/10 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 border border-white/20">#</th>
                  <th className="px-4 py-2 border border-white/20">Address</th>
                  <th className="px-4 py-2 border border-white/20">City</th>
                  <th className="px-4 py-2 border border-white/20">State</th>
                  <th className="px-4 py-2 border border-white/20">Status</th>
                  <th className="px-4 py-2 border border-white/20">Payment</th>
                  <th className="px-4 py-2 border border-white/20">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className="hover:bg-white/10">
                    <td className="px-4 py-2 border border-white/20 text-center">{index + 1}</td>
                    <td className="px-4 py-2 border border-white/20">{order.address}</td>
                    <td className="px-4 py-2 border border-white/20">{order.city}</td>
                    <td className="px-4 py-2 border border-white/20">{order.state}</td>
                    <td className="px-4 py-2 border border-white/20 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-white/20 capitalize">{order.paymentMethod}</td>
                    <td className="px-4 py-2 border border-white/20">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
