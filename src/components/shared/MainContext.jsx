import MainHeader from "./MainHeader.jsx";

import { RiArrowDownSLine} from "react-icons/ri";
import ItemListContainer from "./ItemList/ItemListContainer.jsx";

const MainContext = () => {
    return (
        <main className="lg:pl-32  pb-20 lg:pr-96">
          <div className=" md:p-8 p-4">
        {/* Header */}
          <MainHeader/>
            {/* title content */}
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-xl text-gray-300">products</h2>
              <button className="flex items-center gap-4 text-gray-300 bg-[#1f1d2b] p-2 px-4 rounded-lg">

                <RiArrowDownSLine/>Gama
              </button>
            </div>
         
         
          {/* content */}


          {/* <div className="p-8 grid grid-cols-1 gap-16 md:grid-cols-3">
           
            <Card img="samsung-s22-white.png" title="samsung s22" price="250.000" quantity="1000"/>
          
          </div> */}
          <ItemListContainer greeting={"hola"}/>
          </div>
        
          
        </main>
    )
}
export default MainContext