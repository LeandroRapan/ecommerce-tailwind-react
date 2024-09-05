import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext(0)
const localGet = JSON.parse(localStorage.getItem('carrito') || '[]')
// const localSet =(data) => localStorage.setItem('carrito',JSON.stringify(data))
export const CartProvider =({children}) => {
    const [cart, setCart]= useState(localGet)
    useEffect(()=>{
      // localSet(cart)
      localStorage.setItem('carrito',JSON.stringify(cart))

    }, [cart])
     // funcion para agregar productos al carrito
   
     const addItem =(productToAdd)=>{
     //   chequeo de si está en el carrito
        if(!isInCart(productToAdd.id)){
     setCart(prev=>[...prev,productToAdd])
     } else {
            const updatedCart = cart.map( prod =>{
              if(prod.id === productToAdd.id){
               let newQuantity = prod. quantity + productToAdd.quantity
               if (newQuantity> prod.stock){newQuantity = prod.stock}
               
               return {...prod, quantity: newQuantity}
              


              }else{
                return prod}
            }
             )
            setCart(updatedCart)
           
     }
      
    }
    //  iteracion sobre el carrito
    const isInCart = (id) =>{return cart.some(prod => prod.id === id)}
    // chequeo de cantidad
    const getTotalQuantity=()=>{
     let totalQuantity= 0
     cart.forEach(prod=>{
        totalQuantity+=prod.quantity
      })
     return totalQuantity
    }
   const totalQuantity= getTotalQuantity()

   //chequeo de precio
   const getTotal=()=>{
    let total= 0
    cart.forEach(prod=>{
       total+=prod.quantity * prod.price
       console.log(prod)
     })
    return total
   }
  const total= getTotal()
    
  //  borrador de elementos
   const removeItem =(id)=>{
    const cartUpdated = cart.filter(prod=> prod.id!== id)
    setCart(cartUpdated)
    
   }



   const clearCart = () => {
    setCart([])
console.log(cart)
   
}

 return (
     /* componente de context que envuelve a los componentes hermanos  */
 <CartContext.Provider value={{ cart, addItem,totalQuantity, removeItem, isInCart, total, clearCart }}>
 {children}
 </CartContext.Provider>
 )
}