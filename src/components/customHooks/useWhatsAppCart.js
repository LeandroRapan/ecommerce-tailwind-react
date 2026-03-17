import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function useWhatsAppCart() {
  const { cart, removeItem, clearCart } = useContext(CartContext);

  const items = useMemo(() => {
    return (cart || []).filter((p) => p.purchaseMode === "whatsapp");
  }, [cart]);

  const total = useMemo(() => {
    return items.reduce((sum, p) => sum + (p.price || 0) * (p.quantity || 0), 0);
  }, [items]);

  return {
    items, // productos a WhatsApp
    total,
    removeItem,
    clearCart,
  };
}
