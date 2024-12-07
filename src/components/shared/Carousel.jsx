import { useState } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para mover a la siguiente imagen
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para mover a la imagen anterior
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-[70vh] max-w-lg w-full  mx-auto">
      {/* Contenedor principal */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        {/* Imagen activa */}
        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-transform duration-500"
        />
      </div>

      {/* Botón Anterior */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        ❮
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        ❯
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;