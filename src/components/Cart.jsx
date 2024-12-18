import React, { useState } from "react";
import { RiDeleteBinLine, RiCloseLine } from "react-icons/ri";
import { CartContext } from "./context/CartContext";
import { useContext,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Cart = (props) => {
  const { showCart, setShowCart } = props;
  const [hide, setHide]= useState(false)
  const { cart, total, removeItem } = useContext(CartContext)
  const location = useLocation();
  useEffect(() => {
    // Si la ruta es '/checkout', ocultar el carrito
    if (location.pathname == '/checkout' || location.pathname=="/sobreNosotros"|| location.pathname=="/aguDmin") {
      setHide(true);
    }
    else{setHide(false)}
  }, [location.pathname]);
  console.log(location.pathname)
  console.log(hide)
  
  return (

    
    <div
      className={`${hide? "hidden":""} lg:col-span-2 fixed lg:right-0 lg:w-96 bg-[#1f1d28] top-0 w-full h-full transition-all z-50 ${
        showCart ? "right-0" : "-right-full"}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto">
          <div className="relative pt-16 lg:pt-8 text-gray-300 p-4">
            <RiCloseLine
              onClick={() => setShowCart(false)}
              className="lg:hidden absolute right-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl"
            />
            <h1 className="text-2xl mt-4">Carrito</h1>

            <div>
              <div className="grid grid-cols-6 mb-4 p-4">
                <h5 className="col-span-3">Producto</h5>
                <h5 className="col-span-2">Cantidad</h5>
                <h5 className="col-span-1">$</h5>
              </div>
              {/* products */}
              <div className="bg-[#1f1d28] overflow-y-auto max-h-[calc(100vh-300px)]">
                {/* product items here */}
                {
                cart.map(prod=>{
                    return (
                        <div key={prod.id} >
                              
                              {/* Repeat this block for each product */}
                <div className="bg-[#262837] p-4 rounded-xl mb-4">
                  <div className="grid grid-cols-6 p-2 mb-4">
                    {/* product description */}
                    <div className="col-span-4 flex items-center gap-3">
                      <img
                        src={prod.img}
                        className="w-10 h-16 object-cover"
                        alt="producto en el carrito"
                      />
                      <div>
                        <h5 className="text-sm">{prod.name}</h5>
                        <p className="text-xs text-gray-500">${prod.price} </p>
                      </div>
                    </div>
                    {/* quantity */}
                    <div className="text-center">
                      <span>{prod.quantity}</span>
                    </div>
                    {/* price */}
                    <div className="text-center">
                      <span>${prod.price * prod.quantity} </span>
                    </div>
                  </div>
                  {/* note */}
                  <div className="grid grid-cols-6 items-center gap-2">
                    <form className="col-span-5">
                      <input
                        type="text"
                        className="bg-[#1f1d2b] py-2 px-4 rounded-lg w-full"
                        placeholder="notas a tener en cuenta"
                      />
                    </form>
                    <div className="col-span-1 text-center">
                      <button className="border border-red-500 p-2 rounded-lg">
                        <RiDeleteBinLine 
                        onClick={()=> removeItem(prod.id)}
                        className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* End of product item */}
                        </div>
                    )
                })
            }
                
               
              </div>
            </div>
          </div>
        </div>

        {/* submit payment */}
        <div className="bg-[#262837] p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Descuento</span>
            <span>$0</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-400">Total:</span>
            <span>{total}</span>
          </div>
          <div>
          <Link to='/checkout'>
            <button className="bg-[#ec7c6a] w-full py-2 px-4 rounded-xl">
              continuar compra
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;