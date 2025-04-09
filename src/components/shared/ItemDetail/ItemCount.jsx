import { useState } from 'react'

const ItemCount = ({stock = 0, initial = 1, onAdd})=> {
   const [quantity, setQuantity] = useState(initial)

   const increment = () => {
       if(quantity < stock) {
           setQuantity(quantity+1)
       }
   }

   const decrement = () => {
       if(quantity > 1) {
           setQuantity(quantity - 1)
       }     
   }

   return(
    <div className='Counter w-full max-w-xs py-2 px-6 font-bold rounded-xl shadow-md focus:outline-none focus:ring-2 active:shadow-inner active:translate-y-1 md:flex-auto'>
  <div className='Controls flex justify-between items-center'>
    <button 
      className="bg-[#3B1E54] text-white text-3xl w-12 h-12 flex justify-center items-center rounded-full  focus:ring-blue-500"
      onClick={decrement}
    >
      -
    </button>
    <h4 className='Number text-lg w-12 text-center'>{quantity}</h4>
    <button 
      className="bg-[#3B1E54] text-white text-3xl w-12 h-12 flex justify-center items-center rounded-full focus:ring-blue-500"
      onClick={increment}
    >
      +
    </button>
  </div>
  <div className='mt-4'>
    <button 
      className="bg-green-500 w-full h-12 font-bold rounded-xl shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 active:bg-green-700"
      onClick={() => onAdd(quantity)}
    >
      Agregar al carrito
    </button>
  </div>
</div>
   )

}
export default ItemCount