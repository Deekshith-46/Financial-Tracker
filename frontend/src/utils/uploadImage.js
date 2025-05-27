// import { API_PATHS } from "./apiPaths"; // Fixed incorrect colon
// import axiosInstance from "./axiosInstance"; // Import axios instance

// const uploadImage = async (imageFile) => {
//   const formData = new FormData(); // Create FormData object

//   // Append image file to FormData
//   formData.append("image", imageFile);

//   try {
//     // Send a POST request to upload the image
//     const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data", // Set correct header for file upload
//       },
//     });

//     return response.data; // Return response data
//   } catch (error) {
//     console.error("Error uploading the image:", error);
//     throw error; // Rethrow error for further handling
//   }
// };

// export default uploadImage; // Export function for use in other components


import { API_PATHS } from "./apiPaths"; // Fixed incorrect colon
import axiosInstance from "./axiosInstance"; // Import axios instance

const uploadImage = async (imageFile) => {
  const formData = new FormData(); // Create FormData object

  // Append image file to FormData
  formData.append("image", imageFile);

  try {
    // Send a POST request to upload the image
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set correct header for file upload
      },
      timeout: 5000, // Set timeout to 30 seconds
    });

    return response.data; // Return response data
  } catch (error) {
    console.error("Error uploading the image:", error);

    // Check if the error has a response from the server
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request data:", error.request);
    } else {
      // Something else went wrong
      console.error("Error message:", error.message);
    }

    throw error; // Rethrow error for further handling
  }
};

export default uploadImage; // Export function for use in other components
