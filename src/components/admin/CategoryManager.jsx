
import { useState } from "react";
import { addCategory, deleteCategory } from "../../services/firebase/firestore/adminHandlers";

const CategoryManager = () => {
    const [categoryName, setCategoryName] = useState("");

    const handleAddCategory = async () => {
        try {
            await addCategory(categoryName);
            alert("Category added successfully!");
            setCategoryName("");
        } catch (error) {
            alert("Failed to add category.");
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const result = await deleteCategory(categoryName);
            alert(result);
            setCategoryName("");
        } catch (error) {
            alert("Failed to delete category.");
        }
    };

    return (
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
                Agregar categoria
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteCategory}
            >
                Borrar categoria
            </button>
        </section>
    );
};

export default CategoryManager;