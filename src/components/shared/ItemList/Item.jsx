import { Link } from "react-router-dom";


const Item = ({ slug, name, price, image }) => {


    return (
      <div className="bg-[#1f1d2b] p-8 rounded-xl flex flex-col items-center text-gray-300 gap-2">
        
        {image ? (
<img src={image} className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full shadow-[#3B1E54]" alt={name} />
) : (
  <div className="w-40 h-40 ...">Sin imagen</div>
)}
        <p className="text-2xl text-[#D4BEE4]" >{name}</p>
        <span className="text-gray-400">${price}</span>
        {/* generacion del link/boton detalles */}
        <Link className="btn"
          to={`/item/${slug}`}
  
       
         >Detalles
       </Link> 
      </div>


    );
  };
  
  export default Item;