// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

// // Components
// import Navbar from "./components/Navbar/Navbar";
// import Hero from "./components/Hero/Hero";
// import Products from "./components/Products/Products";
// import TopProducts from "./components/TopProducts/TopProducts";
// import Banner from "./components/Banner/Banner";
// import Subscribe from "./components/Subscribe/Subscribe";
// import Testimonials from "./components/Testimonials/Testimonials";
// import Footer from "./components/Footer/Footer";
// import Popup from "./components/Popup/Popup";

// // Pages
// import Categories from "./category/Categories";
// import CategoryItems from "./category/CategoryItems";
// import CartPage from "./category/CartPage";
// import OrderList from "./category/OrderList";

// const App = () => {
//   const [orderPopup, setOrderPopup] = useState(false);
//   const handleOrderPopup = () => setOrderPopup(!orderPopup);

//   useEffect(() => {
//     AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });
//     AOS.refresh();
//   }, []);

//   return (
//     <Router>
//       <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
//         <Navbar handleOrderPopup={handleOrderPopup} />

//         <Routes>
//           {/* Home page */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <Hero handleOrderPopup={handleOrderPopup} />
//                 <Categories />
//                 <Products />
//                 <TopProducts handleOrderPopup={handleOrderPopup} />
//                 <Banner />
//                 <Subscribe />
//                 <Testimonials />
//               </>
//             }
//           />

//           {/* Category items page */}
//           <Route path="/category/:name" element={<CategoryItems />} />
//           <Route path="/cart" element={<CartPage />} />
//            <Route path="/" element={<Products />} />
//            <Route path="/" element={<TopProducts />} />
//            <Route path="/orders" element={<OrderList />} />
//         </Routes>

//         <Footer />
//         <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
//       </div>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";

// Pages
import Categories from "./category/Categories";
import CategoryItems from "./category/CategoryItems";
import CartPage from "./category/CartPage";
import OrderList from "./category/OrderList";
import Whishlist from "./category/Whishlist";
import Wishlist from "./category/Whishlist";
import LoginPage from "./category/LoginPage";
import RegisterPage from "./category/RegisterPage";
import Profile from "./category/Profile";

const App = () => {
  const [orderPopup, setOrderPopup] = useState(false);
  const handleOrderPopup = () => setOrderPopup(!orderPopup);

  useEffect(() => {
    AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar handleOrderPopup={handleOrderPopup} />

        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <Hero handleOrderPopup={handleOrderPopup} />
                <Categories />
                <Products />
                <TopProducts handleOrderPopup={handleOrderPopup} />
                <Banner />
                <Subscribe />
                <Testimonials />
              </>
            }
          />

          {/* Category items page */}
          <Route path="/category/:name" element={<CategoryItems />} />
          <Route path="/cart" element={<CartPage />} />

          {/* OrderList page */}
          <Route path="/orders" element={<OrderList />} />

         <Route path="/wishlist" element={<Wishlist />} /> {/* ✅ Add this */}
         <Route path="login" element = {<LoginPage />} />
         <Route path="register" element = {<RegisterPage />} />
         <Route path="profile" element = {<Profile />} />

        </Routes>

        <Footer />
        <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
    </Router>
  );
};

export default App;
