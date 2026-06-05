import axios from "axios";

const API_URL =
  "http://localhost:5000/inventory";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const purchaseStock = async (
  data: any
) => {
  const response = await axios.post(
    `${API_URL}/purchase`,
    data,
    getAuthHeaders()
  );

  return response.data;
};

export const saleStock = async (
  data: any
) => {
  const response = await axios.post(
    `${API_URL}/sale`,
    data,
    getAuthHeaders()
  );

  return response.data;
};

export const getTransactions =
  async () => {
    const response = await axios.get(
      `${API_URL}/transactions`,
      getAuthHeaders()
    );

    return response.data;
  };