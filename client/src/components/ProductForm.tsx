import { useEffect, useState } from "react";
import axios from "axios";

interface ProductFormProps {
  onSuccess: () => void;
}

function ProductForm({
  onSuccess,
}: ProductFormProps) {
  const [categories, setCategories] =
    useState<any[]>([]);

  const [formData, setFormData] =
    useState({
      name: "",
      brand: "",
      purchasePrice: "",
      sellingPrice: "",
      boxQuantity: "",
      unitQuantity: "",
      lowStockThreshold: "5",
      categoryId: "",
    });

  useEffect(() => {
    const loadCategories = async () => {
      const response = await axios.get(
        "http://localhost:5000/categories"
      );

      setCategories(response.data);
    };

    loadCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/products",
        {
          ...formData,
          purchasePrice: Number(
            formData.purchasePrice
          ),
          sellingPrice: Number(
            formData.sellingPrice
          ),
          boxQuantity: Number(
            formData.boxQuantity
          ),
          unitQuantity: Number(
            formData.unitQuantity
          ),
          lowStockThreshold: Number(
            formData.lowStockThreshold
          ),
          categoryId: Number(
            formData.categoryId
          ),
        }
      );

      onSuccess();

      setFormData({
        name: "",
        brand: "",
        purchasePrice: "",
        sellingPrice: "",
        boxQuantity: "",
        unitQuantity: "",
        lowStockThreshold: "5",
        categoryId: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="purchasePrice"
          placeholder="Purchase Price"
          value={formData.purchasePrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="sellingPrice"
          placeholder="Selling Price"
          value={formData.sellingPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
  name="boxQuantity"
  placeholder="Boxes"
  value={formData.boxQuantity}
  onChange={handleChange}
  className="border p-2 rounded"
/>

<input
  name="unitQuantity"
  placeholder="Units"
  value={formData.unitQuantity}
  onChange={handleChange}
  className="border p-2 rounded"
/>

<input
  name="lowStockThreshold"
  placeholder="Low Stock Threshold"
  value={formData.lowStockThreshold}
  onChange={handleChange}
  className="border p-2 rounded"
/>

<select
  name="categoryId"
  value={formData.categoryId}
  onChange={handleChange}
  className="border p-2 rounded"
>
  <option value="">
    Select Category
  </option>

  {categories.map((category) => (
    <option
      key={category.id}
      value={category.id}
    >
      {category.name}
    </option>
  ))}
</select>

<button
  type="submit"
  className="bg-green-600 text-white rounded"
>
  Add Product
</button>
      </form>
    </div>
  );
}

export default ProductForm;