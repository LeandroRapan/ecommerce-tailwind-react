import {writeFileSync} from 'fs'
import { join } from 'path'
import { skipThirdPartyRequests } from 'react-snap/src/puppeteer_utils';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = join(__dirname, 'react-snap.config.js');  

// Rutas que siempre deben incluirse, independientemente del sitemap
const BASE_ROUTES = [
    '/',
    '/404.html',
    '/offline.html'
  ];

  export async function generateReactSnapConfig(sitemapUrls = []){

    try {
        const routes = [...BASE_ROUTES, ...sitemapUrls];
        const config ={
            source:"build",
            include:[...new Set(routes)],
            skipThirdPartyRequests: true,
            cacheAjaxRequests: true,
            concurrency:4,
            puppeteerArgs:['--no-sandbox', 'disable-setuid-sandbox'],
            publicPath: '/',
            fixWebpackChunkIssue: true

        };

        writeFileSync(
            CONFIG_PATH,
            `module.exports = ${JSON.stringify(config,null,2)}`
        );

        return {
            success: true,
            configPath: CONFIG_PATH,
            routesCount: config.include.length,
            generatedAt: new Date().toISOString()
          };
        } catch (error) {
          console.error('Error generating react-snap config:', error);
          return {
            success: false,
            error: error.message
          };
        }
    
        
    
  }