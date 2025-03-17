import React, { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { ThemeContext } from "../../context/ThemeContext";
import logo from "../../assets/images/logo.png"
const Navbar = ({ activeMenu }) => {
  const { theme } = useContext(ThemeContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className={`flex gap-5 ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-black"} border-b backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30`}>
      {/* Toggle SideMenu */}
      <button
        className={`block lg:hidden ${theme === "dark" ? "text-white" : "text-black"}`}
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
      </button>

      {/* Navbar title */}
      <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
      <h2 className="text-lg font-medium">FinTrack</h2>

      {/* Show SideMenu when open */}
      {openSideMenu && (
        <div className={`fixed top-[61px] -ml-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} border border-gray-600 p-3 rounded-md`}>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
