import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cart");
      setCartItems(response.data);
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
    }
  };

  // Remove single item
  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/cart/${id}`);
      fetchCartItems();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // Clear all items
  const clearAllItems = async () => {
    try {
      await Promise.all(
        cartItems.map((item) =>
          axios.delete(`http://localhost:3001/cart/${item._id}`)
        )
      );
      fetchCartItems();
    } catch (err) {
      console.error("Failed to clear cart items:", err);
    }
  };

  // Total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="h-screen p-4  flex flex-col">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-4 py-2 rounded mb-4 hover:bg-gray-300 self-start"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-center mb-8">Cart Items</h1>

      {/* Main Flex Container */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-y-auto">
        {/* LEFT SIDE (60%) - Product Cards */}
        <div className="w-full md:w-5/6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition relative flex flex-col"
              >
                {/* Remove button top-right */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="absolute bottom-2 right-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>

                {/* Product Image */}
                <div className="w-full h-30 mb-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                         className="w-38 h-40 object-contain rounded-lg border border-gray-200"                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
            ))
          ) : (
            <p className="text-center  text-gray-500 w-full mb-60">Your cart is empty.</p>
          )}
        </div>

        {/* RIGHT SIDE (40%) - Cart Summary */}
        {cartItems.length > 0 && (
          <div className="w-full md:w-2/5 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center ">Cart</h2>

              {/* Simple list of products instead of table */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between  pb-2"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                    </div>
                    <div><p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p></div>
                    <p className="font-medium">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Total + Buttons */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-bold mb-4 text-right">
                Total: ₹{totalAmount}
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/orders")}
                  className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition w-full sm:w-auto"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearAllItems}
                  className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition w-full sm:w-auto"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
