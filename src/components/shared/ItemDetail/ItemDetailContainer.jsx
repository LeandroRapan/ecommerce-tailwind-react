import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getProductsById } from "../../../services/firebase/firestore/products";
import MainHeader from "../MainHeader";


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

    fetch("https://api.mercadolibre.com/items/MLA1805369812")
  .then(response => response.json())
  .then(data => {
    // Extraer todos los atributos
    const attributes = data.attributes.map(attr => ({
      id: attr.id,
      name: attr.name,
      value: attr.value_name
    }));

    // Ordenar los atributos por name y luego por value
    attributes.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;

      return 0;
    });

    console.log('Ordered Attributes:', attributes);
  })
  .catch(error => console.error('Error fetching data:', error));
   
  
  return(
        <main className="lg:pl-32  pb-20 lg:pr-96">
        <div className=" md:p-8 p-4">
        <MainHeader/>
        <div className=" bg-[#1f1d2b] p-8 rounded-xl flex  items-center text-gray-300 gap-2">
          <img  className="w-40 h-40 object-cover  shadow-2xl "src={product.img}/>
           <h2>{product.name}</h2> 
        </div>
        </div>
        </main>
    );


   




}
export  default ItemDetailContainer