import Item from "./Item.jsx";

const ItemList = ({ products }) => {
  return (
    <div className="p-8 grid grid-cols-1 gap-16 md:grid-cols-3">
      {products.map((product) => {
        // 🟨 NUEVO: main image desde images[]
        const images = Array.isArray(product.images) ? product.images : [];
        const mainImage = images[0] || "";
   

        return (
          <div key={product.id}>
            <Item
              slug={product.slug}
              name={product.name}
              price={product.price}
              image={mainImage} 
            />
           
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
