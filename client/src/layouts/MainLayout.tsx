import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({
  children,
}: MainLayoutProps) {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            PaceWorld ERP
          </h1>

          <div className="mb-8 border-b border-gray-700 pb-4">
            <p className="font-semibold">
              {user.name}
            </p>

            <p className="text-sm text-gray-400">
              {user.role}
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              className="px-3 py-2 rounded hover:bg-gray-800"
            >
              Dashboard
            </Link>

            <Link
              to="/products"
              className="px-3 py-2 rounded hover:bg-gray-800"
            >
              Products
            </Link>

            {user.role === "ADMIN" && (
              <Link
                to="/categories"
                className="px-3 py-2 rounded hover:bg-gray-800"
              >
                Categories
              </Link>
            )}

            <Link
              to="/inventory"
              className="px-3 py-2 rounded hover:bg-gray-800"
            >
              Inventory
            </Link>

            <div className="px-3 py-2">
              Transactions
            </div>
          </nav>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {children}
      </div>
    </div>
  );
}


export default MainLayout;