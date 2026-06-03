import axios from "axios";

export const getDashboardStats = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboard"
  );

  return response.data;
};