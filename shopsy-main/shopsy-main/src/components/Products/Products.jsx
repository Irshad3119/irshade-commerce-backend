import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  // Set of product IDs currently in wishlist (for quick includes checks)
  const [wishlistProductIds, setWishlistProductIds] = useState(new Set());
  // Map productId -> wishlistEntryId (the wishlist doc _id returned by backend)
  const [wishlistEntries, setWishlistEntries] = useState({});
  const navigate = useNavigate();

  // Fetch product list
  useEffect(() => {
    axios
      .get("https://irshade-commerce-backend.onrender.com/itemgrocery/")
      .then((result) => setProducts(result.data))
      .catch((err) => console.log("Failed to fetch products:", err));
  }, []);

  // Fetch wishlist on mount to keep UI in sync
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Expecting an array of wishlist documents:
        // [{ _id: "wishlistDocId", item: "productId", name, price, ... }, ...]
        const res = await axios.get("https://irshade-commerce-backend.onrender.com/wishlist/");
        const list = res.data || [];

        const ids = new Set();
        const entriesMap = {};
        list.forEach((entry) => {
          // backend might nest product id as entry.item or entry.item._id
          const prodId = entry.item && (entry.item._id || entry.item);
          if (prodId) {
            ids.add(prodId);
            entriesMap[prodId] = entry._id; // map product -> wishlist doc id
          }
        });

        setWishlistProductIds(ids);
        setWishlistEntries(entriesMap);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

  // Add item to cart
  const addToCart = async (data) => {
    try {
      await axios.post("https://irshade-commerce-backend.onrender.com/cart/add", {
        name: data.name,
        item: data._id,
        quantity: data.quantity || 1,
        price: data.price,
        image: data.image,
        category: data.category,
      });
      navigate("/cart");
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      alert("Failed to add item to cart");
    }
  };

  // Toggle wishlist: add on first click, remove on second click
  const toggleWishlist = async (item) => {
    const productId = item._id;
    const isLiked = wishlistProductIds.has(productId);

    if (!isLiked) {
      // Add to wishlist
      try {
        // Optimistic update
        setWishlistProductIds((prev) => new Set(prev).add(productId));

        const res = await axios.post("https://irshade-commerce-backend.onrender.com/wishlist/add", {
          name: item.name,
          item: productId,
          price: item.price,
          image: item.image,
        });

        // Expect the created wishlist entry returned from backend
        // (so we can use its _id for removal later)
        const created = res.data;
        const wishlistDocId = created && created._id;

        if (wishlistDocId) {
          setWishlistEntries((prev) => ({ ...prev, [productId]: wishlistDocId }));
        } else if (created && created.item) {
          // sometimes backend returns item id only
          // no op, we already added productId to the Set
        }
      } catch (err) {
        // rollback optimistic update
        setWishlistProductIds((prev) => {
          const s = new Set(prev);
          s.delete(productId);
          return s;
        });
        console.error("Failed to add to wishlist:", err);
        alert("Failed to add to wishlist");
      }
    } else {
      // Remove from wishlist
      try {
        // optimistic UI: remove locally first
        setWishlistProductIds((prev) => {
          const s = new Set(prev);
          s.delete(productId);
          return s;
        });

        // Preferred: delete by wishlist document id if we have it
        const wishlistDocId = wishlistEntries[productId];

        if (wishlistDocId) {
          // backend route: DELETE /wishlist/remove/:wishlistDocId
          await axios.delete(`https://irshade-commerce-backend.onrender.com/wishlist/remove/${wishlistDocId}`);

          // remove mapping
          setWishlistEntries((prev) => {
            const copy = { ...prev };
            delete copy[productId];
            return copy;
          });
        } else {
          // Fallback: call delete with itemId in body (some APIs expect this)
          // axios.delete supports passing a request body via the `data` option
          await axios.delete("https://irshade-commerce-backend.onrender.com/wishlist/remove", {
            data: { itemId: productId },
          });
        }
      } catch (err) {
        // rollback optimistic removal if delete failed
        setWishlistProductIds((prev) => new Set(prev).add(productId));
        console.error("Failed to remove from wishlist:", err);
        alert("Failed to remove from wishlist");
      }
    }
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>

        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {products.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data._id}
                className="relative space-y-3 bg-white shadow-md p-3 rounded-md flex flex-col justify-between"
              >
                {/* Wishlist Heart Icon */}
                <button
                  onClick={() => toggleWishlist(data)}
                  className="absolute bottom-2 right-2"
                  aria-label={wishlistProductIds.has(data._id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <FaHeart
                    className={`text-2xl transition-all duration-300 ${
                      wishlistProductIds.has(data._id)
                        ? "text-red-500 scale-110"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  />
                </button>

                {/* Product Image */}
                <img
                  src={data.image}
                  alt={data.name}
                  className="h-[220px] w-[150px] object-cover rounded-md mx-auto"
                />

                {/* Product Details */}
                <div>
                  <h3 className="font-semibold">{data.name}</h3>
                  <h3 className="font-semibold">₹ {data.price || "0"}</h3>
                  <p className="text-sm text-gray-600">{data.color}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(data)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

