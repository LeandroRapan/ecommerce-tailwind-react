// src/components/admin/ProductManager/fields/VideoLinkField.jsx
import { useEffect, useState } from "react";
import { extractYouTubeEmbedUrl } from "../utils/youtube";

const VideoLinkField = ({
  value,
  onChange,       // (rawOrUrl) => void
  onValidChange,  // (isValid:boolean) => void
  label = "videoLink",
}) => {
  const [error, setError] = useState(""); // 🟨 NUEVO

  // 🟨 NUEVO: mantener al padre informado si está válido o no
  useEffect(() => {
    onValidChange?.(!error);
  }, [error]);

  const validateAndMaybeClean = (input) => {
    const res = extractYouTubeEmbedUrl(input);
    setError(res.ok ? "" : res.error);

    // Si es válido, guardamos solo el src embed (dato útil)
    onChange(res.ok ? res.url : input);
  };

  return (
    <div>
      <input
        type="text"
        className="border p-2 rounded w-full mb-2"
        placeholder="Video YouTube: pegá iframe o URL embed"
        value={value}
        onChange={(e) => validateAndMaybeClean(e.target.value)} // 🟨 CAMBIO: valida inmediato
        onBlur={(e) => validateAndMaybeClean(e.target.value)}   // 🟨 CAMBIO: valida al salir
        name={label}
      />

      {error ? (
        <p className="text-sm text-red-400 -mt-1 mb-2">{error}</p>
      ) : (
        <p className="text-xs text-gray-400 -mt-1 mb-2">
          Tip: YouTube → Compartir → Insertar. Podés pegar el iframe completo.
        </p>
      )}
    </div>
  );
};

export default VideoLinkField;
