import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateGrocery = () => {
  const { id } = useParams()
  const [name, setname] = useState("")
  const [item, setitem] = useState("")
  const [quantity, setquantity] = useState("")
  const [price, setprice] = useState("")
  const [image, setimage] = useState(null)
  const [category, setcategory] = useState("")     // ✅ category state
  const [categories, setCategories] = useState([]) // ✅ all categories

  const navigate = useNavigate()

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://irshade-commerce-backend.onrender.com/itemcategory")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
  }, [])

  // Fetch grocery details
  useEffect(() => {
    axios
      .get(`https://irshade-commerce-backend.onrender.com/updategrocery/${id}`)
      .then((res) => {
        setname(res.data.name || "")
        setitem(res.data.item || "")
        setquantity(res.data.quantity || "")
        setprice(res.data.price || "")
        setimage(res.data.image || null)
        setcategory(res.data.category || "") // ✅ load existing category
      })
      .catch((err) => console.log(err))
  }, [id])

  const preset_key = "irshad123"
  const cloud_name = "dsxszrcql"

  const handlefile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", preset_key)
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => setimage(res.data.secure_url))
      .catch((err) => console.error(err))
  }

  const Update = (e) => {
    e.preventDefault()
    axios
      .put(`https://irshade-commerce-backend.onrender.com/updategrocery/${id}`, {
        name,
        item,
        quantity,
        price,
        image,
        category, // ✅ include category
      })
      .then(() => navigate('/itemgrocery'))
      .catch((err) => console.log(err))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Grocery Item</h1>

        <form onSubmit={Update} className="space-y-4">
          <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Enter name" />
          <input type="text" value={item} onChange={(e) => setitem(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Enter item" />

          {/* ✅ Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring focus:ring-green-300"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <input type="number" value={quantity} onChange={(e) => setquantity(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Enter quantity" />
          <input type="number" value={price} onChange={(e) => setprice(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Enter price" />
          <input type="file" onChange={handlefile} className="w-full border px-3 py-2 rounded" />
          {image && <img src={image} alt="preview" className="mt-2 w-24 h-24 object-cover rounded-md border" />}
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateGrocery;

