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
    });

    return response.data; // Return response data
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error; // Rethrow error for further handling
  }
};

export default uploadImage; // Export function for use in other components
