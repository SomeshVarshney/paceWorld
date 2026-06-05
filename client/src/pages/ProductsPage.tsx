import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../api/products";
import ProductForm from "../components/ProductForm";

function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);
  

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter(
  (product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    product.brand
      .toLowerCase()
      .includes(search.toLowerCase())
);

const handleDelete = async (
  id: number
) => {
  try {
    const confirmed = window.confirm(
      "Delete this product?"
    );

    if (!confirmed) return;

    await deleteProduct(id);

    loadProducts();
  } catch (error: any) {
    alert(
      error?.response?.data?.message ||
      "Failed to delete product"
    );
  }
};

const handleEdit = async (
  product: any
) => {
  const newName = prompt(
    "Enter new product name",
    product.name
  );

  if (!newName) return;

  try {
    await updateProduct(
      product.id,
      {
        ...product,
        name: newName,
        categoryId:
          product.categoryId,
      }
    );

    loadProducts();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Products
      </h2>

      {/* Product Form */}
{user.role === "ADMIN" && (
  <ProductForm
    onSuccess={loadProducts}
  />
)}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Brand</th>
              <th className="text-left p-2">Boxes</th>
              <th className="text-left p-2">Units</th>
              <th className="text-left p-2">Category</th>
              {user.role === "ADMIN" && (
                <th className="text-left p-2">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b"
              >
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.brand}</td>
                <td className="p-2">{product.boxQuantity}</td>
                <td className="p-2">{product.unitQuantity}</td>
                <td className="p-2">
                  {product.category?.name}
                </td>
                <td className="p-2">
                {user.role === "ADMIN" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEdit(product)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
              
                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400">
                    View Only
                  </span>
                )}
              </td>
                  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductsPage;