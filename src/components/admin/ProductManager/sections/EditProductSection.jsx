// src/components/admin/ProductManager/sections/EditProductSection.jsx
import Search from "../../../shared/Search";
import GamaSelect from "../fields/GamaSelect";
import PurchaseModeSelect from "../fields/PurchaseModSelect.jsx";
import CategorySelect from "../fields/CategorySelect";

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
              {product.name} - <span className="text-gray-400">{product.price} USD</span>
            </span>
          )}
        />
      </section>
    );
  }

  const isCheckout = editedProduct.purchaseMode === "checkout";

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
      purchaseMode: mode,
      stock: mode === "whatsapp" ? "" : prev.stock,
    }));
  };

  return (
    <section className="mt-10">
      <h2>Editar o borrar productos</h2>

      <Search
        onProductSelection={onProductSelection}
        renderResult={(product) => (
          <span>
            {product.name} - <span className="text-gray-400">{product.price} USD</span>
          </span>
        )}
      />

      <div className="mt-4 space-y-3">
        <form className="space-y-3">
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

          <PurchaseModeSelect
            value={editedProduct.purchaseMode ?? "whatsapp"}
            onChange={handleChangePurchaseMode}
          />

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

          <label className="flex flex-col">
            Categoría:
            <CategorySelect
              value={editedProduct.category ?? ""}
              onChange={(slug) => setField("category", slug)}
            />
          </label>

          <label className="flex flex-col">
            Gama:
            <GamaSelect
              value={editedProduct.gama || ""}
              onChange={(v) => setField("gama", v)}
            />
          </label>

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
            Borrar
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditProductSection;