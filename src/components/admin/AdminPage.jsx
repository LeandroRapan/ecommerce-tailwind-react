import CategoryManager from "./categoryManager";
import ProductManager from "./ProductManager";
import OfferManager from "./OfferManager";

const AdminPage = () => {
    return (
        <div>
            <div className="admin-page pl-32 pr-96 pb-6 relative bg-gray-900">
                <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
                <CategoryManager />
                <ProductManager />
                <OfferManager />
            </div>
        </div>
    );
};

export default AdminPage;