import axios from "axios";

const API_URL = "http://localhost:5000/products";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getProducts = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeaders()
  );

  return response.data;
};

export const createProduct = async (
  product: any
) => {
  const response = await axios.post(
    API_URL,
    product,
    getAuthHeaders()
  );

  return response.data;
};

export const deleteProduct = async (
  id: number
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );

  return response.data;
};

export const updateProduct = async (
  id: number,
  product: any
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    product,
    getAuthHeaders()
  );

  return response.data;
};