import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">
          Paint Shop ERP
        </h1>

        <nav className="space-y-3">
          <div>Dashboard</div>
          <div>Products</div>
          <div>Categories</div>
          <div>Inventory</div>
          <div>Transactions</div>
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