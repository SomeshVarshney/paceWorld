import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Products
      </h2>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Brand</th>
              <th className="text-left p-2">Boxes</th>
              <th className="text-left p-2">Units</th>
              <th className="text-left p-2">Category</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b"
              >
                <td className="p-2">
                  {product.name}
                </td>

                <td className="p-2">
                  {product.brand}
                </td>

                <td className="p-2">
                  {product.boxQuantity}
                </td>

                <td className="p-2">
                  {product.unitQuantity}
                </td>

                <td className="p-2">
                  {product.category?.name}
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