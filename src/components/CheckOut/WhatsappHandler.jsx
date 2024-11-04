import React from "react";
const WhatsappHandler = ({cart, orderId})=>{
    const ownerPhoneNumber = '+542215389912'; // Número del dueño en formato internacional

  const generateWhatsAppMessage = () => {
    const message = cart
    .map(item => `- ${item.name} x${item.quantity} = $${item.price * item.quantity}`)
    .join('%0A'); // %0A es el código para salto de línea en URL
    console.log("cart del whathandler/////////////////",cart)
  return `Hola, quiero comprar estos productos:%0A${message}%0A%0AOrden ID: ${orderId}`;
      
  };

  const handleRedirectToWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const whatsappLink = `https://wa.me/${ownerPhoneNumber}?text=${message}`;
    window.open(whatsappLink, '_blank');
  };

  // Ejecutamos la redirección a WhatsApp cuando el componente se renderiza
  React.useEffect(() => {
    handleRedirectToWhatsApp();
  }, []);
}
export default WhatsappHandler;