import React from "react";

const Card = (props)=>{
    const {img, title, price, quantity }= props
    return(
        <div className="bg-[#1f1d2b] p-8 rounded-xl flex flex-col items-center text-gray-300 gap-2">
            <img src={img} className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full" alt="samsung s22" />
            <p className="text-xl">{title}</p>
            <span className="text-gray-400">{price}</span>
            <p className="text-gray-600">{quantity} disponibles</p>
          </div>
    )
}
export default Card