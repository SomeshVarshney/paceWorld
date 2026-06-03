import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">
          paceWorld
        </h1>

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

  <Link
    to="/categories"
    className="px-3 py-2 rounded hover:bg-gray-800"
  >
    Categories
  </Link>

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

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;