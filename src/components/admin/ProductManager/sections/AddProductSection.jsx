// src/components/admin/ProductManager/sections/AddProductSection.jsx
import { useState } from "react";
import BasicFields from "../fields/BasicFields.jsx";
import VideoLinkField from "../fields/VideoLinkField.jsx";
import GamaSelect from "../fields/GamaSelect.jsx";
import ImagesField from "../fields/ImagesField.jsx";
import CategorySelect from "../fields/CategorySelect.jsx";
import { slugify } from "../utils/slugify.js";
import PurchaseModeSelect from "../fields/PurchaseModSelect.jsx";

const AddProductSection = ({ productData, setProductData, onAdd }) => {
  const [isVideoValid, setIsVideoValid] = useState(true);

  const onChangeField = (field, val) => {
    setProductData((prev) => {
      const next = { ...prev, [field]: val };

      // Generación automática de slug
      if (field === "name") {
        next.slug = slugify(val);
      }

      return next;
    });
  };

  const onImagesChange = (imgs) => {
    setProductData((prev) => ({ ...prev, images: imgs }));
  };

  const onChangePurchaseMode = (mode) => {
    setProductData((prev) => ({
      ...prev,
      purchaseMode: mode,
      stock: mode === "whatsapp" ? "" : prev.stock,
    }));
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>

      <BasicFields value={productData} onChange={onChangeField} />

      <p className="text-xs text-gray-400 mb-2">
        Slug (auto): <span className="text-gray-200">{productData.slug || "(vacío)"}</span>
      </p>

      <PurchaseModeSelect
        value={productData.purchaseMode}
        onChange={onChangePurchaseMode}
      />

      <VideoLinkField
        value={productData.videoLink}
        onChange={(v) => onChangeField("videoLink", v)}
        onValidChange={(ok) => setIsVideoValid(ok)}
      />

      <CategorySelect
        value={productData.category}
        onChange={(slug) => onChangeField("category", slug)}
      />

      <GamaSelect
        value={productData.gama}
        onChange={(v) => onChangeField("gama", v)}
      />

      <ImagesField images={productData.images} onChange={onImagesChange} />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 disabled:opacity-50"
        onClick={onAdd}
        disabled={!isVideoValid}
      >
        Add Product
      </button>
    </section>
  );
};

export default AddProductSection;