# Haiku Landing - Lista de Espera

Landing page profesional para la lista de espera de la comunidad Skool de Haiku, enfocada en automatización empresarial, Airtable y tecnología No-Code.

![Haiku Logo](public/haiku-logo.svg)

## 🌟 Características

- **Formulario de Lista de Espera**: Captura nombre, apellido y email con validación completa
- **3 Áreas de Aprendizaje**:
  - N8N & Airtable - Automatización y bases de datos No-Code
  - Vibe Coding - Programación con IA
  - Gestión Empresarial - Sistemas y procesos tecnológicos
- **Seguridad Robusta**:
  - Rate limiting (3 solicitudes por minuto)
  - Sanitización de inputs
  - Validación CORS
  - Headers de seguridad
- **SEO Optimizado**: Meta tags, Open Graph, Twitter Cards y datos estructurados
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Política de Privacidad**: Página completa conforme a regulaciones

## 🎨 Diseño

- **Color Principal**: `#00A370` (HSL: 162 100% 32%) - Verde esmeralda
- **Framework CSS**: Tailwind CSS
- **Componentes UI**: Shadcn/ui
- **Fuente**: Sistema (San Francisco en macOS, Segoe UI en Windows)

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Form Handling**: React Hooks
- **Validación**: Custom security utilities
- **Webhook**: n8n integration

## 📦 Instalación

```bash
# Clonar el repositorio
git clone git@github.com:stivenrosales/Haiku-Landing.git

# Navegar al directorio
cd Haiku-Landing

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor se ejecutará en `http://localhost:8080`

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🔧 Configuración

### Webhook n8n

Actualiza la URL del webhook en `src/lib/security.ts`:

```typescript
export const WEBHOOK_CONFIG = {
  url: 'TU_WEBHOOK_URL_AQUI',
  timeout: 10000
};
```

### Variables de Entorno

Crea un archivo `.env` para configuraciones sensibles:

```env
VITE_WEBHOOK_URL=tu_webhook_url
```

## 📁 Estructura del Proyecto

```
haiku-landing-craft-main/
├── public/                 # Archivos estáticos
│   ├── car1-logo.png      # Logo N8N & Airtable
│   ├── car2-logo.svg      # Logo Vibe Coding
│   ├── car3-logo.png      # Logo Gestión Empresarial
│   ├── haiku-logo.svg     # Logo principal
│   └── favicon.svg        # Favicon
├── src/
│   ├── components/ui/     # Componentes Shadcn/ui
│   ├── lib/
│   │   ├── security.ts    # Utilidades de seguridad
│   │   └── utils.ts       # Utilidades generales
│   ├── pages/
│   │   ├── Index.tsx      # Página principal
│   │   ├── Privacy.tsx    # Política de privacidad
│   │   └── NotFound.tsx   # Página 404
│   ├── index.css          # Estilos globales
│   └── main.tsx           # Entry point
├── email-template-waitlist.html  # Template de email
├── index.html             # HTML principal
├── tailwind.config.ts     # Configuración Tailwind
└── vite.config.ts         # Configuración Vite
```

## 🔒 Seguridad

El proyecto implementa múltiples capas de seguridad:

- **Rate Limiting**: Previene spam limitando solicitudes por IP
- **Input Sanitization**: Limpia y valida todos los datos de usuario
- **CORS Validation**: Verifica el origen de las solicitudes
- **Security Headers**: Headers HTTP seguros
- **Email Validation**: Regex robusto para validación de emails

## 📝 Política de Privacidad

La landing incluye una página completa de política de privacidad accesible en `/privacy` que detalla:

- Datos recopilados
- Uso de la información
- Derechos del usuario
- Seguridad de datos
- Cumplimiento legal

## 🌐 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# El directorio dist/ está listo para deployment
```

### Configuración adicional

El proyecto incluye `vercel.json` con configuración de rutas SPA.

## 📧 Integración con Email

El proyecto incluye un template HTML de email (`email-template-waitlist.html`) listo para usar con servicios de email marketing o n8n.

**Características del template**:
- Logo y branding de Haiku
- Diseño responsive
- Compatible con clientes de email
- Fuente Helvetica Neue

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y propiedad de Haiku.

## 👥 Contacto

**Email**: stivenrosales01@gmail.com

**GitHub**: [@stivenrosales](https://github.com/stivenrosales)

---

🤖 Desarrollado con [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
