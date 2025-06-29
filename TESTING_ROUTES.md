# Pruebas de Rutas - SolarTrack

## Cómo Probar las Rutas

### 1. Iniciar el Proyecto
```bash
cd frontend
npm start
```

### 2. Probar las Rutas Manualmente

#### Dashboard (Vista Principal)
- URL: `http://localhost:3000/dashboard`
- Debería mostrar: Dashboard con clima y recomendaciones

#### Exposiciones
- URL: `http://localhost:3000/exposures`
- Debería mostrar: Gestión de exposiciones (registro + historial)

### 3. Probar Navegación desde el Sidebar

1. **Abrir el sidebar**: Hacer clic en el botón hamburguesa (☰)
2. **Navegar a Dashboard**: Hacer clic en "Dashboard"
3. **Navegar a Exposiciones**: Hacer clic en "Exposiciones"

### 4. Verificar en la Consola del Navegador

Abrir las herramientas de desarrollador (F12) y verificar:
- No hay errores de JavaScript
- Los logs muestran la ruta correcta
- Los componentes se cargan correctamente

### 5. Problemas Comunes y Soluciones

#### Problema: La vista de exposiciones no se carga
**Solución**: Verificar que:
- El archivo `ExposureManager.js` existe
- El archivo `ExposureManager.css` existe
- No hay errores de importación

#### Problema: El sidebar no funciona
**Solución**: Verificar que:
- El archivo `Sidebar.js` existe
- El archivo `Sidebar.css` existe
- Las rutas están configuradas correctamente

#### Problema: Las rutas no cambian
**Solución**: Verificar que:
- React Router está instalado correctamente
- El `BrowserRouter` está configurado en `index.js`
- Las rutas están definidas correctamente en `App.js`

### 6. Debugging

Para debuggear las rutas, agregar estos logs:

```javascript
// En DashboardLayout.js
console.log('Ruta actual:', location.pathname);

// En Sidebar.js
console.log('Navegando a:', path);
```

### 7. Estructura de Archivos Esperada

```
frontend/src/components/
├── DashboardLayout.js      ✅
├── DashboardLayout.css     ✅
├── DashboardMain.js        ✅
├── DashboardMain.css       ✅
├── ExposureManager.js      ✅
├── ExposureManager.css     ✅
├── Sidebar.js             ✅
├── Sidebar.css            ✅
└── TestComponent.js       ✅ (temporal)
```

### 8. Comandos de Verificación

```bash
# Verificar que todos los archivos existen
ls frontend/src/components/

# Verificar que no hay errores de ESLint
npm run lint

# Verificar que el proyecto compila
npm run build
```

### 9. URLs de Prueba

- `http://localhost:3000/` → Landing page
- `http://localhost:3000/dashboard` → Dashboard
- `http://localhost:3000/exposures` → Exposiciones

### 10. Estado Esperado

✅ **Dashboard**: Muestra clima, pronóstico y recomendaciones
✅ **Exposiciones**: Muestra formulario de registro e historial
✅ **Sidebar**: Navegación funcional entre vistas
✅ **Responsive**: Funciona en móvil y desktop 