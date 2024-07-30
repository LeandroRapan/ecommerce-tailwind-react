import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getProductsById } from "../../../services/firebase/firestore/products";


const ItemDetailContainer = ()=>{
    console.log("entrada al itemdetail conteiner")

    const {itemId}= useParams();
    const [product, setProduct]= useState(null);;
    const  [loading, setLoading]= useState(true);
    
    useEffect (()=>{
        setLoading(true)
        getProductsById(itemId)
        .then((product)=>{
            setProduct(product);
            if(!product.name){
                console.log("el producto no existe");
            }
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            setLoading(false)
        })
    }, []
    );

    if(loading){
        return(
           
               <h1>Cargando</h1>
            
        )
    };
    return(
        <div>
           <h2>{product.name}</h2> 
        </div>
    );







}
export  default ItemDetailContainer