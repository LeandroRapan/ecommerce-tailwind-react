import { useState, useEffect } from "react";
const ApiMerc = () => {
    // Fetch attributes from API
  const [attributes, setAttributes] = useState([]);
  useEffect(()=>{
    fetch("https://api.mercadolibre.com/items/MLA1805369812")
      .then((response) => response.json())
      .then((data) => {
        const attributes = data.attributes.map((attr) => ({
          id: attr.id,
          name: attr.name,
          value: attr.value_name,
        }));

               setAttributes(attributes);
      })
      .catch((error) => console.error("Error fetching data:", error));

      

  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-64">
          {attributes.map((attr) => (
            <div key={attr.id} className="bg-gray-800 p-4 rounded-lg">
              <div className="font-semibold text-gray-200">{attr.name}</div>
              <div className="text-gray-400">{attr.value}</div>
            </div>
          ))}
        </div>
  )
}
export default ApiMerc