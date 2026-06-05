import axios from "axios";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getDashboardStats =
  async () => {
    const response =
      await axios.get(
        "http://localhost:5000/dashboard",
        getAuthHeaders()
      );

    return response.data;
  };