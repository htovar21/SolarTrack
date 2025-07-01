# SolarTrack Backend

API backend para la aplicación SolarTrack de monitoreo solar.

## Variables de Entorno

Crea un archivo `.env` en la raíz del backend con las siguientes variables:

```env
# Configuración de la base de datos
MONGO_URI=mongodb://localhost:27017/solartrack

# Configuración JWT
JWT_SECRET=tu_jwt_secret_super_seguro_aqui

# Configuración del servidor
PORT=4000

# API Keys (opcional)
WEATHER_API_KEY=tu_api_key_del_clima
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm start
```

## Endpoints

- `POST /api/register` - Registro de usuarios
- `POST /api/login` - Login de usuarios
- `GET /api/exposures` - Obtener exposiciones del usuario
- `POST /api/exposures` - Crear nueva exposición
- `GET /api/weather` - Obtener datos del clima 