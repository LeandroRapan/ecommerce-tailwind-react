import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Card from "../../Card.jsx";

 import ItemList from "./ItemList.jsx"
// import { getProducts } from '../../services/firebase/firestore/products'
import { getProducts } from '../../../services/firebase/firestore/products.js'
import Spinner from '../../animation/Spinner/Spinner.jsx';
const ItemListContainer = () => {
   const [products, setProducts]= useState([])
   const {categoryId} = useParams() 
   const [loading, setLoading]= useState(true)


    useEffect(
        ( )=>{
            setLoading(true)
          getProducts(categoryId) 
         .then(products=>{
            setProducts(products)
           
         })
         .catch(error=>{
            console.log(error)
         })
         .finally(()=>{
            setLoading(false)})
        
         
    }, [categoryId]
    )
    // mensaje de cargando
    if (loading){
        return(
           <Spinner/>
           
        )
    }
    // mensaje de no hay productos
    if (products && products.length===0){
        return (
            <h1 className='text-[#D4BEE4] text-5xl'>Por el momento no hay productos de esta categoria</h1>
        )
    }
return (
   <div>
   
    <div>
      <ItemList products={products}/>  
    </div>
    </div>
)

}
export default ItemListContainer;