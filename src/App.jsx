import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import { RoleProvider } from './components/context/RoleContext.jsx';
import { CartProvider } from './components/context/CartContext';
import { AppRoutes } from './components/routes/Routes.jsx'
import Cart from './components/Cart';
import MenuMovil from './components/shared/MenuMovil.jsx'
import Sidebar from './components/shared/Sidebar.jsx';



function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <AuthProvider>
        <RoleProvider>
        <CartProvider>
          <BrowserRouter>
          <Cart showCart={showCart} setShowCart={setShowCart} />
              
              <MenuMovil
                showMenu={showMenu}
                showCart={showCart}
                setShowCart={setShowCart}
                setShowMenu={setShowMenu}
              />
              
              <Sidebar 
                showMenu={showMenu}
                setShowMenu={setShowMenu}
              />
              
              <AppRoutes />
          </BrowserRouter>
        </CartProvider>
        </RoleProvider>
      </AuthProvider>
    </div>
  );
}

export default App;