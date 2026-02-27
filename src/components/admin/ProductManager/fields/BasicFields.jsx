// src/components/admin/ProductManager/fields/BasicFields.jsx
const BasicFields = ({ value, onChange }) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const isCheckout = value.purchaseMode === "checkout"; 
=======
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
=======
  const isCheckout = value.purchaseMode === "checkout"; 
>>>>>>> 99f860d (se agrego la diferenciacion de tipo de compra, si ondemand o en stock, para en el futuro aplicar pasarelas de pago facilmente, esto fue en  el ProductManager, resta pasarlo a el checkout)
  return (
    <>
      <input
        type="text"
        className="border p-2 rounded w-full mb-2"
        placeholder="Nombre"
        value={value.name}
        onChange={(e) => onChange("name", e.target.value)}
      />

      <input
        type="number"
        className="border p-2 rounded w-full mb-2"
        placeholder="Precio"
        value={value.price}
        onChange={(e) => onChange("price", e.target.value)}
      />
<<<<<<< HEAD
<<<<<<< HEAD
     {isCheckout && (
=======

>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
=======
     {isCheckout && (
>>>>>>> 99f860d (se agrego la diferenciacion de tipo de compra, si ondemand o en stock, para en el futuro aplicar pasarelas de pago facilmente, esto fue en  el ProductManager, resta pasarlo a el checkout)
      <input
        type="number"
        className="border p-2 rounded w-full mb-2"
        placeholder="Stock"
        value={value.stock}
        onChange={(e) => onChange("stock", e.target.value)}
      />
<<<<<<< HEAD
<<<<<<< HEAD
     )}
      
=======
>>>>>>> 7ef5e6f (se modularizo product manager, ademas se corrigieron los links de productos para que no se nombren con id sino con el slug para ser mas descriptivos)
=======
     )}
      
>>>>>>> 99f860d (se agrego la diferenciacion de tipo de compra, si ondemand o en stock, para en el futuro aplicar pasarelas de pago facilmente, esto fue en  el ProductManager, resta pasarlo a el checkout)

      <input
        type="text"
        className="border p-2 rounded w-full mb-2"
        placeholder="SearchTokens (separados por espacio)"
        value={value.searchTokens}
        onChange={(e) => onChange("searchTokens", e.target.value)}
      />

      <textarea
        className="border p-2 rounded w-full mb-2 bg-slate-700"
        placeholder="Descripción"
        rows={6}
        value={value.description}
        onChange={(e) => onChange("description", e.target.value)}
      />
    </>
  );
};

export default BasicFields;
