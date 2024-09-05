import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductsById } from "../../../services/firebase/firestore/products";
import ItemDetail from "./ItemDetail";

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
    <ItemDetail {...product}/>
    </div>
  )

 
};

export default ItemDetailContainer;