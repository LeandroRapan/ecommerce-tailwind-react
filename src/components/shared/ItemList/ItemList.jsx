import Item from "./Item.jsx"


const ItemList = ({products}) =>  {

 return (
      
      // Map que genera el item list y devuelve Item con la key que lo linkea a su ID      
       
            <div  className="p-8 grid grid-cols-1 gap-16 md:grid-cols-3" >
              {
              products.map(product=> (
                <div key={product.id}>
                  <Item {...product} />
                </div>
              ))
              }
           </div>
        
     
    
        )
 }

   export default ItemList