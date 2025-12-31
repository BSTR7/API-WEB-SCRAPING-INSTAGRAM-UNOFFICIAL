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

app.use(express.json());
app.use(cors({ origin: '*' }));

// LÓGICA YAML
function getInstagramUserFromYaml() {
    try {
        const yamlPath = path.join(process.cwd(), 'user.yml'); // process.cwd() es mejor para Vercel
        if (fs.existsSync(yamlPath)) {
            const config = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
            return config.instagram_user || 'instagram';
        }
    } catch (e) {
        console.error("Error leyendo user.yml:", e);
    }
    return 'instagram'; 
}

const client = axios.create({
    headers: {
        'x-ig-app-id': '936619743392459',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
});

async function scrapeInstagram(username) {
    const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
    const response = await client.get(url);
    const user = response.data.data.user;

    const posts = [
        ...(user.edge_owner_to_timeline_media?.edges || []),
        ...(user.edge_felix_video_timeline?.edges || [])
    ].map(edge => ({
        image: edge.node.display_url,
        link: `https://www.instagram.com/p/${edge.node.shortcode}/`,
        description: edge.node.edge_media_to_caption?.edges[0]?.node?.text || ""
    }));

    return { username: user.username, posts };
}

// ENDPOINTS
app.get('/api/posts', async (req, res) => {
    const targetUser = req.query.username || getInstagramUserFromYaml();
    try {
        const data = await scrapeInstagram(targetUser);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error de scraping", details: error.message });
    }
});

app.get('/api/image', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send("Falta URL");
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        res.set('Content-Type', response.headers['content-type']);
        res.send(Buffer.from(response.data));
    } catch (e) {
        res.status(500).send("Error imagen");
    }
});

// Para local (fuera de Vercel)
if (process.env.NODE_ENV !== 'production') {
    const port = 3000;
    app.listen(port, () => console.log(`Local: http://localhost:${port}`));
}

// IMPORTANTE: Exportar la app para Vercel
export default app;