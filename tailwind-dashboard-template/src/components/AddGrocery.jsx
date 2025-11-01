// import React, { useState } from "react";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";

// const AddGrocery = () => {
//   const [name, setname] = useState();
//   const [item, setitem] = useState();
//   // const [category, setcategory] = useState();
//   const [quantity, setquantity] = useState();
//   const [price, setprice] = useState();
//   const [image, setimage] = useState(null);
//   const navigate = useNavigate();

//   // Cloudinary config
//   const preset_key = "irshad123";   // must match Cloudinary preset
//   const cloud_name = "dsxszrcql";   // your cloud name

//   // handle file upload to Cloudinary
//   function handlefile(event) {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", preset_key); 

//     axios
//       .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
//       .then((res) => {
//         console.log("Cloudinary response:", res.data);
//         setimage(res.data.secure_url);// store URL in state
//       })
//       .catch((err) => console.log(err));
//   }

//   // handle form submit
//   const Submit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:3001/addgrocery", { name, item, quantity, price, image }) 
//       .then((result) => {
//         console.log(result);
//         navigate("/itemgrocery");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Grocery Item</h1>

//         <form onSubmit={Submit} className="space-y-4">
//           {/* Name */}
//           <input type="text" placeholder="Name" onChange={(e) => setname(e.target.value)} className="w-full border px-3 py-2" />

//           {/* Item */}
//           <input type="text" placeholder="Item" onChange={(e) => setitem(e.target.value)} className="w-full border px-3 py-2" />

//           {/* <select
//                 value={category}
//                  onChange={(e) => setcategory(e.target.value)}
//                        className="w-full border px-3 py-2">

//                     <option value="Grocery">Grocery</option>
//                    <option value="Electronics">Electronics</option>
//                      <option value="Perfumes">Perfumes</option>
//                      <option value="offer">offer</option>
//           </select> */}

//           {/* Quantity */}
//           <input type="number" placeholder="Quantity" onChange={(e) => setquantity(e.target.value)} className="w-full border px-3 py-2" />

//           {/* Price */}
//           <input type="number" placeholder="Price" onChange={(e) => setprice(e.target.value)} className="w-full border px-3 py-2" />

//           {/* Image */}
//           <input type="file" onChange={handlefile} className="w-full border px-3 py-2" />
//           {image && <img src={image} alt="preview" className="mt-2 w-24 h-24 object-cover rounded-md border" />}

//           <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
//             Add Item
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddGrocery;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGrocery = () => {
  const [name, setname] = useState("");
  const [item, setitem] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState(null);
  const [category, setcategory] = useState("");     // ✅ New category state
  const [categories, setCategories] = useState([]); // ✅ All categories from backend

  const navigate = useNavigate();

  const preset_key = "irshad123";
  const cloud_name = "dsxszrcql";

  // ✅ Fetch all categories
  useEffect(() => {
    axios
      .get("http://localhost:3001/itemcategory")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  // handle image upload to Cloudinary
  function handlefile(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => setimage(res.data.secure_url))
      .catch((err) => console.log(err));
  }

  // handle form submit
  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/addgrocery", { name, item, quantity, price, image, category }) // ✅ include category
      .then(() => navigate("/itemgrocery"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Grocery Item</h1>

        <form onSubmit={Submit} className="space-y-4">
          <input type="text" placeholder="Name" onChange={(e) => setname(e.target.value)} className="w-full border px-3 py-2" />

          <input type="text" placeholder="Item" onChange={(e) => setitem(e.target.value)} className="w-full border px-3 py-2" />

          {/* ✅ Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="w-full border px-3 py-2 text-gray-700"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <input type="number" placeholder="Quantity" onChange={(e) => setquantity(e.target.value)} className="w-full border px-3 py-2" />
          <input type="number" placeholder="Price" onChange={(e) => setprice(e.target.value)} className="w-full border px-3 py-2" />
          <input type="file" onChange={handlefile} className="w-full border px-3 py-2" />
          {image && <img src={image} alt="preview" className="mt-2 w-24 h-24 object-cover rounded-md border" />}

          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGrocery;
