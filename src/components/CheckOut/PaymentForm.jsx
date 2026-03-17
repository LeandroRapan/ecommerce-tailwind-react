import { RiWhatsappLine } from "react-icons/ri";

const PaymentForm = ({
  onConfirm,
  disabled = false,
  submitLabel = "Comprar"
}) => {
  return (
    <div className="payment-form">
      <form onSubmit={onConfirm}>
        
        <label htmlFor="nombre">Nombre completo:</label>
        <input
          type="text"
          id="nombre"
          name="name"
          placeholder="Tu nombre"
          required
          disabled={disabled}
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tunombre@mail.com"
          required
          disabled={disabled}
        />
        <br />

        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Tu dirección"
          required
          disabled={disabled}
        />
        <br />

        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="phone"
          placeholder="221..."
          required
          disabled={disabled}
        />
        <br />

        <button
          type="submit"
          disabled={disabled}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <RiWhatsappLine />
          {submitLabel}
        </button>

      </form>
    </div>
  );
};

export default PaymentForm;