import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import InventoryPage from "./pages/InventoryPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Protected Routes */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <DashboardPage />
                    }
                  />

                  <Route
                    path="/products"
                    element={
                      <ProductsPage />
                    }
                  />

                  <Route
                    path="/categories"
                    element={
                      <CategoriesPage />
                    }
                  />

                  <Route
                    path="/inventory"
                    element={
                      <InventoryPage />
                    }
                  />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;