import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersTable = () => {
  const [grocery, setgrocery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://irshade-commerce-backend.onrender.com/itemgrocery")
      .then((result) => setgrocery(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handledelete = (id) => {
    axios
      .delete("https://irshade-commerce-backend.onrender.com/deletegrocery/" + id)
      .then(() => {
        setgrocery(grocery.filter((item) => item._id !== id));
      })
      .catch((errr) => console.log(errr));
  };

  // pagination logic
  const totalPages = Math.ceil(grocery.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = grocery.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left border">Product Name</th>
              <th className="px-6 py-3 text-left border">Brand</th>
               <th className="px-6 py-3 text-left border">Category</th>
              <th className="px-6 py-3 text-left border">Quantity</th>
              <th className="px-6 py-3 text-left border">Price</th>
              <th className="px-6 py-3 text-left border">Product Images</th>
              <th className="px-6 py-3 text-left border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((gro) => (
              <tr key={gro._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border">{gro.name}</td>
                <td className="px-6 py-3 border">{gro.item}</td>
                 <td className="px-6 py-3 border">{gro.category}</td>
                <td className="px-6 py-3 border">{gro.quantity}</td>
                <td className="px-6 py-3 border">{gro.price}</td>
                <td className="px-6 py-3 border">
                  {gro.image ? (
                    <img
                      src={gro.image}
                      alt="product"
                      className="w-12 h-12 object-cover mx-auto rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-6 py-3 border flex gap-2">
                  <Link
                    to={`/updategrocery/${gro._id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handledelete(gro._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="flex justify-center items-center gap-2 py-4">
          {/* Prev Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
