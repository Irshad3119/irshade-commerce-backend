import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to fetch orders
  const fetchOrders = () => {
    axios
      .get("http://localhost:3001/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Error fetching orders:", err));
  };

  // Function to delete order
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`http://localhost:3001/orders/${id}`)
        .then(() => {
          fetchOrders(); // Refresh table after deletion
        })
        .catch((err) => console.log("Error deleting order:", err));
    }
  };

  // ✅ Function to update order status
  const handleStatusChange = (id, newStatus) => {
    axios
      .put(`http://localhost:3001/orders/${id}/status`, { status: newStatus })
      .then(() => fetchOrders())
      .catch((err) => console.log("Error updating status:", err));
  };

  return (
    <div className="p-6 mb-200">
      <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-auto bg-white rounded-lg shadow-lg">
          <table className="border border-gray-300 table-auto w-full">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Mobile</th>
                <th className="px-4 py-2 border">Alt. Mobile</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">City</th>
                <th className="px-4 py-2 border">State</th>
                <th className="px-4 py-2 border">Nation</th>
                <th className="px-4 py-2 border">Pincode</th>
                <th className="px-4 py-2 border">Payment</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50 align-top">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{order.name}</td>
                  <td className="px-4 py-2 border">{order.mobileNumber}</td>
                  <td className="px-4 py-2 border">
                    {order.altMobileNumber || "-"}
                  </td>
                  <td className="px-4 py-2 border break-words">{order.email}</td>
                  <td className="px-4 py-2 border break-words max-w-[300px]">
                    {order.address}
                  </td>
                  <td className="px-4 py-2 border">{order.city}</td>
                  <td className="px-4 py-2 border">{order.state}</td>
                  <td className="px-4 py-2 border">{order.nation}</td>
                  <td className="px-4 py-2 border">{order.pincode}</td>
                  <td className="px-4 py-2 border capitalize">
                    {order.paymentMethod}
                  </td>

                  {/* ✅ Status cell with dropdown */}
                  <td className="px-4 py-2 border text-center">
                    <select
                      value={order.status || "Processing"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium cursor-pointer focus:outline-none ${order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "on the Way"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                    >
                      <option value="Processing" className="text-red-600">
                        Processing
                      </option>
                      <option value="on the Way" className="text-blue-600">
                        On the way
                      </option>
                      <option value="Delivered" className="text-green-600">
                        Delivered
                      </option>
                    </select>
                  </td>

                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
