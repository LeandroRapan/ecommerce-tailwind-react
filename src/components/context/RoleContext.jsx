import { useContext, createContext, useState, useEffect } from "react";
import { db } from "../../services/firebase/firebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const RoleContext = createContext();

export const RoleProvider = ({children})=>{
    const {currentUser} = useAuth();
    const [userRole, setUserRole]= useState(null);
    const [roleLoading, setRoleLoading]= useState(true);
    const [roleError, setRoleError]= useState(null);

    useEffect(()=>{
         const fetchUserRole = async ()=>{
            if(!currentUser){
                setUserRole(null);
                return
            }
            setRoleLoading(true)
            setRoleError(null);

            try {
                const userDocRef = doc(db,"users",currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if(userDoc.exists()){
                    
                    setUserRole(userDoc.data().role)
                    
                } else setUserRole(null);
            } catch (error) {
                setRoleError(error.message)
                console.log("error fetchin user role", error)
            } finally {
                setRoleLoading(false)
            }
         }
         fetchUserRole();
         
    }, [currentUser])

    

    const value ={
        userRole,
        
        roleLoading,
        roleError
    };

    return(
        <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
    )
    

};
export const useRole = ()=> useContext(RoleContext)
