import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';     // Añadido para leer archivos
import yaml from 'js-yaml'; // Añadido para procesar YAML

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// --- FUNCIÓN PARA LEER EL USUARIO DEL YAML ---
function getConfigUser() {
  try {
    // Usamos process.cwd() para encontrar el archivo en la raíz en Vercel
    const yamlPath = path.join(process.cwd(), 'user.yml');
    if (fs.existsSync(yamlPath)) {
      const fileContents = fs.readFileSync(yamlPath, 'utf8');
      const data = yaml.load(fileContents);
      return data.instagram_user;
    }
  } catch (e) {
    console.error('No se pudo leer user.yml:', e.message);
  }
  return null; // Si no hay archivo, devolvemos null para usar el fallback
}

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use('/Frontend', express.static(path.join(__dirname, '../Frontend')));

app.get('/novedades', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/novedades.html'));
});

const client = axios.create({
  headers: {
    'x-ig-app-id': '936619743392459',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': '*/*'
  }
});

async function scrapeUser(username) {
  try {
    const response = await client.get(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`
    );
    const userData = response.data.data.user;
    return userData;
  } catch (error) {
    console.error('Error al scrapear usuario:', error.message);
    throw new Error(`Error al obtener datos: ${error.message}`);
  }
}

function parseUser(userData) {
  const totalPosts = (userData.edge_owner_to_timeline_media ? userData.edge_owner_to_timeline_media.count : 0) +
                     (userData.edge_felix_video_timeline ? userData.edge_felix_video_timeline.count : 0);
  
  const timelineMedia = userData.edge_owner_to_timeline_media?.edges || [];
  const videoTimeline = userData.edge_felix_video_timeline?.edges || [];
  const allEdges = [...timelineMedia, ...videoTimeline];
  
  const postsArray = allEdges.map(edge => {
    const node = edge.node;
    const captionEdge = node.edge_media_to_caption?.edges[0]?.node?.text || '';
    return {
      description: captionEdge,
      photo: node.display_url || '',
      link: `https://www.instagram.com/p/${node.shortcode}/`
    };
  }).filter(post => post.photo);
  
  return {
    username: userData.username,
    fullName: userData.full_name || 'No disponible',
    bio: userData.biography || 'No disponible',
    posts: totalPosts.toString(),
    followers: userData.edge_followed_by.count.toString(),
    following: userData.edge_follow.count.toString(),
    postsArray
  };
}

app.get('/scrape', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Falta username' });

  try {
    const userData = await scrapeUser(username);
    const parsedData = parseUser(userData);
    res.json({ success: true, data: parsedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- TU ENDPOINT /API/POSTS ACTUALIZADO ---
app.get('/api/posts', async (req, res) => {
  // 1. Prioridad: Parámetro en URL (?username=)
  // 2. Segunda prioridad: Archivo user.yml
  // 3. Fallback: 'fundaciondegus'
  const username = req.query.username || getConfigUser() || 'fundaciondegus';
  
  try {
    console.log(`Scraping posts para: ${username}`);
    const userData = await scrapeUser(username);
    const parsedData = parseUser(userData);
    const publicaciones = parsedData.postsArray.map(post => ({
      image: post.photo,
      alt: post.description || `Publicación de ${username}`,
      url: post.link
    }));
    res.json({ publicaciones });
  } catch (error) {
    console.error('Error en /api/posts:', error);
    res.status(500).json({ error: 'Error al cargar publicaciones: ' + error.message });
  }
});

app.get('/api/image', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Falta url' });

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
      }
    });
    res.set({ 'Content-Type': response.headers['content-type'] || 'image/jpeg' });
    res.send(Buffer.from(response.data));
  } catch (error) {
    res.status(500).send('Error imagen');
  }
});

app.get('/', (req, res) => res.redirect('/novedades'));

// Exportar para Vercel
export default app;

// Solo escuchar si no es Vercel (opcional pero recomendado)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`Servidor local en puerto ${port}`));
}
