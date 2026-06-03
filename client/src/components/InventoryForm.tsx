import { useEffect, useState } from "react";
import axios from "axios";

interface InventoryFormProps {
  type: "PURCHASE" | "SALE";
  onSuccess: () => void;
}

function InventoryForm({
  type,
  onSuccess,
}: InventoryFormProps) {
  const [products, setProducts] =
    useState<any[]>([]);

  const [formData, setFormData] =
    useState({
      productId: "",
      boxQuantity: "",
      unitQuantity: "",
      notes: "",
    });

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get(
        "http://localhost:5000/products"
      );

      setProducts(response.data);
    };

    loadProducts();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const endpoint =
        type === "PURCHASE"
          ? "purchase"
          : "sale";

      await axios.post(
        `http://localhost:5000/inventory/${endpoint}`,
        {
          productId: Number(
            formData.productId
          ),
          boxQuantity: Number(
            formData.boxQuantity
          ),
          unitQuantity: Number(
            formData.unitQuantity
          ),
          notes: formData.notes,
        }
      );

      setFormData({
        productId: "",
        boxQuantity: "",
        unitQuantity: "",
        notes: "",
      });

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4">
        {type === "PURCHASE"
          ? "Purchase Stock"
          : "Sell Stock"}
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <select
          value={formData.productId}
          onChange={(e) =>
            setFormData({
              ...formData,
              productId: e.target.value,
            })
          }
          className="border p-2 rounded"
        >
          <option value="">
            Select Product
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Boxes"
          value={formData.boxQuantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              boxQuantity: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Units"
          value={formData.unitQuantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              unitQuantity: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) =>
            setFormData({
              ...formData,
              notes: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className={`text-white rounded py-2 ${
            type === "PURCHASE"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {type === "PURCHASE"
            ? "Purchase Stock"
            : "Sell Stock"}
        </button>
      </form>
    </div>
  );
}

export default InventoryForm;