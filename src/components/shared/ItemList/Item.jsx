import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useContext } from "react";
// import { CartContext } from '../../context/CartContext/CartContext';;

const Item = ({ id, name, price, img }) => {

    // const value = useContext(CartContext)
    
    //este estado está para q cambie el boton con un hover, No se si sera la mejor manera
    // const [buttonStyles, setButtonStyles] = useState(itemLinkStyles);
    return (
      <div className="bg-[#1f1d2b] p-8 rounded-xl flex flex-col items-center text-gray-300 gap-2">
        <img src={img} className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full shadow-[#3B1E54]" alt={name} />
        <p className="text-2xl text-[#D4BEE4]" >{name}</p>
        <span className="text-gray-400">${price}</span>
        {/* generacion del link/boton detalles */}
        <Link className="btn"
          to={`/item/${id}`}
  
       
         >Detalles
       </Link> 
      </div>


    );
  };
  
  export default Item;