import { db } from "../firebaseConfig";
import { addDoc, deleteDoc, doc, collection } from "firebase/firestore";

export const addCategory =  async (categoryName)=>{
    try {
        const categoryRef = collection(db, 'categories');
    await addDoc(categoryRef,{label: categoryName});
    return ('category added successfully')
    } catch (error) {
        console.log(error, 'la categoria no pudo agregarse')
    }
}

export const deleteCategory = async (categoryName) => {
    try {
        
        const categoryRef = collection(db, 'categories');
        const categoryQuery = query(categoryRef, where('label', '==', categoryName));
        const querySnapshot = await getDocs(categoryQuery);

        if (!querySnapshot.empty) {
           
            for (const docSnapshot of querySnapshot.docs) {
                await deleteDoc(doc(db, 'categories', docSnapshot.id));
            }
            return 'Category deleted successfully';
        } else {
            return 'Category not found';
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        const {
            
            name,
            price,
            img,
            videoLink,
            appLink,
            description,
            gama,
            searchTokens,
            slug
        } = productData;

        
        const tokenArray = searchTokens.split(' ').filter(token => token.trim() !== '');

       
        const productRef = collection(db, 'products');
        await addDoc(productRef, {
            name,
            price,
            img,
            videoLink,
            appLink,
            description,
            gama,
            searchTokens: tokenArray,
            slug
        });
        return 'Product added successfully';
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const addOffer = async (offerData) => {
    try {
        const { img } = offerData;
        const offerRef = collection(db, 'offers');
        await addDoc(offerRef, { img });
        return 'Offer added successfully';
    } catch (error) {
        console.error('Error adding offer:', error);
        throw error;
    }
};