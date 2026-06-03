import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
} from "../api/categories";

function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await createCategory(name);

      setName("");

      loadCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Categories
      </h2>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <form
          onSubmit={handleSubmit}
          className="flex gap-4"
        >
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border rounded px-3 py-2 flex-1"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Category
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">
                ID
              </th>

              <th className="text-left p-2">
                Name
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b"
              >
                <td className="p-2">
                  {category.id}
                </td>

                <td className="p-2">
                  {category.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CategoriesPage;