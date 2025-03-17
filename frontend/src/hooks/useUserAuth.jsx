import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext); // Get user functions from context
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (user) return; // If user already exists, no need to fetch again

    let isMounted = true; // Track component mount state

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data); // Update user info in context
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);

        if (isMounted) {
          clearUser(); // Clear user data on failure
          navigate("/login"); // Redirect to login page
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, [user, updateUser, clearUser, navigate]); // Dependencies for useEffect
};
