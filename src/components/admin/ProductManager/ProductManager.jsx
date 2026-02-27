// src/components/admin/ProductManager/ProductManager.jsx
import { useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 99f860d (se agrego la diferenciacion de tipo de compra, si ondemand o en stock, para en el futuro aplicar pasarelas de pago facilmente, esto fue en  el ProductManager, resta pasarlo a el checkout)
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../../services/firebase/firestore/adminHandlers";
<<<<<<< HEAD
=======
import { addProduct, deleteProduct, updateProduct } from "../../../services/firebase/firestore/adminHandlers";
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
=======
>>>>>>> 99f860d (se agrego la diferenciacion de tipo de compra, si ondemand o en stock, para en el futuro aplicar pasarelas de pago facilmente, esto fue en  el ProductManager, resta pasarlo a el checkout)
import AddProductSection from "./sections/AddProductSection.jsx";
import EditProductSection from "./sections/EditProductSection.jsx";

const ProductManager = () => {
  const emptyProduct = {
    name: "",
    slug: "",
    price: "",
    stock: "",
<<<<<<< HEAD
<<<<<<< HEAD
    purchaseMode: "whatsapp",
=======
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
=======
    purchaseMode: "whatsapp",
>>>>>>> 99f860d (se agrego la diferenciacion de tipo de compra, si ondemand o en stock, para en el futuro aplicar pasarelas de pago facilmente, esto fue en  el ProductManager, resta pasarlo a el checkout)
    videoLink: "",
    description: "",
    gama: "",
    searchTokens: "",
    category: "",
    images: [],
    changefreq: "weekly",
    updatedAt: "",
  };

  const [productData, setProductData] = useState(emptyProduct);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

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

  const onProductSelection = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
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
    <>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 99f860d (se agrego la diferenciacion de tipo de compra, si ondemand o en stock, para en el futuro aplicar pasarelas de pago facilmente, esto fue en  el ProductManager, resta pasarlo a el checkout)
      <AddProductSection
        productData={productData}
        setProductData={setProductData}
        onAdd={handleAddProduct}
      />
<<<<<<< HEAD
=======
      <AddProductSection productData={productData} setProductData={setProductData} onAdd={handleAddProduct} />
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
=======
>>>>>>> 99f860d (se agrego la diferenciacion de tipo de compra, si ondemand o en stock, para en el futuro aplicar pasarelas de pago facilmente, esto fue en  el ProductManager, resta pasarlo a el checkout)

      <EditProductSection
        editedProduct={editedProduct}
        setEditedProduct={setEditedProduct}
        onProductSelection={onProductSelection}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ProductManager;
