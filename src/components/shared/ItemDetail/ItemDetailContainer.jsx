import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductBySlug } from "../../../services/firebase/firestore/products";
import ItemDetail from "./ItemDetail";
import DynamicMetadata from "../../SEO/dynamicMetadata";

const ItemDetailContainer = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!slug) return;
    setLoading(true);
    getProductBySlug(slug)
      .then((p) => setProduct(p))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <h1>Cargando</h1>;
  if (!product) return <h1>Producto no encontrado</h1>;

  const images = Array.isArray(product.images) ? product.images : [];
  const mainImage = images[0] || "";

  return (
    <div>
      <DynamicMetadata
        productName={product.name}
        productCategory={product.category}
        productPrice={product.price}
        image={mainImage}
        description={product.description || `Compra ${product.name} al mejor precio`}
      />

      <ItemDetail {...product} images={images} />
    </div>
  );
};

export default ItemDetailContainer;
