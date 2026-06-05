import axios from "axios";

const API_URL =
  "http://localhost:5000/categories";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getCategories =
  async () => {
    const response =
      await axios.get(
        API_URL,
        getAuthHeaders()
      );

    return response.data;
  };

export const createCategory =
  async (name: string) => {
    const response =
      await axios.post(
        API_URL,
        {
          name,
        },
        getAuthHeaders()
      );

    return response.data;
  };