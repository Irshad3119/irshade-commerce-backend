// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const CategoryItems = () => {
//   const { name } = useParams();
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/itemgrocery/category/${name}`)
//       .then((res) => setItems(res.data))
//       .catch((err) => console.log(err));
//   }, [name]);

//   // ✅ Add item to cart using backend
//   const addToCart = async (item) => {
//     try {
//       await axios.post("http://localhost:3001/cart/add", {
//         name: item.name,
//         item: item._id,       // store item ID
//         quantity: item.quantity || 1,
//         price: item.price,
//         image: item.image,
//         category: item.category,
//       });
      
//       navigate("/cart"); // go to cart page
//     } catch (err) {
//       console.error("Failed to add item to cart:", err);
//       alert("Failed to add item to cart");
//     }
//   };

//   return (
//     <div className="p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="bg-gray-200 px-4 py-2 rounded mb-4 hover:bg-gray-300"
//       >
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold text-center mb-8">{name} Items</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {items.length > 0 ? (
//           items.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col justify-between"
//             >
//               <div>
//                 {item.image && (
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-40 object-cover rounded-lg mb-4"
//                   />
//                 )}
//                 <h2 className="text-xl font-bold">{item.name}</h2>
//                 <p className="text-gray-600">Price: ₹{item.price}</p>
//                 <p className="text-gray-500">Quantity: {item.quantity}</p>
//               </div>

//               {/* Add to Cart Button */}
//               <button
//                 onClick={() => addToCart(item)}
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-end"
//               >
//                 Add To Cart
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No items found for this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryItems;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const CategoryItems = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/itemgrocery/category/${name}`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, [name]);

  // ✅ Add item to cart using backend
  const addToCart = async (item) => {
    try {
      await axios.post("http://localhost:3001/cart/add", {
        name: item.name,
        item: item._id,
        quantity: item.quantity || 1,
        price: item.price,
        image: item.image,
        category: item.category,
      });
      navigate("/cart");
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      alert("Failed to add item to cart");
    }
  };

  // ✅ Add item to wishlist and navigate
  const addToWishlist = async (item) => {
    try {
      await axios.post("http://localhost:3001/wishlist/add", {
        name: item.name,
        item: item._id,
        price: item.price,
        image: item.image,
        category: item.category,
      });
      navigate("/wishlist");
    } catch (err) {
      console.error("Failed to add item to wishlist:", err);
      alert("Failed to add item to wishlist");
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

      <h1 className="text-3xl font-bold text-center mb-8">{name} Items</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
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
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add To Cart
                </button>
                <button
                  onClick={() => addToWishlist(item)}
                >
                   <FaHeart
        className={`text-pink-500 scale-125
        `}
      />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
