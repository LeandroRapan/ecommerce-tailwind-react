import { useEffect, useMemo, useState } from "react";

const ImageLightboxCarousel = ({
  isOpen,
  images = [],
  startIndex = 0,
  title = "Imagen",
  onClose,
  onIndexChange, // opcional
}) => {
  const hasImages = Array.isArray(images) && images.length > 0;
  const hasMultiple = Array.isArray(images) && images.length > 1;

  // 🟨 NUEVO: index interno del carrusel (vive acá, no en ItemDetail)
  const [index, setIndex] = useState(startIndex);

  // 🟨 NUEVO: cuando se abre o cambia startIndex, sincroniza
  useEffect(() => {
    if (!isOpen) return;
    setIndex(startIndex);
  }, [isOpen, startIndex]);

  const currentImage = useMemo(() => {
    if (!hasImages) return "";
    const safe = Math.min(Math.max(index, 0), images.length - 1);
    return images[safe] || "";
  }, [hasImages, images, index]);

  const goPrev = () => {
    if (!hasMultiple) return;
    setIndex((prev) => {
      const next = prev === 0 ? images.length - 1 : prev - 1;
      onIndexChange?.(next);
      return next;
    });
  };

  const goNext = () => {
    if (!hasMultiple) return;
    setIndex((prev) => {
      const next = prev === images.length - 1 ? 0 : prev + 1;
      onIndexChange?.(next);
      return next;
    });
  };

  // 🟨 NUEVO: teclado (ESC, ←, →)
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, images]);

  // 🟨 NUEVO: bloquear scroll del body mientras está abierto (mejora UX mobile)
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen || !hasImages) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 p-2 sm:p-4 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-6xl h-[92vh] sm:h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🟨 X superior */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#1f1d2b] text-white w-10 h-10 rounded-full border border-white/20"
          aria-label="Cerrar"
          title="Cerrar"
        >
          ✕
        </button>

        {/* 🟨 Flecha izquierda (responsive, centrada vertical) */}
        {hasMultiple && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#1f1d2b]/90 text-white w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center"
            aria-label="Imagen anterior"
            title="Anterior"
          >
            ‹
          </button>
        )}

        {/* 🟨 Imagen ampliada responsive */}
        <img
          src={currentImage}
          alt={`${title} ampliada`}
          className="
            max-h-full max-w-full
            w-auto h-auto
            object-contain
            rounded-lg shadow-2xl
            bg-black/30
            select-none
          "
          draggable={false}
        />

        {/* 🟨 Flecha derecha */}
        {hasMultiple && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#1f1d2b]/90 text-white w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center"
            aria-label="Imagen siguiente"
            title="Siguiente"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageLightboxCarousel;
