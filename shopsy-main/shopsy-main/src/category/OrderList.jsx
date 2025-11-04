import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    altMobileNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    nation: "",
    pincode: "",
    paymentMethod: "",
  });

  const [orders, setOrders] = useState([]);

  // ✅ Load existing orders
  useEffect(() => {
    axios
      .get("https://irshade-commerce-backend.onrender.com/orders") // ✅ fixed route
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Error fetching orders:", err));
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://irshade-commerce-backend.onrender.com/orders", formData); // ✅ fixed route
      alert("✅ Order submitted successfully!");
      navigate("/"); // redirect to orders page
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("❌ Failed to submit order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Customer Details</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Alternative Mobile Number */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Alternative Mobile Number</label>
          <input
            type="text"
            name="altMobileNumber"
            value={formData.altMobileNumber}
            onChange={handleChange}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-semibold">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Nation */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Nation</label>
          <input
            type="text"
            name="nation"
            value={formData.nation}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Pincode */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-semibold">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">Select a payment method</option>
            <option value="upi">UPI / Google Pay / PhonePe</option>
            <option value="cash-on-delivery">Cash on Delivery</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderList;
