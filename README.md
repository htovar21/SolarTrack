# SolarTrack - Tu Compañero Solar Inteligente

SolarTrack es una aplicación web fullstack moderna que te ayuda a monitorear tu exposición solar y te ofrece recomendaciones inteligentes para proteger tu piel, adaptadas al clima y a tu actividad.

## 🚀 Nuevas Características del Diseño

### Vista Combinada: Dashboard + Recomendaciones Inteligentes
- **Dashboard Principal**: Combina información del clima, pronóstico horario y detalles meteorológicos
- **Recomendaciones Inteligentes**: Integradas directamente en el dashboard con IA de Gemini
- **Diseño de Dos Columnas**: Layout moderno y eficiente con información organizada
- **Actualización en Tiempo Real**: Botón para refrescar recomendaciones inteligentes

### Vista Combinada: Gestión de Exposiciones
- **Registro de Exposición**: Formulario moderno con múltiples intervalos de tiempo
- **Historial Completo**: Visualización de todas las exposiciones registradas
- **Resumen de Hoy**: Información destacada de la exposición del día actual
- **Indicadores de Riesgo**: Badges de color para nivel de riesgo UV

### Navegación Moderna
- **Sidebar Rediseñado**: Menú lateral con gradiente y animaciones suaves
- **Hamburger Menu**: Navegación móvil intuitiva con overlay
- **Dos Vistas Principales**: Dashboard y Exposiciones
- **Responsive Design**: Adaptado para todos los dispositivos

## 🎨 Diseño Moderno

### Características Visuales
- **Gradientes Modernos**: Fondos con gradientes suaves y profesionales
- **Glassmorphism**: Efectos de cristal con backdrop-filter
- **Animaciones Suaves**: Transiciones y hover effects elegantes
- **Paleta de Colores**: Azules y púrpuras modernos
- **Tipografía**: Inter font para mejor legibilidad

### Componentes Rediseñados
- **WeatherCard**: Tarjeta principal del clima con información detallada
- **HourlyForecast**: Pronóstico horario con indicadores de color
- **WeatherDetails**: Detalles meteorológicos organizados
- **ExposureManager**: Gestión completa de exposiciones
- **Sidebar**: Navegación moderna con iconos y descripciones

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18**: Framework principal
- **React Router**: Navegación entre vistas
- **CSS3**: Estilos modernos con Grid y Flexbox
- **Responsive Design**: Mobile-first approach

### Backend
- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web
- **MongoDB Atlas**: Base de datos en la nube
- **JWT**: Autenticación segura

### APIs Externas
- **WeatherAPI**: Datos meteorológicos en tiempo real
- **Google Gemini AI**: Recomendaciones inteligentes personalizadas

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px - Layout de dos columnas
- **Tablet**: 768px - 1024px - Layout adaptativo
- **Mobile**: < 768px - Layout de una columna con hamburger menu

### Características Móviles
- **Hamburger Menu**: Navegación táctil intuitiva
- **Touch Targets**: Botones de mínimo 44px para accesibilidad
- **Prevención de Zoom**: Inputs optimizados para iOS
- **Scroll Suave**: Navegación fluida en dispositivos táctiles

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- MongoDB Atlas (cuenta gratuita)

### Configuración Local

#### Frontend
```bash
cd frontend
npm install
npm start
```

#### Backend
```bash
cd backend
npm install
npm start
```

### Variables de Entorno

#### Backend (.env)
```env
MONGO_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_jwt_secret_super_seguro
PORT=4000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:4000/api
```

## 🌐 Despliegue en Render

### Opción 1: Despliegue Automático (Recomendado)

1. **Conecta tu repositorio de GitHub a Render**
2. **Crea dos servicios web:**
   - **Backend**: Usa el directorio `backend/`
   - **Frontend**: Usa el directorio `frontend/`

### Opción 2: Usando render.yaml

El proyecto incluye un archivo `render.yaml` que configura automáticamente ambos servicios.

### Configuración en Render

#### Backend
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Variables de Entorno**:
  - `MONGO_URI`: Tu URI de MongoDB Atlas
  - `JWT_SECRET`: Tu JWT secret
  - `NODE_ENV`: `production`

#### Frontend
- **Build Command**: `cd frontend && npm install && npm run build`
- **Static Publish Path**: `frontend/build`
- **Variables de Entorno**:
  - `REACT_APP_API_URL`: URL de tu backend en Render

### URLs de Ejemplo
- **Backend**: `https://solartrack-backend.onrender.com`
- **Frontend**: `https://solartrack-frontend.onrender.com`

## 📊 Estructura del Proyecto

```
clima1.0/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardMain.js          # Dashboard principal
│   │   │   ├── ExposureManager.js        # Gestión de exposiciones
│   │   │   ├── Sidebar.js                # Navegación lateral
│   │   │   ├── DashboardLayout.js        # Layout principal
│   │   │   └── ...                       # Otros componentes
│   │   ├── services/
│   │   │   ├── api.js                    # API del backend
│   │   │   └── geminiApi.js              # API de Gemini
│   │   └── App.js                        # Componente principal
│   └── package.json
├── backend/
│   ├── controllers/                      # Controladores de la API
│   ├── models/                          # Modelos de MongoDB
│   ├── routes/                          # Rutas de la API
│   └── app.js                           # Servidor Express
└── README.md
```

## 🎯 Funcionalidades Principales

### Dashboard
- **Clima en Tiempo Real**: Temperatura, UV, humedad, etc.
- **Pronóstico Horario**: 24 horas con indicadores visuales
- **Recomendaciones IA**: Sugerencias personalizadas con Gemini
- **Resumen de Exposición**: Datos del día actual
- **Gráfico UV**: Historial de los últimos 7 días

### Gestión de Exposiciones
- **Registro Completo**: Fecha, ubicación, intervalos de tiempo
- **Cálculo Automático**: UV estimado y minutos expuesto
- **Historial Detallado**: Todas las exposiciones con filtros
- **Indicadores de Riesgo**: Niveles de riesgo visuales

## 🔧 Mejoras Técnicas

### Performance
- **Lazy Loading**: Carga diferida de componentes
- **Optimización de Imágenes**: Formatos modernos y compresión
- **Caching**: Datos del clima y recomendaciones en caché
- **Bundle Splitting**: Código dividido para mejor carga

### Accesibilidad
- **ARIA Labels**: Etiquetas para lectores de pantalla
- **Keyboard Navigation**: Navegación completa con teclado
- **Color Contrast**: Contraste adecuado para todos los usuarios
- **Focus Management**: Gestión del foco para accesibilidad

### SEO
- **Meta Tags**: Etiquetas meta optimizadas
- **Structured Data**: Datos estructurados para motores de búsqueda
- **Performance Metrics**: Core Web Vitals optimizados
- **Mobile-Friendly**: Diseño responsive para SEO móvil

## 🎨 Personalización

### Temas
El diseño utiliza CSS custom properties para fácil personalización:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --background-gradient: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --text-primary: #2d3748;
  --text-secondary: #718096;
}
```

### Componentes
Todos los componentes están modulares y pueden ser personalizados fácilmente modificando sus archivos CSS correspondientes.

## 📈 Roadmap

### Próximas Mejoras
- [ ] Notificaciones push para alertas UV
- [ ] Integración con wearables
- [ ] Modo oscuro
- [ ] Exportación de datos
- [ ] Integración con calendario
- [ ] Recomendaciones de productos de protección solar

### Optimizaciones
- [ ] PWA (Progressive Web App)
- [ ] Offline mode
- [ ] Push notifications
- [ ] Analytics avanzados
- [ ] A/B testing

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Contacto

- **Email**: contacto@solartrack.com
- **Website**: https://solartrack.com
- **GitHub**: https://github.com/tu-usuario/solartrack

---

**SolarTrack** - Tu compañero solar inteligente 🌞 