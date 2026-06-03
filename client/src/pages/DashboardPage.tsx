import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";

function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalPurchases: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Products</h3>
          <p className="text-3xl font-bold">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Categories</h3>
          <p className="text-3xl font-bold">
            {stats.totalCategories}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Purchases</h3>
          <p className="text-3xl font-bold">
            {stats.totalPurchases}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Sales</h3>
          <p className="text-3xl font-bold">
            {stats.totalSales}
          </p>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;