import { useState } from "react";
import { addProduct, deleteProduct, updateProduct } from "../../services/firebase/firestore/adminHandlers";
import Search from "../shared/Search";
import MultiImageUploader from "./multiImageUploader";

const ProductManager = () => {
  const emptyProduct = {
    name: "",
    price: 0,
    cant: 0,
    img: "",
    videoLink: "",
    meliLink: "",
    description: "",
    gama: "",
    searchTokens: "",
    category: "",
    images: [],
    changefreq: "weekly",
    updatedAt: "",
  };
  const GAMA_OPTIONS = [
  "baja",
  "mediabaja",
  "media",
  "mediaalta",
  "premium",
  "superpremium",
];

  const [productData, setProductData] = useState(emptyProduct);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleImagesChange = (newImages) => {
    setProductData(prev => ({ ...prev, images: newImages }));
  };

  const handleAddProduct = async () => {
    try {
      await addProduct({
        ...productData,
        updatedAt: new Date().toISOString(),
      });
      alert("Product added successfully!");
      setProductData(emptyProduct);
    } catch (error) {
      console.log(error);
      alert("Failed to add product.");
    }
  };

  const onProduct = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProduct.id);
      alert("product deleted");
      setEditedProduct(null);
      setSelectedProduct(null);
    } catch (error) {
      console.log(error);
      alert("failed");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduct({
        ...editedProduct,
        updatedAt: new Date().toISOString(),
      });
      alert("product edited");
      setSelectedProduct(editedProduct);
      setEditedProduct(null);
    } catch (error) {
      console.log(error);
      alert("edit product error");
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>

      {Object.keys(productData)
        .filter(key => !["images", "updatedAt", "changefreq", "gama"].includes(key))
        .map((key) => (
          <input
            key={key}
            type={key === "price" || key === "cant" ? "number" : "text"}
            className="border p-2 rounded w-full mb-2"
            placeholder={
              key === "price"
                ? "precio"
                : key === "cant"
                ? "cantidad"
                : key.charAt(0).toUpperCase() + key.slice(1)
            }
            onChange={(e) =>
              setProductData({ ...productData, [key]: e.target.value })
            }
          />
        ))}
        <label className="flex flex-col mb-2">
        <select value={productData.gama}
        onChange={(e)=>setProductData(prev=> ({...prev, gama:e.target.value}))}
        className="border p-2 rounded"
        >
            <option value="" disabled hidden>Seleccionar gama</option>
            {GAMA_OPTIONS.map(g=>(
                 <option key={g} value={g}>
                    {g}
                 </option>
            )

            )}

        </select>
        </label>

      <MultiImageUploader
        images={productData.images}
        onChange={handleImagesChange}
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddProduct}
      >
        Add Product
      </button>

      <section className="mt-10">
        <h2>Editar o borrar productos</h2>

        <Search
          onProductSelection={onProduct}
          renderResult={(product) => (
            <span>
              {product.name} - <span className="text-gray-400">{product.price} USD</span>
            </span>
          )}
        />

        {editedProduct && (
          <div className="mt-4 space-y-2">
            <form className="space-y-2">
              {Object.keys(editedProduct)
                .filter(key => !Array.isArray(editedProduct[key] && key !== "gama"))
                .map((key) => (
                  <label key={key} className="flex flex-col">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                    <input
                      type={key === "price" || key === "cant" ? "number" : "text"}
                      name={key}
                      value={editedProduct[key]}
                      onChange={handleEditInputChange}
                      className="border p-1 rounded"
                    />
                  </label>
                ))}
                <label className="flex flex-col">
  Gama:
  <select
    value={editedProduct.gama || ""}
    onChange={(e) =>
      setEditedProduct(prev => ({ ...prev, gama: e.target.value }))
    }
    className="border p-1 rounded"
  >
    <option value="">Seleccionar gama</option>
    {GAMA_OPTIONS.map(g => (
      <option key={g} value={g}>
        {g}
      </option>
    ))}
  </select>
</label>
            </form>

            <div className="flex gap-3">
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-3 py-1 rounded">
                Actualizar
              </button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
                Borrar
              </button>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default ProductManager;

