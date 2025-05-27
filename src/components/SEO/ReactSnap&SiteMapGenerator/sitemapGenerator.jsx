import {writeFileSync} from 'fs'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { join } from 'path'
// import { get } from 'axios'
import { db } from '../../../services/firebase/firebaseConfig'
import { writeBatch } from 'firebase/firestore'

const DOMAIN = process.env.domain || 'https://tudominio.com'
const SITEMAP_PATH= join('public', sitemap.xml);

const URL_CONFIG = {
    static:{
        '/':{priority: 1.0},
        '/Ofertas':{priority:0.8},
        '/SobreNosotros': {priority:0.5}
    },
    dinamic:{
        '/item/:id':{priority: 0.7},
        '/:categoryId':{priority:0.6}
    },
    exclude:['/checkout', '/AguDmin']
};

async function fetchContent (){
    const [categories, products] = await Promise.all([
        db.collection('categories').orderBy('order').get(),
        db.collection('products').get()
    ])

    return{
        categories: categories.docs.map(d=> ({id: d.id, ...d.data()})),
        products: products.docs.map(d=>({id: d.id, ...d.data()}))
    }
}

function buildUrlList(content){
    const urls =[];
//RUTAS ESTATICAS
    Object.entries(URL_CONFIG.static).forEach(([path, config])=>{
        urls.push({url: path, priority:config.priority})
    })
//RUTAS DINAMICAS 
//CATEGORIAS
    content.categories.forEach(category =>{
        urls.push({
            url: `/${category.id}`,
            priority:URL_CONFIG.dynamic['categoryID'].priority
        })
    })

//PRODUCTOS
    content.products.forEach(product=>{
        urls.push({
            url:`/item/${product.id}`,
            priority: URL_CONFIG.dynamic['/item/:id'].priority
        })
    })
  return urls;
}

export async function generateSitemap(){
    try {
        const content = fetchContent();
        const urls = buildUrlList(content);
        const stream = new SitemapStream({hostname: DOMAIN});
        const data = await streamToPromise(Readable.from(urls).pipe(stream));
        writeFileSync(SITEMAP_PATH, data.toString());

        return {
            success:true,
            urls:urls.map(u => u.url),
            count: urls.length,
            generatedAt: new Date().toISOString()

        };
    } catch (error) {
        console.error('Error generating sitemap:', error);
    return {
      success: false,
      error: error.message
    }
}
}

export async function notifySearchEngines(){
    try {
        const responses = await Promise.all([
            get(`https://www.google.com/ping?sitemap=${DOMAIN}/sitemap.xml`),
            get(`https://www.bing.com/ping?sitemap=${DOMAIN}/sitemap.xml`)
        ]);
        return {
            success: true,
            notifiedAt: new Date().toISOString(),
            responses: responses.map(r => r.status)
          };
    } catch (error) {
        console.error('Error notifying search engines:', error);
    return {
      success: false,
      error: error.message
    }
}}