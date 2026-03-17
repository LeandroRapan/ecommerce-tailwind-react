import { useState } from "react";
import PaymentForm from "./PaymentForm.jsx";
import { createOrder } from "./createOrder.jsx";
import WhatsappHandler from "./WhatsappHandler.jsx";
import useWhatsAppCart from "../customHooks/useWhatsAppCart.js";
import useInStockCart from "../customHooks/useInStockCart.js";
import { orderGeneratorWhatsApp } from "../../services/firebase/firestore/orderGeneratorWhatsApp.js";

const CheckOut = () => {
  const { items: waItems, total: waTotal, clearCart } = useWhatsAppCart();
  const { items: inStockItems, total: inStockTotal } = useInStockCart();

  const [waOrderId, setWaOrderId] = useState(null);
  const [auxCart, setAuxCart] = useState([]);

  const hasWhatsApp = waItems.length > 0;
  const hasInStock = inStockItems.length > 0;

  const handleConfirmWhatsApp = async (e) => {
    e.preventDefault();

    if (!hasWhatsApp) {
      alert("No hay productos para WhatsApp.");
      return;
    }

    try {
      // 🟨 snapshot estable para que WhatsappHandler tenga los items aunque luego se limpie el carrito
      const snapshot = JSON.parse(JSON.stringify(waItems));
      setAuxCart(snapshot);

      // 🟨 createOrder sigue recibiendo el evento + items + total
      const objOrder = createOrder(e, snapshot, waTotal);

      // 🟨 el generador ya agrega channel/paymentStatus/orderStatus/createdAt y hace clearCart()
      const id = await orderGeneratorWhatsApp(objOrder, clearCart);

      setWaOrderId(id);
    } catch (error) {
      console.log("error generando orden WhatsApp", error);
      alert("No se pudo generar la orden.");
    }
  };

  return (
    <div className="lg:pl-32 p-4">
      <h1 className="text-3xl text-[#D4BEE4] mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ===========================
            WhatsApp (ACTIVO)
           =========================== */}
        <div className="bg-[#1f1d2b] rounded-xl p-6 text-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl text-[#D4BEE4]">Comprar por WhatsApp</h2>
            <span className="text-sm text-green-300">Activo</span>
          </div>

          <p className="text-gray-400 mb-4">
            Se genera una orden y se abre WhatsApp con el mensaje listo.
          </p>

          <div className="mb-4 text-sm">
            <div className="flex justify-between">
              <span>Productos:</span>
              <span>{waItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span>${waTotal}</span>
            </div>
          </div>

          <PaymentForm
            disabled={!hasWhatsApp}
            onConfirm={handleConfirmWhatsApp}
            submitLabel="Enviar pedido por WhatsApp"
          />

          {waOrderId && <WhatsappHandler cart={auxCart} orderId={waOrderId} />}
        </div>

        {/* ===========================
            Pago Online (DESHABILITADO)
           =========================== */}
        <div className="bg-[#1f1d2b] rounded-xl p-6 text-gray-200 opacity-70">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl text-[#D4BEE4]">Pagar Online</h2>
            <span className="text-sm text-yellow-300">Próximamente</span>
          </div>

          <p className="text-gray-400 mb-4">
            Esta opción quedará activa cuando integremos pasarela. Ya está preparada
            la separación de carrito.
          </p>

          <div className="mb-4 text-sm">
            <div className="flex justify-between">
              <span>Productos con stock real:</span>
              <span>{inStockItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total pago online:</span>
              <span>${inStockTotal}</span>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="w-full bg-gray-600 text-white px-4 py-2 rounded cursor-not-allowed"
            title="Próximamente"
          >
            Pagar online (Próximamente)
          </button>

          {hasInStock && (
            <p className="text-xs text-gray-400 mt-3">
              Tenés productos que en el futuro irán por pago online. Hoy se envían por WhatsApp.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;