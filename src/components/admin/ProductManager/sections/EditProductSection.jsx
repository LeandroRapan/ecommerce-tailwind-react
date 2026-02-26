// src/components/admin/ProductManager/sections/EditProductSection.jsx
import Search from "../../../shared/Search";
import GamaSelect from "../fields/GamaSelect";

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

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
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
            Borrar
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditProductSection;
