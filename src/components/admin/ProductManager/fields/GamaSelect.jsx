// src/components/admin/ProductManager/fields/GamaSelect.jsx
const DEFAULT_OPTIONS = ["baja", "mediabaja", "media", "mediaalta", "premium", "superpremium"];

const GamaSelect = ({ value, onChange, options = DEFAULT_OPTIONS }) => {
  return (
    <label className="flex flex-col mb-2">
      <select value={value} onChange={(e) => onChange(e.target.value)} className="border p-2 rounded">
        <option value="" disabled hidden>
          Seleccionar gama
        </option>
        {options.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </label>
  );
};

export default GamaSelect;
