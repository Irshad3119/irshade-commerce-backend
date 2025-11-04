import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const TopProducts = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://irshade-commerce-backend.onrender.com/itemcategory/")
      .then((result) => setCategory(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Add item to cart
  const addToCart = async (data) => {
    try {
      await axios.post("https://irshade-commerce-backend.onrender.com/cart/add", {
        name: data.name,
        item: data._id,       // store item ID
        quantity: data.quantity || 1,
        price: data.price,
        image: data.image,
        category: data.category,
      });
      
      navigate("/cart"); // go to cart page
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      alert("Failed to add item to cart");
    }
  };
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header section */}
        <div className="text-center mb-12">
          <p
            data-aos="fade-up"
            className="text-sm text-primary font-semibold uppercase tracking-wide"
          >
            Top Rated Products for you
          </p>
          <h1
            data-aos="fade-up"
            className="text-3xl font-bold mt-2 text-gray-800 dark:text-white"
          >
            Best Products
          </h1>
          <p
            data-aos="fade-up"
            className="text-sm text-gray-500 mt-2 max-w-md mx-auto"
          >
            Discover our most loved items — carefully selected for quality and style.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center">
          {category.map((data) => (
            <div
              key={data._id}
              data-aos="zoom-in"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transform transition duration-300 overflow-hidden w-full max-w-sm"
            >
              {/* Image section */}
              <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 h-48">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-40 h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Details section */}
              <div className="p-5 text-center">
                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>

                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {data.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {data.description}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(data)}
                  className="bg-blue-500 text-white font-medium py-2 px-5 rounded-full hover:bg-blue-600 hover:scale-105 transition duration-300"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
