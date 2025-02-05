import { useState } from "react";
import { addProduct } from "../../services/firebase/firestore/adminHandlers";

const ProductManager = () => {
    const [productData, setProductData] = useState({
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
    });

    const handleAddProduct = async () => {
        try {
            await addProduct(productData);
            alert("Product added successfully!");
            setProductData({
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
            });
        } catch (error) {
            console.log(error);
            alert("Failed to add product.");
        }
    };

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
        </section>
    );
};

export default ProductManager;

