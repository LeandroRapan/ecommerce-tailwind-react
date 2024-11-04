import {
    documentId,
    getDocs,
    query,
    collection,
    where,
    writeBatch,
    addDoc,
  } from "firebase/firestore";
import { db } from "../firebaseConfig";
export const StockHanddler = async(cart)=>{

try {
    const ids = cart.map((prod) => prod.id);
  
  const productRef = query(
    collection(db, "products"),
    where(documentId(), "in", ids)
  );
  const productsAddedFromFirestore = await getDocs(productRef);

  const { docs } = productsAddedFromFirestore;

  //el batch que va a permitir ejecutar al mismo tiempo las funciones de la compra sobre firestore, para q no haya errores en el stock, por ejemplo ante compras simultaneas
  const batch = writeBatch(db);
  console.log("bath////////////////////", batch)

  const outOfStock = [];
  // iteracion que compara entre el stock del carro y el stock en la base de datos
  docs.forEach((doc) => {
    //stock del carrito
    const dataDoc = doc.data();
    //stock de base de datos
    const stockDb = dataDoc.stock;

    const productAddedToCart = cart.find((prod) => prod.id === doc.id);
    //evitamos undefined, si devuelve true sigue con la propiedad
    const prodQuantity = productAddedToCart?.quantity;

    if (stockDb >= prodQuantity) {
      //si los stock estan ok, actualizo a la referencia stock de la base de datos:
      batch.update(doc.ref, { stock: stockDb - prodQuantity });
    } //si no, pusheo a un array de productos fuera de stock:
    else {
      outOfStock.push({ id: doc, ...dataDoc });
    }
    
    
    
  });
  console.log("si llego aca deveria retornar el batch")

  return {batch, outOfStock}
} catch (error) {
  console.log("error en el stock handler",error);
  return {batch:null,outOfStock:null};

}

   
   


}