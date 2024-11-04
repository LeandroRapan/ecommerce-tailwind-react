import { useContext } from "react";
import { CartContext } from "../../../components/context/CartContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const orderGenerator = async(objOrder, batch, outOfStock,clearCart,navigate)=>{
   
    //si hay algo en el array de productos fuera de stock el else muestra un error, sino genera la orden actualizando la base de datos
   try {
    if (outOfStock.length === 0) {
        await batch.commit();
        objOrder.day= Timestamp.now();
        console.log(objOrder)

        const orderRef = collection(db, "orders");
        //creacion del documento orden
        const orderAdded = await addDoc(orderRef, objOrder);
  
        clearCart();
        setTimeout(() => {
            navigate('/');
        }, 5000);
    
        return orderAdded.id;
        
    } else {
        setNotification('error', 'Hay productos que no tienen stock disponible');
    }
   } catch (error) {
    console.log("error en el ordergen", error)
   }
    


}