// src/components/admin/ProductManager/utils/youtube.js

// 🟨 NUEVO: valida embed con parámetros opcionales
export function isValidYouTubeEmbedUrl(url) {
  const pattern = /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]{11}(\?.*)?$/;
  return pattern.test(String(url || "").trim());
}

// 🟨 NUEVO: extrae URL embed desde URL directa o iframe completo
export function extractYouTubeEmbedUrl(input) {
  const raw = String(input || "").trim();
  if (!raw) return { ok: true, url: "", error: "" }; // vacío es válido

  // Caso 1: URL
  if (raw.startsWith("http")) {
    if (!isValidYouTubeEmbedUrl(raw)) {
      return {
        ok: false,
        url: "",
        error: "Usá formato embed: https://www.youtube.com/embed/VIDEO_ID (puede tener ?params)",
      };
    }
    return { ok: true, url: raw, error: "" };
  }

  // Caso 2: iframe completo
  if (raw.toLowerCase().includes("<iframe")) {
    const m = raw.match(/src\s*=\s*["']([^"']+)["']/i);
    if (!m || !m[1]) {
      return { ok: false, url: "", error: "No se encontró src dentro del iframe." };
    }

    const src = String(m[1]).trim();

    if (!src.startsWith("http")) {
      return { ok: false, url: "", error: "El src del iframe no es una URL válida." };
    }

    if (!isValidYouTubeEmbedUrl(src)) {
      return {
        ok: false,
        url: "",
        error: "El src debe ser embed: https://www.youtube.com/embed/VIDEO_ID",
      };
    }

    return { ok: true, url: src, error: "" };
  }

  return {
    ok: false,
    url: "",
    error: "Pegá el iframe de YouTube o una URL embed (youtube.com/embed/...)",
  };
}
