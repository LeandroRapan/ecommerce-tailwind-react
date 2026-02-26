// src/components/admin/ProductManager/fields/CategorySelect.jsx
import { useEffect, useState } from "react";
import { getCategories } from "../../../../services/firebase/firestore/adminHandlers";

const CategorySelect = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Seleccionar categoría",
}) => {
  const [categories, setCategories] = useState([]); // {id,label,slug,order}
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const cats = await getCategories();
        if (mounted) setCategories(Array.isArray(cats) ? cats : []);
      } catch (e) {
        console.log("CategorySelect getCategories error:", e);
        if (mounted) setCategories([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const isDisabled = disabled || loading || categories.length === 0;

  return (
    <label className="flex flex-col mb-2">
      <span className="text-sm text-gray-400 mb-1">Categoría</span>
      <select
        className="border p-2 rounded"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={isDisabled}
      >
        <option value="" disabled>
          {loading
            ? "Cargando categorías..."
            : categories.length === 0
            ? "No hay categorías"
            : placeholder}
        </option>

        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.label}
          </option>
        ))}
      </select>

      <p className="text-xs text-gray-400 mt-1">
        Se guarda el <b>slug</b> en el producto.
      </p>
    </label>
  );
};

export default CategorySelect;
