import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Card from "../../Card.jsx";

 import ItemList from "./ItemList.jsx"
// import { getProducts } from '../../services/firebase/firestore/products'
import { getProducts } from '../../../services/firebase/firestore/products.js'
const ItemListContainer = ({ greeting }) => {
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
           <h1>Cargando...</h1> 
        )
    }
    // mensaje de no hay productos
    if (products && products.length===0){
        return (
            <h1>No hay productos de esta categoria por el momento</h1>
        )
    }
return (
   <div>
    <h1>{greeting}</h1>
    <div>
         
     


      <ItemList products={products}/> 
    </div>
    </div>
)

}
export default ItemListContainer;