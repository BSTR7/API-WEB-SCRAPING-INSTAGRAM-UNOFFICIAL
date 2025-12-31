```markdown
# 📸 Instagram Unofficial Scraper API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

API robusta construida en **Node.js** para extraer publicaciones de perfiles públicos de Instagram. Optimizada para **Vercel** y configurable mediante archivos **YAML**.

## 🚀 Características

- 🛠 **Configuración YAML:** Cambia el perfil a scrapear desde `user.yml` sin modificar el código.
- 🖼 **Proxy de Imagen:** Endpoint dedicado para servir imágenes evitando bloqueos de CORS y errores 403.
- ⚡ **Vercel Ready:** Configuración lista para despliegue serverless mediante `vercel.json`.
- 📱 **Frontend Minimalista:** Interfaz responsiva con Tailwind CSS y Lucide Icons incluida.

## 🛠 Instalación Local

1. **Clonar repositorio:**
   ```bash
   git clone https://github.com/BSTR7/API-WEB-SCRAPING-INSTAGRAM-UNOFFICIAL.git
   cd API-WEB-SCRAPING-INSTAGRAM-UNOFFICIAL
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar servidor:**
   ```bash
   npm start
   ```

## ⚙️ Configuración

Edita el archivo `user.yml` en la raíz del proyecto para definir el perfil por defecto:

```yaml
# user.yml
instagram_user: "instagram"
```

## 📡 Endpoints

### 1. Obtener Posts
`GET /api/posts`
- **Parámetro opcional:** `?username=usuario` para scrapear un perfil específico.
- **Respuesta:** JSON con `success`, `user_scraped` y array de `publicaciones`.

### 2. Proxy de Imagen
`GET /api/image?url=<URL_ORIGINAL>`
- Resuelve el bloqueo de hotlinking de Instagram cargando la imagen a través del servidor.

## 📦 Despliegue

Este repositorio está listo para ser vinculado directamente a **Vercel**. El archivo `vercel.json` se encarga de dirigir las peticiones al punto de entrada `server.js`.

## ⚠️ Descargo de Responsabilidad

Este proyecto tiene fines educativos. El scraping de datos públicos debe realizarse respetando los términos de servicio de la plataforma y evitando el abuso de peticiones.

---
Desarrollado por [BSTR7](https://github.com/BSTR7) - 2025
```
