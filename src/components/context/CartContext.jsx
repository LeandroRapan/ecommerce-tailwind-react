import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

// 🟨 Lee localStorage de forma segura
function getInitialCart() {
  try {
    const raw = localStorage.getItem("carrito");
    const parsed = JSON.parse(raw || "[]");

    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch (error) {
    console.log("Error leyendo carrito desde localStorage:", error);
    return [];
  }
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  /**
   * addItem
   * Entrada:
   * - productToAdd: {
   *     id,
   *     name,
   *     price,
   *     image,
   *     quantity,
   *     purchaseMode,
   *     stock
   *   }
   *
   * Salida:
   * - actualiza el estado global del carrito
   *
   * Consume:
   * - ItemDetail
   *
   * Brinda:
   * - CartContext
   */
  const addItem = (productToAdd) => {
    // 🟨 validación básica defensiva
    if (!productToAdd?.id) return;

    const safeQuantity = Number(productToAdd.quantity) || 0;
    if (safeQuantity <= 0) return;

    const normalizedProduct = {
      ...productToAdd,
      quantity: safeQuantity,
      price: Number(productToAdd.price) || 0,
      stock: Number(productToAdd.stock) || 0,
      purchaseMode: productToAdd.purchaseMode ?? "whatsapp",
      image: productToAdd.image ?? "",
    };

    setCart((prevCart) => {
      const existing = prevCart.find((prod) => prod.id === normalizedProduct.id);

      // 🟨 si no existe, se agrega
      if (!existing) {
        return [...prevCart, normalizedProduct];
      }

      // 🟨 si existe, se actualiza la cantidad
      return prevCart.map((prod) => {
        if (prod.id !== normalizedProduct.id) return prod;

        let newQuantity = prod.quantity + normalizedProduct.quantity;

        // 🟨 SOLO limitar si NO es whatsapp
        if (prod.purchaseMode !== "whatsapp") {
          const stockLimit = Number(prod.stock) || 0;

          if (newQuantity > stockLimit) {
            newQuantity = stockLimit;
          }
        }

        return {
          ...prod,
          quantity: newQuantity,
        };
      });
    });
  };

  /**
   * isInCart
   * Entrada:
   * - id: string
   *
   * Salida:
   * - boolean
   *
   * Consume:
   * - cualquier componente que necesite saber si el producto ya está en carrito
   *
   * Brinda:
   * - CartContext
   */
  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  // 🟨 memoiza cantidad total
  const totalQuantity = useMemo(() => {
    return cart.reduce((acc, prod) => acc + (Number(prod.quantity) || 0), 0);
  }, [cart]);

  // 🟨 memoiza total global
  const total = useMemo(() => {
    return cart.reduce(
      (acc, prod) => acc + (Number(prod.quantity) || 0) * (Number(prod.price) || 0),
      0
    );
  }, [cart]);

  /**
   * getTotal
   * Entrada:
   * - ninguna
   *
   * Salida:
   * - number (total global actual)
   *
   * Consume:
   * - componentes que quieran mantener la API anterior
   *
   * Brinda:
   * - CartContext
   */
  const getTotal = () => total;

  /**
   * getTotalFor
   * Entrada:
   * - items: array de productos
   *
   * Salida:
   * - number
   *
   * Consume:
   * - useWhatsAppCart / useInStockCart / futuros splits del carrito
   *
   * Brinda:
   * - CartContext
   */
  const getTotalFor = (items) => {
    if (!Array.isArray(items)) return 0;

    return items.reduce(
      (acc, prod) => acc + (Number(prod.quantity) || 0) * (Number(prod.price) || 0),
      0
    );
  };

  /**
   * removeItem
   * Entrada:
   * - id: string
   *
   * Salida:
   * - actualiza carrito removiendo el producto
   *
   * Consume:
   * - Cart.jsx
   *
   * Brinda:
   * - CartContext
   */
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((prod) => prod.id !== id));
  };

  /**
   * clearCart
   * Entrada:
   * - ninguna
   *
   * Salida:
   * - vacía todo el carrito
   *
   * Consume:
   * - checkout WhatsApp actual
   *
   * Brinda:
   * - CartContext
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * clearItemsByMode
   * Entrada:
   * - mode: string ("whatsapp", etc.)
   *
   * Salida:
   * - elimina del carrito solo los productos de ese modo
   *
   * Consume:
   * - futuro checkout mixto
   *
   * Brinda:
   * - CartContext
   */
  const clearItemsByMode = (mode) => {
    setCart((prevCart) =>
      prevCart.filter((prod) => prod.purchaseMode !== mode)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        totalQuantity,
        removeItem,
        isInCart,
        total,
        getTotal,
        getTotalFor,
        clearCart,
        clearItemsByMode, // 🟨 futuro
      }}
    >
      {children}
    </CartContext.Provider>
  );
};