import ApiMerc from "../../ApiMercadolibre/ApiMerc";
import MainHeader from "../MainHeader";
import { useContext, useState } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../../context/CartContext";

const ItemDetail = ({ id, name, price, img, description, videoLink,stock }) => {
  const [quantity, setQuantity] = useState(0);
  const {addItem} = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    const productToAdd = {
      id,
      name,
      price,
      img,
      quantity,
      
    };
    console.log(productToAdd)
    setQuantity(quantity);
    addItem(productToAdd);
    

    //acordate de hacer las notificaciones a la egnte les gusta
  };

  return (
    <main className="lg:pl-32 pb-20 lg:pr-96">
      <div className="md:p-8 p-4">
        <MainHeader />
        <div className="bg-[#1f1d2b] p-8 rounded-xl text-gray-300 flex flex-col items-center sm:items-center md:flex-row md:justify-between">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <img
              className="w-32 h-32 object-cover shadow-2xl"
              src={img}
              alt={name}
            />
            <div className="flex flex-col text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-5xl">{name}</h2>
              <h2 className="text-gray-500 text-1xl md:text-2xl lg:text-3xl">
                ${price}
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center w-full md:w-auto">
            {quantity > 0 ? (
              <button className="bg-[#ec7c6a] w-auto py-2 px-6 font-bold rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-[#d96b5d] active:shadow-inner active:translate-y-1">
                Ir al carro
              </button>
            ) : (
              
              <ItemCount onAdd={handleOnAdd} stock={stock} />
            )}
          </div>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-lg font-bold mb-4">Detalles</h3>
        <h2 className="mb-6">{description}</h2>

        {videoLink && videoLink.startsWith("http") && (
        <div className="mt-4">
          <iframe
            width="560"
            height="315"
            src={videoLink}
            title={`Video de ${name}}`}
            
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-md shadow-lg"
          ></iframe>
        </div>
      )}
        <h3 className="text-lg font-bold mb-4">Ficha tecnica:</h3>
        <ApiMerc />
      </div>
    </main>
  );
};

export default ItemDetail;