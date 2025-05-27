import { SnapMapPrincipal } from "../SEO/ReactSnap&SiteMapGenerator/SnapMapPrincipal";

const handleUpdateClick = async () => {
    const result = await SnapMapPrincipal(true); // true = notificar
    if (result.success) {
      alert('✅ Sitemap Y Configuración actualizados!');
    } else {
      alert(`❌ Error: ${result.error}`);
    }
  };

  const UpdateSitemapSnap = ()=>{
    return(
        <button className="bg-lime-700 text-white px-4 py-2 rounded"
         onClick={handleUpdateClick()}
         >Actualizar SEO</button>
    )
  }
  export default UpdateSitemapSnap