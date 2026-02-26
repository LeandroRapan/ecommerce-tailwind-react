import { useState } from "react";
import { addCategory, deleteCategory } from "../../services/firebase/firestore/adminHandlers";

const CategoryManager = () => {
  const [categoryLabel, setCategoryLabel] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryOrder, setCategoryOrder] = useState("");

  const handleAddCategory = async () => {
    try {
      await addCategory({
        label: categoryLabel,
        slug: categorySlug,
        order: Number(categoryOrder),
      });
      alert("Category added successfully!");
      setCategoryLabel("");
      setCategorySlug("");
      setCategoryOrder("");
    } catch (error) {
      console.log(error);
      alert(error?.message || "Failed to add category.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(categoryLabel);
      alert(result);
      setCategoryLabel("");
    } catch (error) {
      alert("Failed to delete category.");
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Agregar o editar categorias</h2>

      <input
        type="text"
        className="border p-2 rounded w-full mb-2"
        placeholder="Label (ej: Celulares)"
        value={categoryLabel}
        onChange={(e) => setCategoryLabel(e.target.value)}
      />

      <input
        type="text"
        className="border p-2 rounded w-full mb-2"
        placeholder="Slug para rutas: sin espacios, mayúsculas, acentos"
        value={categorySlug}
        onChange={(e) => setCategorySlug(e.target.value)}
      />

      <input
        type="number"
        className="border p-2 rounded w-full mb-2"
        placeholder="Order (ej: 1)"
        value={categoryOrder}
        onChange={(e) => setCategoryOrder(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleAddCategory}
      >
        Agregar categoria
      </button>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleDeleteCategory}
      >
        Borrar categoria
      </button>
    </section>
  );
};

export default CategoryManager;
