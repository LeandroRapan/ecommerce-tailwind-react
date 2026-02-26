// src/components/admin/ProductManager/sections/EditProductSection.jsx
import Search from "../../../shared/Search";
import GamaSelect from "../fields/GamaSelect";
<<<<<<< HEAD
import PurchaseModeSelect from "../fields/PurchaseModSelect"; // 🟨 NUEVO
import CategorySelect from "../fields/CategorySelect"; // 🟨 (opcional pero recomendado)
=======
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)

const EditProductSection = ({
  editedProduct,
  setEditedProduct,
  onProductSelection,
  onUpdate,
  onDelete,
}) => {
  if (!editedProduct) {
    return (
      <section className="mt-10">
        <h2>Editar o borrar productos</h2>
        <Search
          onProductSelection={onProductSelection}
          renderResult={(product) => (
            <span>
<<<<<<< HEAD
              {product.name} -{" "}
              <span className="text-gray-400">{product.price} USD</span>
=======
              {product.name} - <span className="text-gray-400">{product.price} USD</span>
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
            </span>
          )}
        />
      </section>
    );
  }

<<<<<<< HEAD
  const isCheckout = editedProduct.purchaseMode === "checkout"; // 🟨

  const setField = (field, value) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setField(name, value);
  };

  const handleChangePurchaseMode = (mode) => {
    setEditedProduct((prev) => ({
      ...prev,
      purchaseMode: mode, // 🟨
      // 🟨 si pasa a whatsapp, limpiamos stock visualmente (igual adminHandlers lo fuerza a 0)
      stock: mode === "whatsapp" ? "" : prev.stock,
    }));
=======
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
  };

  return (
    <section className="mt-10">
      <h2>Editar o borrar productos</h2>

      <Search
        onProductSelection={onProductSelection}
        renderResult={(product) => (
          <span>
<<<<<<< HEAD
            {product.name} -{" "}
            <span className="text-gray-400">{product.price} USD</span>
=======
            {product.name} - <span className="text-gray-400">{product.price} USD</span>
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
          </span>
        )}
      />

<<<<<<< HEAD
      <div className="mt-4 space-y-3">
        <form className="space-y-3">
          {/* 🟨 Campos principales */}
          <label className="flex flex-col">
            Nombre:
            <input
              type="text"
              name="name"
              value={editedProduct.name ?? ""}
              onChange={handleEditInputChange}
              className="border p-1 rounded"
            />
          </label>

          <label className="flex flex-col">
            Slug:
            <input
              type="text"
              name="slug"
              value={editedProduct.slug ?? ""}
              onChange={handleEditInputChange}
              className="border p-1 rounded"
            />
            <span className="text-xs text-gray-400 mt-1">
              Para rutas: sin espacios, mayúsculas ni acentos.
            </span>
          </label>

          <label className="flex flex-col">
            Precio:
            <input
              type="number"
              name="price"
              value={editedProduct.price ?? ""}
              onChange={handleEditInputChange}
              className="border p-1 rounded"
            />
          </label>

          {/* 🟨 Modo de compra */}
          <PurchaseModeSelect
            value={editedProduct.purchaseMode ?? "whatsapp"}
            onChange={handleChangePurchaseMode}
          />

          {/* 🟨 Stock solo si checkout */}
          {isCheckout && (
            <label className="flex flex-col">
              Stock:
              <input
                type="number"
                name="stock"
                value={editedProduct.stock ?? ""}
                onChange={handleEditInputChange}
                className="border p-1 rounded"
              />
            </label>
          )}

          {/* 🟨 Category select (guarda slug) */}
          <label className="flex flex-col">
            Categoría:
            <CategorySelect
              value={editedProduct.category ?? ""}
              onChange={(slug) => setField("category", slug)}
            />
          </label>

          {/* 🟨 Gama */}
          <label className="flex flex-col">
            Gama:
            <GamaSelect
              value={editedProduct.gama || ""}
              onChange={(v) => setField("gama", v)}
            />
          </label>

          {/* 🟨 Video */}
          <label className="flex flex-col">
            Video (embed URL):
            <input
              type="text"
              name="videoLink"
              value={editedProduct.videoLink ?? ""}
              onChange={handleEditInputChange}
              className="border p-1 rounded"
            />
          </label>

          {/* 🟨 SearchTokens */}
          <label className="flex flex-col">
            SearchTokens:
            <input
              type="text"
              name="searchTokens"
              value={editedProduct.searchTokens ?? ""}
              onChange={handleEditInputChange}
              className="border p-1 rounded"
            />
          </label>

          {/* 🟨 Descripción */}
          <label className="flex flex-col">
            Descripción:
            <textarea
              name="description"
              value={editedProduct.description ?? ""}
              onChange={handleEditInputChange}
              className="border p-2 rounded bg-slate-700"
              rows={6}
            />
          </label>

          {/* 🟨 images: por ahora no lo edito acá, mejor en un ImagesEditor aparte */}
        </form>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onUpdate}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Actualizar
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
=======
      <div className="mt-4 space-y-2">
        <form className="space-y-2">
          {Object.keys(editedProduct)
            .filter((key) => !Array.isArray(editedProduct[key] && key !== "gama"))
            .map((key) => (
              <label key={key} className="flex flex-col">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
                <input
                  type={key === "price" || key === "stock" ? "number" : "text"}
                  name={key}
                  value={editedProduct[key]}
                  onChange={handleEditInputChange}
                  className="border p-1 rounded"
                />
              </label>
            ))}

          <label className="flex flex-col">
            Gama:
            <GamaSelect
              value={editedProduct.gama || ""}
              onChange={(v) => setEditedProduct((prev) => ({ ...prev, gama: v }))}
            />
          </label>
        </form>

        <div className="flex gap-3">
          <button onClick={onUpdate} className="bg-blue-500 text-white px-3 py-1 rounded">
            Actualizar
          </button>
          <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded">
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
            Borrar
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditProductSection;
