import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductsById } from "../../../services/firebase/firestore/products";
import ItemDetail from "./ItemDetail";
import DynamicMetadata from "../../SEO/dynamicMetadata";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductsById(itemId)
      .then((product) => {
        setProduct(product);
        if (!product.name) {
          console.log("El producto no existe");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

  
    
  }, [itemId]);

  if (loading) {
    return <h1>Cargando</h1>;
  }
  return(
    <div>
        <DynamicMetadata
        productName={product.name}
        productBrand={product.brand}
        productCategory={product.category}
        productPrice={product.price}
        image={product.image}
        description={product.description || `Compra ${product.name} al mejor precio`}
      />
    <ItemDetail {...product
      
    }/>
    </div>
  )

 
};

export default ItemDetailContainer;