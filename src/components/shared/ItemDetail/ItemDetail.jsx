// import ApiMerc from "../../ApiMercadolibre/ApiMerc";
import MainHeader from "../MainHeader";
import { useContext, useState, useMemo, useEffect } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../../context/CartContext";
import ImageLightboxCarousel from "./ImageLightboxCarousel";

const ItemDetail = ({
  id,
  name,
  price,
  images = [],
  description,
  videoLink,
  stock,
}) => {
  const [quantity, setQuantity] = useState(0);
  const { addItem } = useContext(CartContext);

  const mainImage = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) return images[0];
    return "";
  }, [images]);

  const hasImages = Array.isArray(images) && images.length > 0;
  const hasMultiple = Array.isArray(images) && images.length > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [mainImage]);

  const selectedImage = useMemo(() => {
    if (!hasImages) return "";
    const safe = Math.min(Math.max(currentIndex, 0), images.length - 1);
    return images[safe] || "";
  }, [hasImages, images, currentIndex]);

  const handleOnAdd = (quantity) => {
    const productToAdd = {
      id,
      name,
      price,
      image: mainImage, // siempre images[0]
      quantity,
    };

    setQuantity(quantity);
    addItem(productToAdd);
  };
console.log("videoLink in ItemDetail:", videoLink);
  return (
    
    <main className="lg:pl-32 pb-20 lg:pr-96">
      <div className="md:p-8 p-4">
        <MainHeader />

        <div className="bg-[#1f1d2b] p-8 rounded-xl text-gray-300 flex flex-col items-center md:flex-row md:justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-0">
            {/* 🟨 Imagen principal más grande y responsive */}
            {/* 🟨 Imagen principal con zoom hover solo en desktop */}
            {selectedImage ? (
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="
      rounded-lg overflow-hidden
      focus:outline-none focus:ring-2 focus:ring-[#D4BEE4]
      cursor-zoom-in
      group
    "
                aria-label="Abrir imagen ampliada"
                title="Ver imagen ampliada"
              >
                <img
                  src={selectedImage}
                  alt={name}
                  className="
        w-64 h-64
        md:w-80 md:h-80
        lg:w-96 lg:h-96
        object-contain
        shadow-2xl
        bg-black/20
        transition-transform duration-200 ease-out
        lg:group-hover:scale-110
      "
                />
              </button>
            ) : (
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded bg-black/30 flex items-center justify-center text-sm text-gray-400">
                Sin imagen
              </div>
            )}

            <div className="flex flex-col text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-5xl">{name}</h2>
              <h2 className="text-gray-500 text-xl md:text-2xl lg:text-3xl mt-2">
                ${price}
              </h2>

              {/* Selector de miniaturas */}
              {hasMultiple && (
                <div className="flex gap-2 mt-4 justify-center md:justify-start flex-wrap">
                  {images.map((img, idx) => (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`border rounded overflow-hidden ${
                        idx === currentIndex
                          ? "border-[#D4BEE4]"
                          : "border-white/20"
                      }`}
                      aria-label={`Ver imagen ${idx + 1}`}
                      title={`Imagen ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${name} - ${idx + 1}`}
                        className="w-14 h-14 object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center w-full md:w-auto">
            {quantity > 0 ? (
              <button className="bg-[#3B1E54] w-auto py-2 px-6 font-bold rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-[#d96b5d] active:shadow-inner active:translate-y-1">
                Ir al carro
              </button>
            ) : (
              <ItemCount onAdd={handleOnAdd} stock={stock} />
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-lg font-bold mb-4 text-[#D4BEE4]">Detalles</h3>
        <h2
          className="
        mb-6 
        whitespace-pre-line
        leading-relaxed
        text-[#D4BEE4]
      text-base
      md:text-lg
      max-w-3xl"
        >
          {description}
        </h2>

        {
        videoLink && videoLink.startsWith("http") && (
          <div className="mt-4">
            <iframe
              width="560"
              height="315"
              src={videoLink}
              title={`Video de ${name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md shadow-lg"
            ></iframe>
          </div>
        )}
      </div>

      {/* Modal carrusel */}
      <ImageLightboxCarousel
        isOpen={isLightboxOpen}
        images={images}
        startIndex={currentIndex}
        title={name}
        onClose={() => setIsLightboxOpen(false)}
        onIndexChange={(idx) => setCurrentIndex(idx)}
      />
    </main>
  );
};

export default ItemDetail;
