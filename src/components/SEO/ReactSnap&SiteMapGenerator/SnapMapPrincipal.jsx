import { notifySearchEngines } from "./sitemapGenerator";
import { generateSitemap } from "./sitemapGenerator";
import { generateReactSnapConfig } from "./reactSnapGenerator";

export async function SnapMapPrincipal
  (notifyEngines = false){
try {

    const sitemapResult = await generateSitemap();
    if (!sitemapResult.success){
        throw new Error ('failed to generate sitemap');
    }

    const snapResult = await generateReactSnapConfig(sitemapResult.urls);

    if (!snapResult.success){
        throw new Error("failed to generate sitemap")
    }

    let notifyResult;
    if(notifyEngines){
        notifyResult = await notifySearchEngines();
    }

    return{
        success:true,
        sitemap: sitemapResult,
        reactSnap: snapResult,
        notified: notifyResult

    };

   
}catch(error){
    console.error('Error in sitemap update process:', error);
    return {
      success: false,
      error: error.message
}
}


}
if (process.argv.includes('--cli')) {
    SnapMapPrincipal(process.argv.includes('--notify'))
      .then(result => {
        console.log(result);
        process.exit(result.success ? 0 : 1);
      });
  }
