import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";

const Menu = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "Top Rated", link: "/#services" },
  { id: 3, name: "Kids Wear", link: "/#" },
  { id: 4, name: "Mens Wear", link: "/#" },
  { id: 5, name: "Electronics", link: "/#" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/#" },
  { id: 2, name: "Best Selling", link: "/#" },
  { id: 3, name: "Top Rated", link: "/#" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // User state

  // Load user from localStorage (replace with your auth logic)
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="ShopVerse" className="w-12 h-12" />
                 𝑺𝒉𝒐𝒑𝑽𝒆𝒓𝒔𝒆.𝒊𝒏
            </a>
          </div>

          {/* search bar and buttons */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* Profile/Login Dropdown */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setOpen(!open)}
                    className="bg-gradient-to-r from-green-500 to-cyan-400 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
                  >
                    <span className="group-hover:block hidden transition-all duration-200">
                      {user.name}
                    </span>
                    <FaUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
                  </button>

                  {/* Dropdown */}
                  {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-green-500 to-cyan-400 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
                >
                  <span className="group-hover:block hidden transition-all duration-200">
                    Login
                  </span>
                  <FaUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
                </button>
              )}
            </div>

            {/* Wishlist button */}
            <button
              onClick={() => navigate("/wishlist")}
              className="bg-gradient-to-r from-blue-500 to-pink-400 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Like
              </span>
              <FaHeart className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>

            {/* Cart button */}
            <button
              onClick={() => navigate("/cart")}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Cart
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>

            {/* Darkmode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* lower Navbar */}
      <div className="flex justify-center" data-aos="zoom-in">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}

          {/* Simple Dropdown */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Trending Products
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
