import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import InventoryPage
from "./pages/InventoryPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={<DashboardPage />}
          />

          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="/categories"
            element={<CategoriesPage />}
          />

          <Route
            path="/inventory"
            element={<InventoryPage />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;