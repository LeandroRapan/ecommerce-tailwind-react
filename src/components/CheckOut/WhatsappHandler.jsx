import React, { useEffect } from "react";

const WhatsappHandler = ({ cart = [], orderId }) => {
  // Solo números (recomendado por wa.me)
  const ownerPhoneNumber = "542215389912";

  const generateWhatsAppMessage = () => {
    const message = cart
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} = $${item.price * item.quantity}`
      )
      .join("%0A");

    return `Hola, quiero comprar estos productos:%0A${message}%0A%0AOrden ID: ${orderId}`;
  };

  const handleRedirectToWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const whatsappLink = `https://wa.me/${ownerPhoneNumber}?text=${message}`;

    window.open(whatsappLink, "_blank");
  };

  useEffect(() => {
    // Evita abrir WhatsApp si todavía no hay datos
    if (!orderId || cart.length === 0) return;

    handleRedirectToWhatsApp();
  }, [orderId, cart]);

  return null;
};

export default WhatsappHandler;