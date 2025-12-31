import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// --- LÓGICA PARA LEER EL USUARIO DEL YAML ---
function getConfigUser() {
  try {
    const yamlPath = path.join(process.cwd(), 'user.yml');
    if (fs.existsSync(yamlPath)) {
      const fileContents = fs.readFileSync(yamlPath, 'utf8');
      const data = yaml.load(fileContents);
      return data.instagram_user;
    }
  } catch (e) {
    console.error('Error leyendo user.yml:', e.message);
  }
  return null;
}

app.use(express.json());
app.use(cors({ origin: '*' }));

// Cliente Axios con tus headers que funcionan
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
  const response = await client.get(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`);
  return response.data.data.user;
}

function parseUser(userData) {
  const timelineMedia = userData.edge_owner_to_timeline_media?.edges || [];
  const videoTimeline = userData.edge_felix_video_timeline?.edges || [];
  const allEdges = [...timelineMedia, ...videoTimeline];
  
  const postsArray = allEdges.map(edge => ({
    description: edge.node.edge_media_to_caption?.edges[0]?.node?.text || '',
    photo: edge.node.display_url || '',
    link: `https://www.instagram.com/p/${edge.node.shortcode}/`
  })).filter(post => post.photo);
  
  return postsArray;
}

// Endpoint Principal
app.get('/api/posts', async (req, res) => {
  const username = req.query.username || getConfigUser() || 'fundaciondegus';
  
  try {
    const userData = await scrapeUser(username);
    const posts = parseUser(userData);
    
    // IMPORTANTE: Enviamos user_scraped para que el HTML no diga undefined
    res.json({ 
      success: true,
      user_scraped: username, 
      publicaciones: posts.map(p => ({
        image: p.photo,
        alt: p.description,
        url: p.link
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Proxy de imagen
app.get('/api/image', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('Falta url');
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set({ 'Content-Type': response.headers['content-type'] || 'image/jpeg' });
    res.send(Buffer.from(response.data));
  } catch (e) {
    res.status(500).send('Error');
  }
});

export default app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`Servidor local: http://localhost:${port}`));
}
