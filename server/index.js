// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const UserModel = require('./model/Users');
// const CategoryModel = require('./model/Category');
// const CartModel = require('./model/Cart'); // New Cart model
// const OrderModel = require("./model/Order"); // Make sure this path is correct (./model/Order.js)
// const WishlistModel = require('./model/Wishlist'); // ✅ NEW
// const LogModel = require("./model/Log");
// const bcrypt = require("bcryptjs"); // for password encryption

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect("mongodb+srv://irshad:Mohdirshad@cluster0.ragsygz.mongodb.net/")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// // -------------------- REGISTER --------------------
// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, mobile } = req.body;

//     const existingUser = await LogModel.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new LogModel({
//       name,
//       email,
//       password: hashedPassword,
//       mobile,
//     });

//     await newUser.save();
//     res.json({ success: true, message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.json({ success: false, message: "Registration failed" });
//   }
// });

// // -------------------- LOGIN --------------------
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await LogModel.findOne({ email });
//     if (!user) return res.json({ success: false, message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

//     // Send only necessary info to frontend
//     res.json({
//       success: true,
//       message: "Login successful",
//       user: {
//         name: user.name,
//         email: user.email,
//         mobile: user.mobile,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.json({ success: false, message: "Server error during login" });
//   }
// });



// /* ------------------ CATEGORY ROUTES ------------------ */

// // Add category
// app.post("/addcategory", (req, res) => {
//     CategoryModel.create(req.body)
//         .then(categories => res.json(categories))
//         .catch(err => res.json(err));
// });

// // Get all categories
// app.get('/itemcategory', (req, res) => {
//     CategoryModel.find({})
//         .then(categories => res.json(categories))
//         .catch(err => res.json(err));
// });

// // Get single category by ID
// app.get('/updatecategory/:id', (req, res) => {
//     const id = req.params.id;
//     CategoryModel.findById({ _id: id })
//         .then(categories => res.json(categories))
//         .catch(err => res.json(err));
// });

// // Update category
// app.put("/updatecategory/:id", (req, res) => {
//     const id = req.params.id;
//     CategoryModel.findByIdAndUpdate(
//         { _id: id },
//         {
//             name: req.body.name,
//             description: req.body.description,
//             image: req.body.image,
//             price: req.body.price
//         },
//         { new: true }
//     )
//         .then((category) => res.json(category))
//         .catch((err) => res.json(err));
// });

// // Delete category
// app.delete('/deletecategory/:id', (req, res) => {
//     const id = req.params.id;
//     CategoryModel.findByIdAndDelete({ _id: id })
//         .then(res => res.json(res))
//         .catch(err => res.json(err));
// });

// // Get grocery items by category
// app.get('/itemgrocery/category/:name', (req, res) => {
//     const categoryName = req.params.name;
//     UserModel.find({ category: categoryName })
//         .then(items => res.json(items))
//         .catch(err => res.json(err));
// });

// /* ------------------ GROCERY ROUTES ------------------ */

// // Add grocery item
// app.post("/addgrocery", (req, res) => {
//     UserModel.create(req.body)
//         .then(users => res.json(users))
//         .catch(err => res.json(err));
// });

// // Get all grocery items
// app.get('/itemgrocery', (req, res) => {
//     UserModel.find({})
//         .then(users => res.json(users))
//         .catch(err => res.json(err));
// });

// // Get grocery item by ID
// app.get('/updategrocery/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findById({ _id: id })
//         .then(users => res.json(users))
//         .catch(err => res.json(err));
// });

// // Update grocery item
// app.put('/updategrocery/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({ _id: id }, {
//         name: req.body.name,
//         item: req.body.item,
//         quantity: req.body.quantity,
//         price: req.body.price,
//         image: req.body.image,
//         category: req.body.category
//     })
//         .then(users => res.json(users))
//         .catch(err => res.json(err));
// });

// // Delete grocery item
// app.delete('/deletegrocery/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndDelete({ _id: id })
//         .then(res => res.json(res))
//         .catch(err => res.json(err));
// });

// /* ------------------ CART ROUTES ------------------ */

// // Add item to cart
// app.post("/cart/add", async (req, res) => {
//     try {
//         const newCartItem = new CartModel(req.body);
//         await newCartItem.save();
//         res.status(201).json({ message: "Item added to cart", cart: newCartItem });
//     } catch (err) {
//         res.status(500).json({ error: "Failed to add item to cart" });
//     }
// });

// // Get all cart items
// app.get("/cart", async (req, res) => {
//     try {
//         const items = await CartModel.find();
//         res.status(200).json(items);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch cart items" });
//     }
// });

// // Remove item from cart
// app.delete("/cart/:id", async (req, res) => {
//     try {
//         await CartModel.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: "Item removed from cart" });
//     } catch (err) {
//         res.status(500).json({ error: "Failed to remove item from cart" });
//     }
// });

// // --------------------------Whishlist---------------------------------------
// // ✅ Add item to wishlist
// app.post("/wishlist/add", async (req, res) => {
//   try {
//     const newWishlistItem = new WishlistModel(req.body);
//     await newWishlistItem.save();
//     res.status(201).json({ message: "Item added to wishlist", wishlist: newWishlistItem });
//   } catch (err) {
//     console.error("Error adding to wishlist:", err);
//     res.status(500).json({ error: "Failed to add item to wishlist" });
//   }
// });

// // ✅ Get all wishlist items
// app.get("/wishlist", async (req, res) => {
//   try {
//     const items = await WishlistModel.find();
//     res.status(200).json(items);
//   } catch (err) {
//     console.error("Error fetching wishlist items:", err);
//     res.status(500).json({ error: "Failed to fetch wishlist items" });
//   }
// });

// // ✅ Delete item from wishlist
// app.delete("/wishlist/delete/:id", async (req, res) => {
//   try {
//     await WishlistModel.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Item removed from wishlist" });
//   } catch (err) {
//     console.error("Error removing item:", err);
//     res.status(500).json({ error: "Failed to remove item from wishlist" });
//   }
// });





// /* ---------------- ORDER ROUTES ---------------- */

// // ✅ Add new order
// app.post("/orders", (req, res) => {
//   OrderModel.create(req.body)
//     .then((order) => res.json(order))
//     .catch((err) => res.status(500).json({ error: "Failed to create order", details: err }));
// });

// // ✅ Get all orders
// app.get("/orders", (req, res) => {
//   OrderModel.find()
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(500).json({ error: "Failed to fetch orders", details: err }));
// });
// // ✅ Get orders by email (for specific user)
// app.get("/orders/user/:email", async (req, res) => {
//   try {
//     const orders = await OrderModel.find({ email: req.params.email });
//     res.status(200).json(orders);
//   } catch (err) {
//     console.error("Error fetching user orders:", err);
//     res.status(500).json({ error: "Failed to fetch user orders" });
//   }
// });

// // ✅ Update order status
// app.put("/orders/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updated = await OrderModel.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update order status" });
//   }
// });


// // ✅ Delete an order
// app.delete("/orders/:id", (req, res) => {
//   OrderModel.findByIdAndDelete(req.params.id)
//     .then(() => res.json({ message: "Order deleted successfully" }))
//     .catch((err) => res.status(500).json({ error: "Failed to delete order", details: err }));
// });


// /* ------------------ SERVER START ------------------ */
// app.listen(3001, () => {
//     console.log("Server is running");
// });

// -------------------- IMPORTS --------------------
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcryptjs");
require('dotenv').config(); // ✅ To load .env variables

// -------------------- MODELS --------------------
const UserModel = require('./model/Users');
const CategoryModel = require('./model/Category');
const CartModel = require('./model/Cart');
const OrderModel = require("./model/Order");
const WishlistModel = require('./model/Wishlist');
const LogModel = require("./model/Log");

// -------------------- APP INIT --------------------
const app = express();
app.use(express.json());

// -------------------- CORS CONFIGURATION --------------------
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://irshade-commerce-frontend.vercel.app', // ✅ your frontend domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked CORS request from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ✅ Handle preflight requests globally
app.options('*', cors());

// -------------------- DATABASE CONNECTION --------------------
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://irshad:Mohdirshad@cluster0.ragsygz.mongodb.net/")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// -------------------- AUTH ROUTES --------------------

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const existingUser = await LogModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new LogModel({ name, email, password: hashedPassword, mobile });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Registration failed" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await LogModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    res.json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email, mobile: user.mobile },
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Server error during login" });
  }
});

// -------------------- CATEGORY ROUTES --------------------
app.post("/addcategory", (req, res) => {
  CategoryModel.create(req.body)
    .then(categories => res.json(categories))
    .catch(err => res.json(err));
});

app.get('/itemcategory', (req, res) => {
  CategoryModel.find({})
    .then(categories => res.json(categories))
    .catch(err => res.json(err));
});

app.get('/updatecategory/:id', (req, res) => {
  const id = req.params.id;
  CategoryModel.findById(id)
    .then(categories => res.json(categories))
    .catch(err => res.json(err));
});

app.put("/updatecategory/:id", (req, res) => {
  const id = req.params.id;
  CategoryModel.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price
    },
    { new: true }
  )
    .then(category => res.json(category))
    .catch(err => res.json(err));
});

app.delete('/deletecategory/:id', (req, res) => {
  CategoryModel.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// -------------------- GROCERY ROUTES --------------------
app.post("/addgrocery", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/itemgrocery', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/updategrocery/:id', (req, res) => {
  UserModel.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.put('/updategrocery/:id', (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      item: req.body.item,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category
    },
    { new: true }
  )
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.delete('/deletegrocery/:id', (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// -------------------- CART ROUTES --------------------
app.post("/cart/add", async (req, res) => {
  try {
    const newCartItem = new CartModel(req.body);
    await newCartItem.save();
    res.status(201).json({ message: "Item added to cart", cart: newCartItem });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const items = await CartModel.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

app.delete("/cart/:id", async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// -------------------- WISHLIST ROUTES --------------------
app.post("/wishlist/add", async (req, res) => {
  try {
    const newWishlistItem = new WishlistModel(req.body);
    await newWishlistItem.save();
    res.status(201).json({ message: "Item added to wishlist", wishlist: newWishlistItem });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ error: "Failed to add item to wishlist" });
  }
});

app.get("/wishlist", async (req, res) => {
  try {
    const items = await WishlistModel.find();
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching wishlist items:", err);
    res.status(500).json({ error: "Failed to fetch wishlist items" });
  }
});

app.delete("/wishlist/delete/:id", async (req, res) => {
  try {
    await WishlistModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ error: "Failed to remove item from wishlist" });
  }
});

// -------------------- ORDER ROUTES --------------------
app.post("/orders", (req, res) => {
  OrderModel.create(req.body)
    .then(order => res.json(order))
    .catch(err => res.status(500).json({ error: "Failed to create order", details: err }));
});

app.get("/orders", (req, res) => {
  OrderModel.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(500).json({ error: "Failed to fetch orders", details: err }));
});

app.get("/orders/user/:email", async (req, res) => {
  try {
    const orders = await OrderModel.find({ email: req.params.email });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
});

app.put("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await OrderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});

app.delete("/orders/:id", (req, res) => {
  OrderModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Order deleted successfully" }))
    .catch(err => res.status(500).json({ error: "Failed to delete order", details: err }));
});

// -------------------- SERVER START --------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
