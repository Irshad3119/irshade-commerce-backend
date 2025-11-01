import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ItemCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch categories from backend
  const fetchCategories = () => {
    axios
      .get("http://localhost:3001/itemcategory") // Make sure backend port matches
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("Fetch error:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(`http://localhost:3001/deletecategory/${id}`)
        .then(() => {
          setCategories(categories.filter((cat) => cat._id !== id));
        })
        .catch((err) => console.log("Delete error:", err));
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = categories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header with Add Category button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
       
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3 border text-left">Category Name</th>
              <th className="px-6 py-3 border text-left">Description</th>
              <th className="px-6 py-3 border text-left">Image</th>
              <th className="px-6 py-3 border text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            )}
            {currentItems.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border">{cat.name}</td>
                <td className="px-6 py-3 border">{cat.description || "N/A"}</td>
                <td className="px-6 py-3 border">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt="category"
                      className="w-12 h-12 object-cover mx-auto rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-6 py-3 border flex gap-2">
                  <Link
                    to={`/updatecategory/${cat._id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 py-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCategory;
