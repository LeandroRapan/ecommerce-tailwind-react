import Sidebar from "./components/shared/Sidebar";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuMovil from "./components/shared/MenuMovil.jsx";
import { useState } from "react";
import MainContext from "./components/shared/MainContext.jsx";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <Sidebar showMenu={showMenu} />

      <Cart showCart={showCart} setShowCart={setShowCart} />
      {/* menu movil*/}

      <MenuMovil
        showMenu={showMenu}
        showCart={showCart}
        setShowCart={setShowCart}
        setShowMenu={setShowMenu}
      />
      <MainContext />
    </div>
  );
}

export default App;
