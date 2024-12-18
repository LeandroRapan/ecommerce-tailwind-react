import { useState } from "react";
import { addCategory, deleteCategory, addProduct, addOffer } from "../../services/firebase/firestore/adminHandlers";

const AdminPage = () => {
    const [categoryName, setCategoryName] = useState("");
    const [productData, setProductData] = useState({
        name: "",
        price: 0,
        img: "",
        videoLink: "",
        appLink: "",
        description: "",
        gama: "",
        searchTokens: "",
    });
    const [offerData, setOfferData] = useState({ img: "" });

    // Handler for adding a category
    const handleAddCategory = async () => {
        try {
            await addCategory(categoryName);
            alert("Category added successfully!");
            setCategoryName("");
        } catch (error) {
            alert("Failed to add category.");
        }
    };

    // Handler for deleting a category
    const handleDeleteCategory = async () => {
        try {
            const result = await deleteCategory(categoryName);
            alert(result);
            setCategoryName("");
        } catch (error) {
            alert("Failed to delete category.");
        }
    };

    // Handler for adding a product
    const handleAddProduct = async () => {
        try {
            await addProduct(productData);
            alert("Product added successfully!");
            setProductData({
                name: "",
                price: 0,
                img: "",
                videoLink: "",
                appLink: "",
                description: "",
                gama: "",
                searchTokens: "",
            });
        } catch (error) {
            alert("Failed to add product.");
        }
    };

    // Handler for adding an offer
    const handleAddOffer = async () => {
        try {
            await addOffer(offerData);
            alert("Offer added successfully!");
            setOfferData({ img: "" });
        } catch (error) {
            alert("Failed to add offer.");
        }
    };

    return (
      <div >
        <div className=" pl-32 pr-96 relative">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <section className="mb-8">    
                <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
                <input
                    type="text"
                    className="border p-2 rounded w-full mb-2"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={handleAddCategory}
                >
                    Add Category
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={handleDeleteCategory}
                >
                    Delete Category
                </button>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
                {Object.keys(productData).map((key) => (
                    <input
                        key={key}
                        type={key === "price" ? "number" : "text"}
                        className="border p-2 rounded w-full mb-2"
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={productData[key]}
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

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Add Offer</h2>
                <input
                    type="text"
                    className="border p-2 rounded w-full mb-2"
                    placeholder="Image Link"
                    value={offerData.img}
                    onChange={(e) => setOfferData({ img: e.target.value })}
                />
                <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={handleAddOffer}
                >
                    Add Offer
                </button>
            </section>
        </div>
        </div>
    );
};

export default AdminPage;