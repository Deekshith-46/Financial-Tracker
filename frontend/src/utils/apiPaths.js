export const BASE_URL = "http://localhost:5001"; // Fixed missing closing quote
// export const BASE_URL = "https://financial-tracker-backend-omega.vercel.app/";
// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },

  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },

  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`, // Fixed closing quote
    DOWNLOAD_INCOME: "/api/v1/income/downloadexcel", // Fixed missing quotes
  },

  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`, // Fixed incorrect syntax
    DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel", // Fixed missing quotes
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
