// src/components/admin/ProductManager/fields/BasicFields.jsx
const BasicFields = ({ value, onChange }) => {
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

      <input
        type="number"
        className="border p-2 rounded w-full mb-2"
        placeholder="Stock"
        value={value.stock}
        onChange={(e) => onChange("stock", e.target.value)}
      />

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
