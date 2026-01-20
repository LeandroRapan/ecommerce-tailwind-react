import { db } from "../firebaseConfig";
import {
  addDoc,
  deleteDoc,
  doc,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
// Normalizacion
function normalizeSearchTokens(searchTokens) {
  if (Array.isArray(searchTokens)) {
    return searchTokens.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof searchTokens === "string") {
    return searchTokens
      .split(" ")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];
  return images.map((u) => String(u).trim()).filter(Boolean);
}

// =========================
// Categories
// =========================
export const addCategory = async (categoryName) => {
  try {
    const categoryRef = collection(db, "categories");
    await addDoc(categoryRef, { label: categoryName });
    return "category added successfully";
  } catch (error) {
    console.log(error, "la categoria no pudo agregarse");
  }
};

export const deleteCategory = async (categoryName) => {
  try {
    const categoryRef = collection(db, "categories");
    const categoryQuery = query(
      categoryRef,
      where("label", "==", categoryName)
    );
    const querySnapshot = await getDocs(categoryQuery);

    if (!querySnapshot.empty) {
      for (const docSnapshot of querySnapshot.docs) {
        await deleteDoc(doc(db, "categories", docSnapshot.id));
      }
      return "Category deleted successfully";
    } else {
      return "Category not found";
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
// =========================
// 🟨 Product payload builder
// =========================
function buildProductPayload(data) {
  return {
    name: data.name ?? "",
    price: Number(data.price) || 0,
    stock: Number(data.stock) || 0,
    images: normalizeImages(data.images),
    videoLink: data.videoLink ?? "",
    description: data.description ?? "",
    gama: data.gama ?? "",
    searchTokens: normalizeSearchTokens(data.searchTokens),
    category: data.category ?? "",
    changefreq: data.changefreq || "weekly",
    updatedAt: new Date().toISOString()
  };
}
// =========================
// Products
// =========================
export const addProduct = async (productData) => {
  try {
   

    const payload = buildProductPayload(productData)
    const productRef = collection(db, "products");
    await addDoc(productRef, payload);
    return "Product added successfully";
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const addOffer = async (offerData) => {
  try {
    const { img } = offerData;
    const offerRef = collection(db, "offers");
    await addDoc(offerRef, { img });
    return "Offer added successfully";
  } catch (error) {
    console.error("Error adding offer:", error);
    throw error;
  }
};

export const updateProduct = async (editedProduct) => {
  try {
    if (!editedProduct.id) alert("invalid ID");
    const productRef = doc(db, "products", editedProduct.id);
    const payload = buildProductPayload(editedProduct);
    await updateDoc(productRef, payload);
    console.log("producto acualizado correctamente");
  } catch (error) {
    console.log(error);
  }
};



export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    alert("producto borrado correctamente");
  } catch (error) {
    alert("producto no borrado");
    console.log(error);
    throw error;
  }
};

