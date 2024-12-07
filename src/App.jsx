import Sidebar from "./components/shared/Sidebar";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MenuMovil from "./components/shared/MenuMovil.jsx";
import { useEffect, useState } from "react";
import MainContext from "./components/shared/MainContext.jsx";
import ItemDetailContainer from "./components/shared/ItemDetail/ItemDetailContainer.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Offers from "./components/shared/Offers.jsx";
import { CartProvider } from "./components/context/CartContext.jsx";
import CheckOut from "./components/CheckOut/CheckOut.jsx";
function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  


  return (
    
    <div className="bg-[#262837] w-full min-h-screen">
      
      <CartProvider>
      <BrowserRouter>
    

      <Cart showCart={showCart} setShowCart={setShowCart} />
      {/* menu movil*/}

      <MenuMovil
        showMenu={showMenu}
        showCart={showCart}
        setShowCart={setShowCart}
        setShowMenu={setShowMenu}
      />
     
     
     <Sidebar showMenu={showMenu} />
     <Routes>
      <Route path='/' element={<MainContext/>}/>
      <Route path='/:categoryId' element={<MainContext/>}/>
      <Route path='/item/:itemId' element={<ItemDetailContainer/>}/>
      <Route path='/sobreNosotros' element={<AboutUs/>}/> 
      <Route path='/checkout'  element={<CheckOut/>}/>
      <Route path='/Ofertas'  element={<Offers/>}/>
      <Route path='/AguDmin' element={<AdminPage/>}/>
      <Route/>
      </Routes>
      </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
