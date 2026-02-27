// src/components/admin/ProductManager/fields/PurchaseModeSelect.jsx
const PurchaseModeSelect = ({ value, onChange }) => {
  return (
    <label className="flex flex-col mb-2">
      <span className="text-sm mb-1">Modo de compra</span>
      <select
        className="border p-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="whatsapp">WhatsApp (on-demand)</option>
        <option value="checkout">Pasarela (requiere stock)</option>
      </select>

      <span className="text-xs text-gray-400 mt-1">
        WhatsApp no usa stock real. Pasarela descuenta stock al pagar.
      </span>
    </label>
  );
};

export default PurchaseModeSelect;
