import { getDocs, collection, query, where, getDoc, doc, limit } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import createAdaptedProductFromFirestore from '../../../Dtos/createAdaptedProductFromFirestore'

export const getProducts =(categoryId)=>{
    const productsRef = categoryId
    ? query(collection(db, 'products'), where ('category', '==', categoryId)) 
    : collection(db,'products')
    return getDocs(productsRef)
    .then (snapshot => {
    const productsAdapted = snapshot.docs.map(doc =>{
    return createAdaptedProductFromFirestore(doc)
    })
    return productsAdapted
    })
    .catch (error=>{ return error})
    
}
export const getProductBySlug = (slug) => {
  const s = String(slug || "").trim();
  if (!s) return Promise.resolve(null);

  const q = query(
    collection(db, "products"),
    where("slug", "==", s),
    limit(1)
  );
   return getDocs(q)
    .then((snap) => {
      if (snap.empty) return null;
      return createAdaptedProductFromFirestore(snap.docs[0]);
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
export const getProductsById =(itemId)=>{
    const productRef = doc(db,'products', itemId)
        
  return  getDoc(productRef)
    .then(snapshot=>{
        const data = snapshot.data()
       
        const productAdapted = { id: snapshot.id, ...data}
        return productAdapted
    })
  
    .catch(error =>{return error})
}