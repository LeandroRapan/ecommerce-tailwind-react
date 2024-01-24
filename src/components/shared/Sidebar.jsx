import React from "react";
import {RiHome5Line, RiQuestionMark,  RiWhatsappLine, RiFireLine,RiLogoutCircleLine} from "react-icons/ri"


// import CartWidget from "../CartWidget/CartWidget"

 import {Link
    // , NavLink
} from 'react-router-dom'
// import { useAuth } from "../../context/AuthContext/AuthContext"
// import { useEffect, useState } from "react"
// import { collection, getDocs, query, orderBy } from "firebase/firestore"
// import { db } from "../../services/firebase/firebaseConfig"
const Sidebar = (props) => {
    const {showMenu} = props
    return (
        <div className={`bg-[#1f1d2b] fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50  ${showMenu? "left-0": "-left-28"}`}> 
       <div>
        <ul className=" pl-4">
            <li> 
            {/* <Link to="/">
              <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg" alt="logo" />
           </Link>  */}
                 {/* <h1 className="text-3xl text-gray-300 uppercase font-bold text-center my-5">Logo</h1> */}
            </li>
            <li className="bg-[#262837] p-4 rounded-tl-lg rounded-bl-xl">
                <a href="#" className="bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-white">
                    <RiHome5Line className="text-3xl"/></a>
            </li>
            <li className="hover:bg-[#262837] p-4 rounded-tl-lg rounded-bl-xl group transition-colors">
                <a href="#" className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors">
                    <RiQuestionMark className="text-3xl"/></a>
            </li>   
            <li className="hover:bg-[#262837] p-4 rounded-tl-lg rounded-bl-xl group transition-colors">
                <a href="#" className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors">
                    < RiFireLine className="text-3xl"/></a>
            </li>
            <li className="hover:bg-[#262837] p-4 rounded-tl-lg rounded-bl-xl group transition-colors">
                <a href="#" className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#1da751] group-hover:text-white transition-colors">
                    <  RiWhatsappLine className="text-3xl"/></a>
            </li>
       
        </ul>
        </div>
        <div>
            <ul>
            <li className="hover:bg-[#262837] p-4 rounded-tl-lg rounded-bl-xl group transition-colors">
                <a href="#" className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors">
                    <RiLogoutCircleLine className="text-3xl"/></a>
            </li>  
            </ul>
        </div>
        </div>
    )
}
export default Sidebar