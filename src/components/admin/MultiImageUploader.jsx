import { useState } from "react";

export default function MultiImageUploader({ images, onChange }) {
  const [urls, setUrls] = useState(images || []);

  const handleAdd = () => {
    setUrls([...urls, ""]);
    onChange([...urls, ""]);
  };

  const handleChange = (index, value) => {
    const updated = [...urls];
    updated[index] = value;
    setUrls(updated);
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = urls.filter((_, i) => i !== index);
    setUrls(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-white shadow-md">
      <h3 className="text-xl font-semibold">Imágenes del producto</h3>

      <div className="space-y-3">
        {urls.map((url, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`URL de imagen #${index + 1}`}
              className="flex-1 border rounded-lg p-2 text-sm"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full text-sm"
      >
        Agregar imagen
      </button>
    </div>
  );
}
