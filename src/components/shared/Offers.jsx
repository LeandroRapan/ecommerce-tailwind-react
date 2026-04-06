import { useEffect, useState } from "react";
import ImageCarousel from "./Carousel";
import { getOffers } from "../../services/firebase/firestore/adminHandlers";

const Offers = () => {
  const [images, setImages] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(true);

  const loadOffers = async () => {
    try {
      setLoadingOffers(true);
      const data = await getOffers();
      const offerImages = data.map((offer) => offer.img);
      setImages(offerImages);
    } catch (error) {
      console.error("Error loading public offers:", error);
      setImages([]);
    } finally {
      setLoadingOffers(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  return (
  <main className="lg:pl-32 lg:pr-96 pb-20 min-h-screen">
    
    {/* 🟨 CAMBIO: contenedor central con aire superior */}
    <div className="max-w-6xl mx-auto px-4">

      {/* 🟨 CAMBIO: card superior adaptada a la estética oscura del sitio */}
      <div className="bg-[#1b1830] border border-[#3b2a57] rounded-2xl shadow-md p-6 md:p-8 mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white">
          Ofertas por tiempo limitado
        </h1>

        <p className="text-[#d6c6f0] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Aprovechá promociones exclusivas. Si alguna te interesa, podés consultarnos directamente por WhatsApp.
        </p>
      </div>

      {/* 🟨 CAMBIO: contenedor del carrusel con misma identidad visual */}
      <div className="bg-[#1b1830] border border-[#3b2a57] rounded-2xl shadow-md p-5 md:p-6 min-h-[240px] flex items-center justify-center">
        {loadingOffers ? (
          <p className="text-[#cbb7ee] text-base md:text-lg">
            Cargando ofertas...
          </p>
        ) : images.length > 0 ? (
          <div className="w-full">
            <ImageCarousel images={images} />
          </div>
        ) : (
          <p className="text-[#cbb7ee] text-base md:text-lg">
            No hay ofertas disponibles en este momento.
          </p>
        )}
      </div>

    </div>
  </main>
);}

export default Offers;