import { useState } from "react";
import { addProduct, deleteProduct , updateProduct} from "../../services/firebase/firestore/adminHandlers";
import Search from "../shared/Search";
const ProductManager = () => {
    const emptyProduct ={
        name: "",
        price: 0,
        cant: 0,
        img: "",
        videoLink: "",
        meliLink: "",
        description: "",
        gama: "",
        searchTokens: "",
        category: "",
    };
//add handlers
    const [productData, setProductData] = useState(emptyProduct);

    const handleAddProduct = async () => {
        try {
            await addProduct(productData);
            alert("Product added successfully!");
            setProductData(emptyProduct);
        } catch (error) {
            console.log(error);
            alert("Failed to add product.");
        }
    };
//Search handlers

    const [selectedProduct, setSelectedProduct]= useState(null);
    const [editedProduct, setEditedProduct]= useState(null);

    const onProduct= (product)=>{
        setSelectedProduct(product)
        setEditedProduct({...product})

    }
    const handleEditInputChange=(event)=>{
        const {name, value}= event.target;
        setEditedProduct({...editedProduct, [name]:value})
    }

    //delete handler
    const handleDelete =async()=>{
        try {
          await deleteProduct(selectedProduct.id)
          alert('product deleted')
          setEditedProduct(null);
          selectedProduct(null)
        } catch (error) {
            console.log(error)
            alert('failed')
        }
    }
    const handleUpdate = async()=>{
        try {
            await updateProduct(editedProduct)
            alert('product edited');
            setSelectedProduct(editedProduct);
            setEditedProduct(null)

        } catch (error) {
            console.log(error)
            alert('edit product error')
        }
    }
    
    

    return (
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>
            {Object.keys(productData).map((key) => (
                <input
                    key={key}
                    type={key === "price" || key === "cant" ? "number" : "text"}
                    className="border p-2 rounded w-full mb-2"
                    placeholder={
                        key === "price"
                            ? "precio"
                            : key === "cant"
                            ? "cantidad"
                            : key.charAt(0).toUpperCase() + key.slice(1)
                    }
                    onChange={(e) =>
                        setProductData({ ...productData, [key]: e.target.value })
                    }
                />
            ))}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAddProduct}
            >
                Add Product
            </button>
        <section>
            <h2>Editar O borrar productos</h2>
           < Search 
            onProductSelection={onProduct}
            renderResult={(product) => (
            <span>
              {product.name} - <span className="text-gray-400">{product.price} USD</span>
            </span>
          )}/>
         {
            editedProduct && (
                <div>
                    <form >
                        {
                            Object.keys(editedProduct).map((key)=>(
                                <label key={key}>
                                    {key.charAt(0).toUpperCase()+ key.slice(1)}:
                                    <input 
                                    type={key === 'price' || key=== 'cant'?"number": "text"} 
                                    name={key}
                                    value={editedProduct[key]}
                                    onChange={handleEditInputChange}
                                    />
                                    
                                </label>
                           ) )
                        }
                    </form>
                    <button onClick={handleUpdate}>Actualizar</button>
                    <button onClick={handleDelete}>Borrar </button>
                </div>


            )
         }

        </section>
        </section>

       
    );
};

export default ProductManager;

