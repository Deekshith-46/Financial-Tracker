import React, { createContext, useState } from "react";

// Create a context for user data
export const UserContext = createContext();

// UserProvider component to manage user state
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Fixed syntax error

  // Function to update user data (e.g., on login)
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children} {/* Fixed incorrect placement */}
    </UserContext.Provider>
  );
};

export default UserProvider; // Fixed incorrect export statement
