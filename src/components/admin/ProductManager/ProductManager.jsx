// src/components/admin/ProductManager/ProductManager.jsx
import { useState } from "react";
import { addProduct, deleteProduct, updateProduct } from "../../../services/firebase/firestore/adminHandlers";
import AddProductSection from "./sections/AddProductSection.jsx";
import EditProductSection from "./sections/EditProductSection.jsx";

const ProductManager = () => {
  const emptyProduct = {
    name: "",
    slug: "",
    price: "",
    stock: "",
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
      <AddProductSection productData={productData} setProductData={setProductData} onAdd={handleAddProduct} />

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
