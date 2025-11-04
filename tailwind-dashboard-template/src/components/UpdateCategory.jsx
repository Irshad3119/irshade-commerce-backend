import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
 
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://irshade-commerce-backend.onrender.com/updatecategory/" + id)
      .then((res) => {
        setName(res.data.name || "");
        setDescription(res.data.description || "");
        setImage(res.data.image || null);
       
      })
      .catch((err) => console.log(err));
  }, [id]);

  const preset_key = "irshad123";
  const cloud_name = "dsxszrcql";

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

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("https://irshade-commerce-backend.onrender.com/updatecategory/" + id, { name, description, image  })
      .then(() => navigate("/itemcategory"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Update Category</h1>
        <form onSubmit={Update} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="w-full border px-3 py-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border px-3 py-2"
          ></textarea>
          <input type="file" onChange={handleFile} className="w-full border px-3 py-2" />
          {image && <img src={image} alt="preview" className="mt-2 w-24 h-24 rounded-md border" />}
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
