import axios from "axios";

const API_URL = "http://localhost:5000/categories";

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCategory = async (name: string) => {
  const response = await axios.post(API_URL, {
    name,
  });

  return response.data;
};