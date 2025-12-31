# 📸 Instagram Unofficial Scraper API[[2](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQGc-x_z8cPQzirBsygtoU-TCqQXAf0x_fZLT9yNQwcwQRUDngmSCIZNg1RZd98xMLnyfBCf_8rtORwIwbhsAhQ0d6ZPC1EwQQsxNAkUKjl3Uvd47-PgB3hs9rX-VWnafEbkWeUlKYJRAJJo-wSSU317teOSn1riyOUeORZtPTcRUSeVTyW1e6ph5dSWeroX4_matYZPLB4Hi2Nu1_xekqXIatQ%3D)]

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Una API robusta y ligera construida en **Node.js** para extraer publicaciones de perfiles públicos de Instagram.[[1](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQGOgk3jcElBLIJ6B67LmM3QvIHyUVP222KCo2YTXBXWlzajZQLKYQ77Jy54P26G2WfVvRmmfW21OeOuN1eWwTLFhVEBwYOYS0BR6SGUsgryD8klLuke7Ajkf1k8KQjZIrSX8u0q8xBJcvsXuiukYgwmEpHV6EKIo7UuZazhFJBJvEG3CBoU)] Diseñada específicamente para ser desplegada en **Vercel** y configurada fácilmente mediante archivos **YAML**.[[1](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQGOgk3jcElBLIJ6B67LmM3QvIHyUVP222KCo2YTXBXWlzajZQLKYQ77Jy54P26G2WfVvRmmfW21OeOuN1eWwTLFhVEBwYOYS0BR6SGUsgryD8klLuke7Ajkf1k8KQjZIrSX8u0q8xBJcvsXuiukYgwmEpHV6EKIo7UuZazhFJBJvEG3CBoU)]

> **Nota:** Este proyecto utiliza la API interna de Instagram (`web_profile_info`) para obtener datos públicos sin necesidad de tokens oficiales de Facebook Graph API.[[1](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQGOgk3jcElBLIJ6B67LmM3QvIHyUVP222KCo2YTXBXWlzajZQLKYQ77Jy54P26G2WfVvRmmfW21OeOuN1eWwTLFhVEBwYOYS0BR6SGUsgryD8klLuke7Ajkf1k8KQjZIrSX8u0q8xBJcvsXuiukYgwmEpHV6EKIo7UuZazhFJBJvEG3CBoU)]

## 🚀 Características

- 🛠 **Configuración Dinámica:** Cambia el perfil a scrapear editando el archivo `user.yml` sin tocar una sola línea de código.[[1](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQGOgk3jcElBLIJ6B67LmM3QvIHyUVP222KCo2YTXBXWlzajZQLKYQ77Jy54P26G2WfVvRmmfW21OeOuN1eWwTLFhVEBwYOYS0BR6SGUsgryD8klLuke7Ajkf1k8KQjZIrSX8u0q8xBJcvsXuiukYgwmEpHV6EKIo7UuZazhFJBJvEG3CBoU)]
- 🖼 **Image Proxy:** Incluye un endpoint de proxy para cargar imágenes de Instagram evitando bloqueos de CORS y errores de "403 Forbidden".
- 📱 **Frontend Moderno:** Incluye una interfaz de usuario minimalista construida con Tailwind CSS y Lucide Icons.
- ⚡ **Serverless Ready:** Configurado para funcionar perfectamente como funciones Serverless en Vercel.

## 🛠 Instalación y Uso Local[[1](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQGOgk3jcElBLIJ6B67LmM3QvIHyUVP222KCo2YTXBXWlzajZQLKYQ77Jy54P26G2WfVvRmmfW21OeOuN1eWwTLFhVEBwYOYS0BR6SGUsgryD8klLuke7Ajkf1k8KQjZIrSX8u0q8xBJcvsXuiukYgwmEpHV6EKIo7UuZazhFJBJvEG3CBoU)]

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/BSTR7/API-WEB-SCRAPING-INSTAGRAM-UNOFFICIAL.git
   cd API-WEB-SCRAPING-INSTAGRAM-UNOFFICIAL
   ```[[1](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQGOgk3jcElBLIJ6B67LmM3QvIHyUVP222KCo2YTXBXWlzajZQLKYQ77Jy54P26G2WfVvRmmfW21OeOuN1eWwTLFhVEBwYOYS0BR6SGUsgryD8klLuke7Ajkf1k8KQjZIrSX8u0q8xBJcvsXuiukYgwmEpHV6EKIo7UuZazhFJBJvEG3CBoU)]

2. **Instala las dependencias:**
   ```bash
   npm install
   ```[[1](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQGOgk3jcElBLIJ6B67LmM3QvIHyUVP222KCo2YTXBXWlzajZQLKYQ77Jy54P26G2WfVvRmmfW21OeOuN1eWwTLFhVEBwYOYS0BR6SGUsgryD8klLuke7Ajkf1k8KQjZIrSX8u0q8xBJcvsXuiukYgwmEpHV6EKIo7UuZazhFJBJvEG3CBoU)]

3. **Inicia el servidor en modo desarrollo:**
   ```bash
   npm start
