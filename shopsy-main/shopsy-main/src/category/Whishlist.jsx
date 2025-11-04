import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get("https://irshade-commerce-backend.onrender.com/wishlist");
      setWishlistItems(response.data);
    } catch (err) {
      console.error("Failed to fetch wishlist items:", err);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`https://irshade-commerce-backend.onrender.com/wishlist/delete/${id}`);
      fetchWishlistItems();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const moveToCart = async (item) => {
    try {
      await axios.post("https://irshade-commerce-backend.onrender.com/cart/add", {
        name: item.name,
        item: item.item,
        quantity: 1,
        price: item.price,
        image: item.image,
        category: item.category,
      });
      await axios.delete(`https://irshade-commerce-backend.onrender.com/wishlist/delete/${item._id}`);
      navigate("/cart");
    } catch (err) {
      console.error("Failed to move item to cart:", err);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-4 py-2 rounded mb-4 hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-center mb-8">Liked  Items</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-500">Category: {item.category}</p>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => moveToCart(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
