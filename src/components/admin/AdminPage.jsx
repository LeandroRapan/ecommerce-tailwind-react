import CategoryManager from "./categoryManager";
import ProductManager from "./ProductManager";
import OfferManager from "./OfferManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRole } from "../context/RoleContext";
import AdminLoginModal from "./AdminLoginModal";

const AdminPage = () => {
    const { currentUser, authLoading } = useAuth();
  const { userRole, roleLoading } = useRole();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const isAdmin = userRole === "admin";
 useEffect(() => {
    console.log("AdminPage Debug:", {
        currentUser: currentUser ? currentUser.uid : null,
        userRole,
        isAdmin,
        authLoading,
        roleLoading
    });

    // Si no está cargando y no hay usuario o no es admin, muestra modal
    if (!authLoading && !roleLoading) {
        if (!currentUser || !isAdmin) {
            setShowLoginModal(true);
        } else {
            setShowLoginModal(false);
        }
    }
}, [currentUser, userRole, roleLoading, authLoading]);

useEffect(() => {
    // Solo redirige si está completamente cargado y no es admin
    if (!authLoading && !roleLoading) {
        if (currentUser && !isAdmin) {
            console.log("Redirigiendo a /");
            navigate("/");
        }
    }
}, [currentUser, authLoading, roleLoading, isAdmin, navigate]);

const handleLoginSuccess = () => {
    setShowLoginModal(false);
};

if (authLoading || roleLoading) {
    return <div className="flex justify-center items-center h-screen text-white">Cargando...</div>;
}

return (
    <>
        <AdminLoginModal 
            isOpen={showLoginModal} 
            onClose={() => navigate("/")} 
            onLoginSuccess={handleLoginSuccess} 
        />
        
        {!showLoginModal && (
            <div className="container mx-auto p-4 text-white">
                <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <p>Bienvenido al panel de administración</p>
                    <div className="admin-page pl-32 pr-96 pb-6 relative bg-gray-900">
                        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
                        <CategoryManager />
                        <ProductManager />
                        <OfferManager />
                    </div>
                </div>
            </div>
        )}
    </>
);
};

export default AdminPage;