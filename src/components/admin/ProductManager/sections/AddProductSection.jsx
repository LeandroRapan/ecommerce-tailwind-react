// src/components/admin/ProductManager/sections/AddProductSection.jsx
import { useState } from "react";
<<<<<<< HEAD
import BasicFields from "../fields/BasicFields.jsx";
import VideoLinkField from "../fields/VideoLinkField.jsx";
import GamaSelect from "../fields/GamaSelect.jsx";
import ImagesField from "../fields/ImagesField.jsx";
import CategorySelect from "../fields/CategorySelect.jsx";
import { slugify } from "../utils/slugify.js";
import PurchaseModeSelect from "../fields/PurchaseModSelect.jsx";
=======
import BasicFields from "../fields/BasicFields";
import VideoLinkField from "../fields/VideoLinkField";
import GamaSelect from "../fields/GamaSelect";
import ImagesField from "../fields/ImagesField";
import CategorySelect from "../fields/CategorySelect";
import { slugify } from "../utils/slugify";
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)

const AddProductSection = ({ productData, setProductData, onAdd }) => {
  const [isVideoValid, setIsVideoValid] = useState(true); // 🟨 NUEVO

 const onChangeField = (field, val) => {
  setProductData((prev) => {
    const next = { ...prev, [field]: val };

    //  GENERACION AUTOMATICA DE SLUG
    if (field === "name") {
      next.slug = slugify(val);
    }

    return next;
  });
};


  const onImagesChange = (imgs) => {
    setProductData((prev) => ({ ...prev, images: imgs }));
  };
<<<<<<< HEAD
  const onChangePurchaseMode = (mode) => {
    setProductData((prev) => ({
      ...prev,
      purchaseMode: mode, 
      stock: mode === "whatsapp" ? "" : prev.stock, 
    }));
  }
=======

>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>

      <BasicFields value={productData} onChange={onChangeField} />
      <p className="text-xs text-gray-400 mb-2">
  Slug (auto): <span className="text-gray-200">{productData.slug || "(vacío)"}</span>
</p>
<<<<<<< HEAD
       <PurchaseModeSelect
        value={productData.purchaseMode}
        onChange={onChangePurchaseMode}
      />
=======

>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)

      {/* 🟨 VIDEO separado */}
      <VideoLinkField
        value={productData.videoLink}
        onChange={(v) => onChangeField("videoLink", v)}
        onValidChange={(ok) => setIsVideoValid(ok)}
      />

      {/* 🟨 NUEVO: Category select (guarda slug en productData.category) */}
<CategorySelect
  value={productData.category}
  onChange={(slug) => onChangeField("category", slug)}
/>


      <GamaSelect value={productData.gama} onChange={(v) => onChangeField("gama", v)} />

      <ImagesField images={productData.images} onChange={onImagesChange} />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 disabled:opacity-50"
        onClick={onAdd}
        disabled={!isVideoValid} // 🟨 NUEVO
      >
        Add Product
      </button>
    </section>
  );
};

export default AddProductSection;
