import React from "react";
import {  RiDeleteBinLine, RiCloseLine} from "react-icons/ri";
const Cart = (props) =>{
   const {showCart, setShowCart}= props
    return (
        
          <div className={`lg:col-span-2 fixed lg:right-0 lg:w-96  bg-[#1f1d28]  top-0 w-full h-full transition-all z-50 ${showCart? "right-0" : "-right-full"}`}> 
        {/* { carrito} */}
        <div>
          <p> proximamente</p>
        </div>
          <div className="relative pt-16 lg:pt-8 text-gray-300 p-4 h-full">
            <RiCloseLine onClick={()=>setShowCart(false)} className="lg:hidden abosute left-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl"/>
            <h1 className="text-2xl mt-4">Carrito</h1>
            {/* pills */}
             <div className="flex items-center gap-4 flex-wrap" >
              <button className="bg-[#ec7c6a] text-white py-2 px-4 rounded-xl">dine in</button>
              <button className=" text-[#ec7c6a] py-2 px-4 rounded-xl border border-gray-500">to go</button>
              <button className=" text-[#ec7c6a] py-2 px-4 rounded-xl border border-gray-500">delivery</button>
             </div>
             {/* car */}
             <div>
              <div className="grid grid-cols-6 mb-4 p-4 ">
                <h5 className="col-span-4">items</h5>
                <h5 className="">Qty</h5>
                <h5 className="">price</h5>
              </div>
              {/* products */}
              <div className="bg-[#1f1d28] overflow-scroll h-[400px] md:h-[800px] lg:h-[540px]">

                  {/* product */}
              <div className="bg-[#262837] p-4 rounded-xl mb-4">
                <div className="grid grid-cols-6 p-2 mb-4">
                  {/* product description */}
                  <div className="col-span-4 flex items-center gap-3">
                    <img src="samsung-s22-white.png" className="w-10 h-16 object-cover" alt="producto en el carrito" />
                    <div>
                    <h5 className="text-sm">samsung s22</h5>
                    <p className="text-xs text-gray-500">$250.000</p>
                    </div>
                    </div>
                    {/* quantity */}
                    <div className="text-center">
                      <span>2</span>
                    </div>
                    {/* price */}
                    <div className="text-center">
                      <span>$500.000</span>
                    </div>

                  
                </div>
                {/* note */}
                <div className=" grid grid-cols-6 items-center gap-2">
                  <form className="col-span-5">
                    <input type="text" className="bg-[#1f1d2b] py-2 px-4 rounded-lg" placeholder="notas a tener en cuenta"/>

                  </form>
                  <div className="col-span-1 text-center">
                    <button className=" border border-red-500 p-2 rounded-lg"><RiDeleteBinLine className="text-red-500"/></button>
                  </div>
                </div>


              </div>
              {/* product */}
              <div className="bg-[#262837] p-4 rounded-xl mb-4">
                <div className="grid grid-cols-6 p-2 mb-4">
                  {/* product description */}
                  <div className="col-span-4 flex items-center gap-3">
                    <img src="samsung-s22-white.png" className="w-10 h-16 object-cover" alt="producto en el carrito" />
                    <div>
                    <h5 className="text-sm">samsung s22</h5>
                    <p className="text-xs text-gray-500">$250.000</p>
                    </div>
                    </div>
                    {/* quantity */}
                    <div className="text-center">
                      <span>2</span>
                    </div>
                    {/* price */}
                    <div className="text-center">
                      <span>$500.000</span>
                    </div>

                  
                </div>
                {/* note */}
                <div className=" grid grid-cols-6 items-center gap-2">
                  <form className="col-span-5">
                    <input type="text" className="bg-[#1f1d2b] py-2 px-4 rounded-lg" placeholder="notas a tener en cuenta"/>

                  </form>
                  <div className="col-span-1 text-center">
                    <button className=" border border-red-500 p-2 rounded-lg"><RiDeleteBinLine className="text-red-500"/></button>
                  </div>
                </div>


              </div>
              {/* product */}
              <div className="bg-[#262837] p-4 rounded-xl mb-4">
                <div className="grid grid-cols-6 p-2 mb-4">
                  {/* product description */}
                  <div className="col-span-4 flex items-center gap-3">
                    <img src="samsung-s22-white.png" className="w-10 h-16 object-cover" alt="producto en el carrito" />
                    <div>
                    <h5 className="text-sm">samsung s22</h5>
                    <p className="text-xs text-gray-500">$250.000</p>
                    </div>
                    </div>
                    {/* quantity */}
                    <div className="text-center">
                      <span>2</span>
                    </div>
                    {/* price */}
                    <div className="text-center">
                      <span>$500.000</span>
                    </div>

                  
                </div>
                {/* note */}
                <div className=" grid grid-cols-6 items-center gap-2">
                  <form className="col-span-5">
                    <input type="text" className="bg-[#1f1d2b] py-2 px-4 rounded-lg" placeholder="notas a tener en cuenta"/>

                  </form>
                  <div className="col-span-1 text-center">
                    <button className=" border border-red-500 p-2 rounded-lg"><RiDeleteBinLine className="text-red-500"/></button>
                  </div>
                </div>


              </div>
             </div>
              </div>

            
             {/* submit paymey */}
             <div className="bg-[#262837] w-full absolute bottom-0 left-0 p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Discount</span>
                <span>$0</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-400">Subtotal</span>
                <span>$500.000</span>
              </div>
              <div>
                <button className="bg-[#ec7c6a] w-full py-2 px-4 rounded-xl"> continuar compra</button>
              </div>
             </div>

          </div>

          </div>
       
    )
}
export default Cart