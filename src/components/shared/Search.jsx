import { useState, useEffect } from "react"
import { getProducts } from "../../services/firebase/firestore/products"
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
const Search = ()=>{
    const [products, setProducts]= useState([]);
    const [filteredProducts, setFilteredProducts]=useState([]);
    const [searchInput, setSearchInput]= useState('');
    const [loading, setLoading]= useState(false)

useEffect(
    ()=>{
        const fetchProducts=async ()=>{
         setLoading(true)
        try {
            const productsList= await getProducts();
            setProducts(productsList)  
        } catch (error) {
            console.log("error al cargar los productos",error)
        } finally{
            setLoading(false)
        }
          
        }
        fetchProducts();
    },[getProducts]
)
const handleSearchChange= (event)=>{
    const query=  event.target.value.toLowerCase() ;
    setSearchInput(query)  ;

    if(query.trim()=== ''){
        setFilteredProducts([]);
    }else{
        const filtered = products.filter( product => product.name.toLowerCase().includes(query))
        setFilteredProducts(filtered)
    }
};
    return (
        <div className="w-full max-w-md mx-auto ">

           
          {/* Formulario de búsqueda */}
          <form>
            <div className="w-full relative">
              <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                className="bg-[#1f1d28] w-full py-2 pl-10 pr-4 rounded-lg text-gray-300 outline-none"
                placeholder="Buscar"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
          </form>
    
          {/* Resultados */}
          <div className={`mt-4 bg-[#1f1d28] rounded-lg p-4 transition-all duration-500 ${
          searchInput.trim() === "" ? "hidden " : "max-h-screen"
        }`}>
            { loading ? (
              <p className="text-gray-400">Cargando productos...</p>
            ) : filteredProducts.length > 0 ? (
              <ul className="text-gray-300 space-y-2">
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                  <Link  to={`/item/${product.id}`}>
                    {product.name} - <span className="text-gray-400">{product.price} USD</span>
                  </Link>
                  </li>
                ))}
              </ul>
            ) : (
             (searchInput.trim() !== "" && <p className="text-gray-400">No se encontraron productos.</p>
            ))}
          </div>
        </div>
      );





}
export default Search