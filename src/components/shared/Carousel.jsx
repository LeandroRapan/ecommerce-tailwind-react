import { useState } from "react";

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  // Entrada: índice actual implícito en state
  // Salida: actualiza currentIndex a la siguiente imagen
  // Consumido por: botón "siguiente"
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Entrada: índice actual implícito en state
  // Salida: actualiza currentIndex a la imagen anterior
  // Consumido por: botón "anterior"
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!hasImages) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* 🟨 CAMBIO: viewport del carrusel con altura responsive real */}
      <div className="relative rounded-2xl overflow-hidden border border-[#3b2a57] bg-[#120f24] min-h-[220px] h-[260px] sm:h-[320px] md:h-[400px] lg:h-[460px]">
        {/* 🟨 CAMBIO: imagen centrada dentro de una altura controlada */}
        <img
          src={images[currentIndex]}
          alt={`Oferta ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-transform duration-500"
        />

        {hasMultipleImages && (
          <>
            {/* 🟨 CAMBIO: botones más consistentes con la paleta del sitio */}
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-[#2a1d46]/80 text-white w-10 h-10 rounded-full border border-[#5a3b86] hover:bg-[#3a275f] transition"
              aria-label="Imagen anterior"
            >
              ❮
            </button>

            <button
              onClick={goToNext}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-[#2a1d46]/80 text-white w-10 h-10 rounded-full border border-[#5a3b86] hover:bg-[#3a275f] transition"
              aria-label="Siguiente imagen"
            >
              ❯
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a la imagen ${index + 1}`}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex
                  ? "bg-[#a46cff]"
                  : "bg-[#5f5577]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;