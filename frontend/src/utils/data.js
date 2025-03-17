import {  
    LuLayoutDashboard,  
    LuHandCoins,  
    LuWalletMinimal,  
    LuLogOut,  
  } from "react-icons/lu"; // Importing required icons from react-icons
  
  // Sidebar menu data
  export const SIDE_MENU_DATA = [
    {
      id: "01",
      label: "Dashboard",
      icon: LuLayoutDashboard,
      path: "/dashboard",
    },
    {
      id: "02",
      label: "Income",
      icon: LuWalletMinimal,
      path: "/income",
    },
    {
      id: "03",
      label: "Expense",
      icon: LuHandCoins,
      path: "/expense",
    },
    {
      id: "04", // Changed ID to maintain sequence
      label: "Logout",
      icon: LuLogOut,
      path: "/logout", // Fixed missing "/" to indicate route path
    },
  ];
  