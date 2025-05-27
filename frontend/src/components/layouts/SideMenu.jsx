import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import { ThemeContext } from "../../context/ThemeContext";
import { LuMoon, LuSun } from 'react-icons/lu';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div
      className={`w-64 h-[calc(100vh-61px)] p-5 sticky top-[61px] z-20 border-r transition-all ${
        theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-200"
      }`}
    >
      {/* Theme Toggle Button */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-medium">Let's Begin </h2>
        <button onClick={toggleTheme} className="p-2 rounded-md border cursor-pointer">
          {theme === "dark" ? <LuSun className="text-yellow-400" /> : <LuMoon className="text-gray-600" />}
        </button>
      </div>

      {/* User Profile Section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {/* {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile Image"
            className="w-20 h-20 rounded-full cursor-pointer object-cover"
          />
        ) : (
          <CharAvatar fullName={user?.fullName || "Guest"} width="w-20" height="h-20" style="text-xl" />
        )} */}
        {user?.profileImageUrl ? (
  <img
    src={user.profileImageUrl}
    alt="Profile Image"
    className="w-20 h-20 rounded-full cursor-pointer object-cover"
  />
) : (
  <img
    src="https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png" // Replace with the path to your default avatar image
    alt="Default Profile Image"
    className="w-20 h-20 rounded-full cursor-pointer object-cover bg-gray-300"
  />
)}
        <h5 className="font-medium leading-6">{user?.fullName || "Guest"}</h5>
      </div>

      {/* Side Menu Buttons */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 cursor-pointer rounded-lg mb-3 transition-all ${
            activeMenu === item.label
              ? "text-white bg-primary"
              : theme === "dark"
              ? "text-gray-300 hover:bg-gray-700"
              : "text-black hover:bg-gray-100"
          }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;