import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Genera una orden para el flujo WhatsApp.
 *
 * Entrada:
 * - objOrder: objeto orden armado en createOrder / checkout
 * - clearCart: función del CartContext
 *
 * Salida:
 * - orderId: string del documento creado en Firestore
 *
 * Consume:
 * - CheckOut.jsx
 *
 * Brinda:
 * - orden persistida en "orders"
 *
 * Notas:
 * - NO descuenta stock
 * - NO usa StockHanddler
 * - NO confirma pago automáticamente
 */
export const orderGeneratorWhatsApp = async (objOrder, clearCart) => {
  try {
    const orderToSave = {
      ...objOrder,

      // 🟨 Metadatos mínimos del flujo WhatsApp
      channel: "whatsapp",
      paymentStatus: "pending_whatsapp",
      orderStatus: "pending",

      createdAt: Timestamp.now(),
    };

    const orderRef = collection(db, "orders");
    const orderAdded = await addDoc(orderRef, orderToSave);

    clearCart();

    return orderAdded.id;
  } catch (error) {
    console.log("error en orderGeneratorWhatsApp", error);
    throw error;
  }
};

/*
  FUTURO:
  - enviar mail de confirmación al cliente
  - notificar al dueño
  - crear panel admin para cambiar:
      paymentStatus: "pending_whatsapp" -> "paid"
      orderStatus: "pending" -> "confirmed"
      hacer Que el clearCart solo borre segun tipo orden
*/