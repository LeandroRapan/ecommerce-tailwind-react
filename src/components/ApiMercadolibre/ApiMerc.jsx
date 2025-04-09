import { useState, useEffect } from "react";
const ApiMerc = (props) => {
    // Fetch attributes from API
  const [attributes, setAttributes] = useState([]);
  useEffect(()=>{

    //"https://www.mercadolibre.com.ar/xiaomi-poco-c65-dual-sim-256-gb-negro-8-gb-ram/p/MLA28117932#polycard_client=search-nordic&wid=MLA1981050444&sid=search&searchVariation=MLA28117932&position=4&search_layout=stack&type=product&tracking_id=ffe6fb05-7197-4292-ba32-a74ff7c3ba7c"




    fetch("https://api.mercadolibre.com/items/MLA28117932")
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