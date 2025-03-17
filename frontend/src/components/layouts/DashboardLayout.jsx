import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar"; // Ensure Navbar is imported correctly
import SideMenu from "./SideMenu"; // Ensure SideMenu is imported correctly

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext); // Get user data from context
  return (
    <div className="">

      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          {/* Sidebar hidden on smaller screens */}
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main content area */}
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
