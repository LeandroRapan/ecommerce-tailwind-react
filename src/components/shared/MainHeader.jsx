import React from "react";
import {RiSearch2Line} from "react-icons/ri";
import {Link, NavLink} from 'react-router-dom';
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig";

const MainHeader = () => {
  const [categories, setCategories] = useState([])
    
    useEffect(()=> {
    const categoriesRef = query(collection(db, 'categories'), orderBy('order'))
    
    getDocs(categoriesRef)
    .then(
        snapshot =>{
            const categoriesAdapted = snapshot.docs.map(
                doc => {
                    const data = doc.data()
                    
                    return {id: doc.id, ...data}
                    
                }
            )
            setCategories(categoriesAdapted)
        })
      } , []
    )


   return  ( 
      <header className="p-4">
      {/*title and search */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
      <div>
        <h1 className="text-2xl text-gray-300">AugusCel</h1>
        <p className="text-gray-500">7 de ocutubre</p>
      </div>
   
    <form>
      <div className="w-full relative">
      <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"/>
        <input 
        type="text" 
        className="bg-[#1f1d28] w-full py-2 pl-10 pr-4 rounded-lg text-gray-300 outline-none"
        placeholder="search"
        />
      </div>
    </form>
    </div>
    {/* tabs */ }
    <nav className=" relative text-gray-300 flex items-center gap-4 justify-between border-b mb-6 md:justify-start md:gap-8" >
      {/* <a href="#" className=" relative py-2 pr-4 before:w-1/2 before:h-[2px] before:absolute before:bg-[#ec7c6a] before:left-0 before:rounded-full before:-bottom-[1px] text-[#ec7c6a]">tablets</a>
      <a href="#" className=" py-2 pr-4">celulares</a>
      <a href="#" className="py-2 pr-4">algo mas</a> */}
    
      {
                    categories.map(cat=>{
                        return (
                            <NavLink key={cat.id} to={`/${cat.slug}`} className=" relative py-2 pr-4 text-gray-300 hover:text-[#ec7c6a] active:text-[#fde24b] hover:before:content-[''] hover:before:w-1/2 hover:before:h-[2px] hover:before:absolute hover:before:bg-[#ec7c6a] hover:before:left-0 hover:before:rounded-full hover:before:-bottom-[1px] active:before:content-[''] active:before:w-1/2 active:before:h-[2px] active:before:absolute active:before:bg-[#fde24b] active:before:left-0 active:before:rounded-full active:before:-bottom-[1px]">{cat.label}</NavLink>
                        )
                    })
                }
     
    </nav>
  
  </header>)

}
export default MainHeader