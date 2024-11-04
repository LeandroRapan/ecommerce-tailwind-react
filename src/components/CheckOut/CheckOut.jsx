import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./paymentForm";
import { CartContext } from "../context/CartContext";
import { StockHanddler } from "../../services/firebase/firestore/StockHanddler";
import { createOrder } from "./createOrder";
import { orderGenerator } from "../../services/firebase/firestore/orderGenerator";
import WhatsappHandler from "./WhatsappHandler";

const CheckOut = () => {
  const { cart, total , clearCart} = useContext(CartContext);
  const [orderId, setOrderId]= useState(null);
  const navigate= useNavigate()
  const [auxCart, setAuxCart]= useState([])
 
  console.log("cart del check", cart)
 console.log("auxcart del check////////////////", auxCart)
  const handleConfirm = async (formCheckData) => {
    formCheckData.preventDefault()
    let payment = {};


  try {
    setAuxCart(JSON.parse(JSON.stringify(cart)));
    let objOrder=createOrder(formCheckData, cart, total);
    
    
    const {batch, outOfStock}= await StockHanddler(cart);
    if (!batch) {
     
      return; // Salimos si batch es null
    }
    
    const id= await orderGenerator(objOrder, batch, outOfStock, clearCart, navigate); 
    setOrderId(id);
    }
   catch(error) {
    console.log(("error generando la orden",error));
  }
}

  //retorno para el browser
  return (
    <div className="lg:pl-32">
      {/* <h1>Checkout</h1>
      {
      user?<h2>  {`Hola ${user}, para estar seguros, tu email es: ${email}`}</h2>
      : <h2>{`Para estar seguros, tu email es: ${email}`}</h2>
      } */}

     <PaymentForm onConfirm={handleConfirm}/>
     {orderId && <WhatsappHandler cart={auxCart} orderId={orderId}/>}
     

      {/* <Form onConfirm={handleConfirm}/>  */}
      {/* { orderId ? <h2>El id de su orden es: {orderId}</h2> : <button onClick={handleConfirm}>Generar orden</button> } */}
    </div>
  );
};

export default CheckOut;
