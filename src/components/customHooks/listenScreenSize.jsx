import { useState, useEffect } from "react";

const listenScreenSize = ()=>{
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        isLg: window.innerWidth >= 1020
    })

useEffect
(()=>{
    const handleResize= ()=>{
        const widht = window.innerWidth;
        setScreenSize({
            width,
            isLg: width>=1024
        })
    }
    window.addEventListener('resize', handleResize)
},[]);

return screenSize;
}

export default listenScreenSize;