
export function slugify(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")                 // separa acentos
    .replace(/[\u0300-\u036f]/g, "")  // elimina acentos
    .replace(/[^a-z0-9\s-]/g, "")     // elimina caracteres raros
    .replace(/\s+/g, "-")            // espacios -> guión
    .replace(/-+/g, "-")             // colapsa guiones
    .replace(/^-|-$/g, "");          // trim guiones
}
