import { RiWhatsappLine } from "react-icons/ri"
const PaymentForm = ({onConfirm})=>{


    return(
      <div className="payment-form">
        <form onSubmit={(onConfirm)}>
        <label htmlFor="nombre">Nombre completo:</label>
        <input
          type="text"
          id="nombre"
          name="name"
          defaultValue={"mi nombre"}
          required
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={"mi@mail.com"}
          required
        />
        <br />

        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          defaultValue={"mi casa"}
          required
        />
        <br />

        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="phone"
          defaultValue={4539000}
          required
        />
        <br />

        <input type="submit" value="Comprar" /> 
      </form>
      </div>
    )
}
export default PaymentForm