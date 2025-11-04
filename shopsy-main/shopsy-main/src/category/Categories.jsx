import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://irshade-commerce-backend.onrender.com/itemcategory")
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>

      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="bg-white shadow-md rounded-lg w-64 flex-shrink-0 hover:shadow-xl transition-shadow cursor-pointer"
            >
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{cat.name}</h2>
                {cat.description && (
                  <p className="text-gray-600">{cat.description}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Categories;
