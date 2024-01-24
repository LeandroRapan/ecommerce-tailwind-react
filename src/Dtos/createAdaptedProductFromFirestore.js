const createAdaptedProductFromFirestore = (doc) =>{
    const data= doc.data()
        const productAdapted={
            id: doc.id,
            name: data.name,
            img: data.img,
            price: data.price,
            stock: data.stock,
            category: data.category,
            description: data.description,
        }
    return productAdapted
}

export default createAdaptedProductFromFirestore