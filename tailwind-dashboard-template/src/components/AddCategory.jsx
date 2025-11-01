import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  
  
  const navigate = useNavigate();

  // Cloudinary config
  const preset_key = "irshad123";
  const cloud_name = "dsxszrcql";

  // handle image upload
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log(err));
  };

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/addcategory", { name, description, image  })
      .then(() => navigate("/itemcategory"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Add Category</h1>
        <form onSubmit={Submit} className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2"
          />
          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2"
          ></textarea>
          <input type="file" onChange={handleFile} className="w-full border px-3 py-2" />
          {image && <img src={image} alt="preview" className="mt-2 w-24 h-24 rounded-md border" />}

          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
