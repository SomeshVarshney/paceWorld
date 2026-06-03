import axios from "axios";

const API_URL =
  "http://localhost:5000/inventory";

export const purchaseStock = async (
  data: any
) => {
  const response = await axios.post(
    `${API_URL}/purchase`,
    data
  );

  return response.data;
};

export const saleStock = async (
  data: any
) => {
  const response = await axios.post(
    `${API_URL}/sale`,
    data
  );

  return response.data;
};

export const getTransactions =
  async () => {
    const response = await axios.get(
      "http://localhost:5000/inventory/transactions"
    );

    return response.data;
  };